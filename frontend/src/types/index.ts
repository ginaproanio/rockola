export interface Song {
  id: number
  title: string
  artist: string
  genre: string
  year: number
  duration: number
  coverUrl: string
  url: string
}

export interface User {
  id: string
  username: string
  name: string
  email: string
}
