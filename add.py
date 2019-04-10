import warnings
warnings.filterwarnings("ignore", category = FutureWarning)

import os
import h5py
import librosa
import itertools
import numpy as np
import matplotlib.pyplot as plt
from collections import OrderedDict
import scipy
import re

import keras
from keras.models import Model, load_model

from app import mongo

def split_song(X, window = 0.1, overlap = 0.5):
    # Empty lists to hold our results
    temp_X = []

    # Get the input song array size
    shape = X.shape[0]
    chunk = int(shape*window)
    offset = int(chunk*(1.-overlap))
    # Split the song and create new ones on windows
    spsong = [X[i:i+chunk] for i in range(0, shape - chunk + offset, offset)]
    for s in spsong:
        temp_X.append(s)

    return np.array(temp_X)

def extract_melspectrogram(songs):
    # Transformation function
    melspec = lambda x: librosa.feature.melspectrogram(x, n_fft = 1024, hop_length = 512)[:,:,np.newaxis]

    # map transformation of input songs to melspectrogram using log-scale
    tsongs = map(melspec, songs)
    return np.array(list(tsongs))

def read_data(src_dir, song_samples):
    # Empty array of dicts with the processed features from all files
    arr_specs = []
    arr_names = []
    arr_duration = []

    # Read files from the folders
    for root, subdirs, files in os.walk(src_dir):
        for file in files:
            # Read the audio file
            file_name = src_dir + "/" + file
            print("Read file: {}".format(file))

            signal, sr = librosa.load(file_name, offset=30.0, duration=30.0)
            duration = librosa.get_duration(filename=file_name)
            signal = signal[:song_samples]

            # Convert to dataset of spectograms/melspectograms
            signals = split_song(signal)

            # Convert to "spec" representation
            specs = extract_melspectrogram(signals)
            # Save files
            arr_duration.append(duration)
            arr_specs.append(specs)
            arr_names.append(file)
    return np.array(arr_specs), np.array(arr_names), np.array(arr_duration)

def predict_genres(songs, models_name):

    model = load_model(models_name)

    predicts = []
    for X in songs:
        predicts.append(model.predict(X))

    return np.array(predicts)

def normalize_data(predicts):

    songs = []
    
    #normalize the results
    for song_predict in predicts:
        i = 0
        temp_separate = np.zeros((10, 19))
        for sample in song_predict:
            j = 0
            for x in sample:
                temp_separate[j][i] = x
                j = j + 1
            i = i + 1
        
        genres_temp = []
        for x in temp_separate:
            genres_temp.append(scipy.mean(x))
            
        songs.append(genres_temp)

    return np.array(songs)

if __name__ == '__main__':
  song_samples = 660000
  test_folder = 'data'
  songs_sample, path_file, duration = read_data(test_folder, song_samples)

  models_name = 'reccomendationEngine/models/model_snn.h5'
  predicts = predict_genres(songs_sample, models_name)
  genres = mongo.db.genres.find({})

  songs = normalize_data(predicts)

  result_genres = []
  max_genre = []
  for song in songs:
    i = 0
    dicts = {}
    for genre_song in song:
      dicts.update({genres[i]['name']: genre_song})
      i += 1
    max_genre.append(genres[int(np.argmax(song))]['name'])
    result_genres.append(dicts)
    i = 0
  
  track = mongo.db.track
  i = 0
  for el in result_genres:
    artist, name = re.sub(r'\d{1,3}\.|.mp3', '', path_file[i]).strip().split(" - ", 1)
    track_ids = track.insert({
        'artist': artist, 
        'name': name, 
        'genre': max_genre[i],
        'duration': duration[i],
        'path': path_file[i], 
        'genres': el
    })
    print("Save ", path_file[i])
    i += 1
