class UseStorage {
  getStorage(key: string) {
    return localStorage.getItem(key);
  }
  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  removeStorage(key: string) {
    localStorage.removeItem(key);
  }
}
export default new UseStorage();
