export interface Note {
  title: string
  text: string
  tags: string[]
  id: number
}

export interface User {
  name: string
  email: string
  password: string
  confirm: string
}
