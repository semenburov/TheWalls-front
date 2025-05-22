// Основна адреса бекенду (без /api)
const BACKEND_MAIN = 'http://localhost:4000' // Базовий URL для локального бекенду (можна змінити для продакшену)

// API_URL — базова адреса для всіх REST API-запитів (додається /api)
export const API_URL = `${BACKEND_MAIN}/api`
// Наприклад: http://localhost:4000/api

// BACKEND_SOCIAL_AUTH_URL — адреса для соціальної авторизації (OAuth, SSO тощо)
export const BACKEND_SOCIAL_AUTH_URL = `${BACKEND_MAIN}/auth`
// Наприклад: http://localhost:4000/auth

// ---
// BACKEND_MAIN — не експортується, використовується лише для формування інших констант
// API_URL — використовується для всіх запитів до REST API бекенду
// BACKEND_SOCIAL_AUTH_URL — використовується для редіректу на бекенд при соціальній авторизації
