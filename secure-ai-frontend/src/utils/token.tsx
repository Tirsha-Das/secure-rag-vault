export function saveAuth(token: string, user: object) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function getToken() {
  return localStorage.getItem('token')
}

export function logout() {
  localStorage.clear()
}
