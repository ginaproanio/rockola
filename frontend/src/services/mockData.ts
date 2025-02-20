import { Song } from '../types'

export const mockSongs: Song[] = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    genre: 'rock',
    year: 1975,
    duration: 354,
    coverUrl: 'https://example.com/bohemian.jpg',
    url: 'https://example.com/songs/bohemian-rhapsody.mp3',
  },
  {
    id: 2,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    genre: 'pop',
    year: 1983,
    duration: 294,
    coverUrl: 'https://example.com/billiejean.jpg',
    url: 'https://example.com/songs/billie-jean.mp3',
  },
  {
    id: 3,
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    genre: 'rock',
    year: 1987,
    duration: 356,
    coverUrl: 'https://example.com/sweet.jpg',
    url: 'https://example.com/songs/sweet-child.mp3',
  },
]
