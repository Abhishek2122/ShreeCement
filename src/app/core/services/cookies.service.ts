import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  /**
    * delete cookie
    * @param name
    */
  public deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  /**
   * get cookie
   * @param {string} name
   * @returns {string}
   */
  public getCookie(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      const ca: Array<string> = decodeURIComponent(document?.cookie).split(';');
      const caLen: number = ca.length;
      const cookieName = `${name}=`;
      let c: string;

      for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
          return c.substring(cookieName.length, c.length);
        }
      }
    }
    return '';
  }

  /**
   * set cookie
   * @param {string} name
   * @param {string} value
   * @param {number} expireDays
   * @param {string} path
   */
  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    if (isPlatformBrowser(this.platformId)) {
      const d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      const cpath = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}; SameSite=Lax`;
    }
  }

  encode(string: any) {
    return btoa(string); // encode a string        
  }

  deocde(string: any) {
    return atob(string); // decode the string
  }

  deleteAllCookies(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
}
