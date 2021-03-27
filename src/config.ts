const CONFIG = {
  API_URL: String(import.meta.env.VITE_API_URL ?? 'http://localhost:8080'),
  animateDuration: 300,
  toastDuration: 4000,
}

export default CONFIG
