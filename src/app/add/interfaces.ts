export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}
export interface Auth {
  expiresIn: string,
  idToken: string
}
export interface Post {
  id?: number,
  date: Date,
  title: string,
  autor: string,
  text: string
}
export  interface ResponseFromFB {
  name: string
}
