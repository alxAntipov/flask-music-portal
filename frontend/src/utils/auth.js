export const validateSignIn = data => {
  if (data.login.length < 5) return "Логин слишком короткий"
  if (data.password.length < 5) return "Пароль слишком короткий"
  return false
}

export const validateSignUp = data => {
  if (data.login.length < 5) return "Логин слишком короткий"
  if (data.password.length < 5) return "Пароль слишком короткий"
  if (data.password !== data.confirmPassword) return "Пароли не совпадают"
  return false
}
