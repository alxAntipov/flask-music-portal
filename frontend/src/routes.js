import MainLayout from "./components/MainLayout"
import AuthLayout from "./components/AuthLayout"
import TrackList from "./container/TrackList"
import Login from "./components/Login"
import Register from "./components/Register"

const routes = [
  {
    path: "/",
    exact: true,
    layout: MainLayout,
    component: TrackList,
    props: {
      playlistName: "all",
      header: "Новое"
    }
  },
  {
    path: "/login",
    layout: AuthLayout,
    component: Login
  },
  {
    path: "/register",
    layout: AuthLayout,
    component: Register
  },
  {
    path: "/recommendaton",
    layout: MainLayout,
    component: TrackList,
    props: {
      playlistName: "reccomendation",
      header: "Рекомендации"
    }
  },
  {
    path: "/genres",
    layout: MainLayout,
    component: () => "Жанры"
  },
  {
    path: "/mySong",
    layout: MainLayout,
    component: TrackList,
    props: {
      playlistName: "my",
      header: "Моя музыка"
    }
  }
]

export default routes
