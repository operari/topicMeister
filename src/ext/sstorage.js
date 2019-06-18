export default {
  get (key) {
    try {
      return JSON.parse(sessionStorage.getItem(key))
    } catch (e) {}
  },
  set (key, val) {
    try {
      sessionStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  remove (key) {
    try {
      sessionStorage.removeItem(key)
    } catch (e) {}
  },
  clear () {
    try {
      sessionStorage.clear()
    } catch (e) {}
  }
}
