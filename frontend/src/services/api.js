const BASE_URL = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('kosowa_token')

const headers = (auth = false) => {
  const h = { 'Content-Type': 'application/json' }
  if (auth) h['Authorization'] = `Bearer ${getToken()}`
  return h
}

const handleResponse = async (res) => {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const authAPI = {
  register: (form) =>
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(form),
    }).then(handleResponse),

  login: (form) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(form),
    }).then(handleResponse),

  getMe: () =>
    fetch(`${BASE_URL}/auth/me`, {
      headers: headers(true),
    }).then(handleResponse),
}

export const storyAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return fetch(`${BASE_URL}/stories?${query}`, {
      headers: headers(),
    }).then(handleResponse)
  },

  getById: (id) =>
    fetch(`${BASE_URL}/stories/${id}`, {
      headers: headers(),
    }).then(handleResponse),

  getMine: () =>
    fetch(`${BASE_URL}/stories/mine`, {
      headers: headers(true),
    }).then(handleResponse),

  getProfile: (username) =>
    fetch(`${BASE_URL}/stories/profile/${username}`, {
      headers: headers(),
    }).then(handleResponse),

  create: (form) =>
    fetch(`${BASE_URL}/stories`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify(form),
    }).then(handleResponse),

  complete: (id) =>
    fetch(`${BASE_URL}/stories/${id}/complete`, {
      method: 'PATCH',
      headers: headers(true),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/stories/${id}`, {
      method: 'DELETE',
      headers: headers(true),
    }).then(handleResponse),
}

export const paragraphAPI = {
  add: (storyId, text) =>
    fetch(`${BASE_URL}/paragraphs/${storyId}`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({ text }),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/paragraphs/${id}`, {
      method: 'DELETE',
      headers: headers(true),
    }).then(handleResponse),

  getQuota: (storyId) =>
    fetch(`${BASE_URL}/paragraphs/quota/${storyId}`, {
      headers: headers(true),
    }).then(handleResponse),
}

export const commentAPI = {
  getAll: (storyId) =>
    fetch(`${BASE_URL}/comments/${storyId}`, {
      headers: headers(),
    }).then(handleResponse),

  add: (storyId, text) =>
    fetch(`${BASE_URL}/comments/${storyId}`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({ text }),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: headers(true),
    }).then(handleResponse),

  addReply: (commentId, text) =>
    fetch(`${BASE_URL}/comments/${commentId}/replies`, {
      method: 'POST',
      headers: headers(true),
      body: JSON.stringify({ text }),
    }).then(handleResponse),

  deleteReply: (commentId, replyId) =>
    fetch(`${BASE_URL}/comments/${commentId}/replies/${replyId}`, {
      method: 'DELETE',
      headers: headers(true),
    }).then(handleResponse),
}

export const notificationAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/notifications`, {
      headers: headers(true),
    }).then(handleResponse),

  getUnreadCount: () =>
    fetch(`${BASE_URL}/notifications/unread-count`, {
      headers: headers(true),
    }).then(handleResponse),

  markAllRead: () =>
    fetch(`${BASE_URL}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: headers(true),
    }).then(handleResponse),

  markOneRead: (id) =>
    fetch(`${BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: headers(true),
    }).then(handleResponse),

  delete: (id) =>
    fetch(`${BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: headers(true),
    }).then(handleResponse),
}