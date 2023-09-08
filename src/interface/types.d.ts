declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export interface User {
  name: Name
  location: Location
  email: string
  phone: string
  cell: string
  id: ID
  picture: Picture
}

export interface ID {
  name: string
  value: null | string
}

export interface Location {
  country: string
}

export interface Name {
  title: Title
  first: string
  last: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
  LAST = 'last',
  COUNTRY = 'country',
}