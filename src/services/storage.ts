interface Storage<T> {
  set(_value: T): void;
  get(): T | null;
}

export class SessionStorage<T> implements Storage<T> {
  // eslint-disable-next-line no-unused-vars
  constructor(private key: string) {}

  set(value: T): void {
    sessionStorage.setItem(this.key, JSON.stringify(value));
  }

  get(): T {
    const result: string | null = sessionStorage.getItem(this.key);
    return result ? JSON.parse(result) : null;
  }
}

export class LocalStorage<T> implements Storage<T> {
  // eslint-disable-next-line no-unused-vars
  constructor(private key: string) {}

  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  get(): T {
    const result: string | null = localStorage.getItem(this.key);
    return result ? JSON.parse(result) : null;
  }
}
