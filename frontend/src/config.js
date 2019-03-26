export const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "https://music"
    : "http://localhost:5000"
