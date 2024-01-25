import Cookies, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();

class UseCookie {
  setCookie(key: string, value: string, option?: CookieSetOptions | undefined) {
    return cookies.set(key, value, { ...option });
  }
  getCookie(key: string) {
    return cookies.get(key);
  }
  removeCookie(key: string) {
    return cookies.remove(key);
  }
}
export default new UseCookie();
