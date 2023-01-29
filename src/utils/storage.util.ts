type StorageType = 'localStorage' | 'sessionStorage'

export default class StorageUtil<T> {
  key: string
  storageType: StorageType

  constructor (key: string, storageType: StorageType = 'localStorage') {
    this.key = key
    this.storageType = storageType
  }

  get (): T | null {
    const value = window[this.storageType].getItem(this.key)
    if (!value) return null

    try {
      return JSON.parse(value)
    } catch {
      return null
    }
  }

  set (data: T): void {
    window[this.storageType].setItem(this.key, JSON.stringify(data))
  }

  remove (): void {
    window[this.storageType].removeItem(this.key)
  }
}
