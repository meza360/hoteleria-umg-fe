import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/prod.env';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor (@Inject(PLATFORM_ID) private readonly platformId: Object) { }

  /**
   * Verifica si estamos ejecutando en el navegador
   * @returns
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
     * Guarda strings en local storage
     * @param key
     * @param value
     */
  setString(key: string, value: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(`${environment.suffixStorage}${key}`, CryptoJS.AES.encrypt(value, environment.encryptionKey).toString());
    }
  }

  /**
   * Guarda un objeto JSON en local storage
   * @param key
   * @param value
   */
  setObject(key: string, value: Object): void {
    if (this.isBrowser()) {
      localStorage.setItem(`${environment.suffixStorage}${key}`, CryptoJS.AES.encrypt(JSON.stringify(value), environment.encryptionKey).toString());
    }
  }

  /**
   * Retorna un string desencriptado
   * @param key
   * @returns
   */
  getString(key: string): string | null {
    if (this.isBrowser()) {
      const value: string | null = localStorage.getItem(`${environment.suffixStorage}${key}`);
      if (value) {
        return CryptoJS.AES.decrypt(value, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
      }
    }
    return null;
  }

  /**
   * Retorna un objeto parseado de un string encriptado
   * @param key
   * @returns
   */
  getObject(key: string): any {
    if (this.isBrowser()) {
      try {
        const value: string | null = localStorage.getItem(`${environment.suffixStorage}${key}`);
        if (value) {
          return JSON.parse(CryptoJS.AES.decrypt(value, environment.encryptionKey).toString(CryptoJS.enc.Utf8));
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
  }

  /**
   * Este metodo es agnostico a tipo de valor que se quiera eliminar del local storage
   * @param key
   */
  removeValue(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(`${environment.suffixStorage}${key}`);
    }
  }
}
