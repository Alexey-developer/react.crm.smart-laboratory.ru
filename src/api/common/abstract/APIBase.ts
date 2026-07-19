import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { RequestResult } from '@api/common/responseModels/requestResult'
import { TMetadata } from '@api/common/types/TMetadata'

const IDEMPOTENCY_KEY_HEADER = 'Idempotency-Key'
const MUTATING_METHODS = new Set(['post', 'put', 'patch', 'delete'])

const newIdempotencyKey = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

export abstract class APIBase {
  protected _httpClient: AxiosInstance
  protected _restoreUri: string
  protected _token?: string

  constructor(token: string) {
    this._restoreUri = 'restore'
    this._token = token

    this._httpClient = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    })
    this._httpClient.defaults.headers.post['Content-Type'] =
      this._httpClient.defaults.headers.put['Content-Type'] = 'application/json'

    if (this._token) {
      this._httpClient.defaults.headers.common['Authorization'] =
        'Bearer ' + this._token
    }
  }

  protected select = (data: any) => data.data //.data

  /**
   * Отправка Общего запроса
   * @param method Метод запроса
   * @param url url запроса
   * @param data Параметры для тела запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  private async request<T>(
    method: string,
    url: string,
    data?: any,
    params?: any
  ): Promise<RequestResult<T>> {
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
      params: params,
    }

    if (MUTATING_METHODS.has(method.toLowerCase())) {
      config.headers = {
        [IDEMPOTENCY_KEY_HEADER]: newIdempotencyKey(),
      }
    }

    const response = await this._httpClient.request<T & { meta?: TMetadata }>(
      config
    )
    return response
  }

  /**
   * Отправка GET запроса
   * @param url url запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected get<T>(url: string, params?: any): Promise<RequestResult<T>> {
    return this.request('GET', url, null, params)
  }

  /**
   * Отправка POST запроса
   * @param url url запроса
   * @param data Параметры для тела запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected post<T>(
    url: string,
    data?: any,
    params?: any
  ): Promise<RequestResult<T>> {
    return this.request('POST', url, data, params)
  }

  /**
   * Отправка PUT запроса
   * @param url url запроса
   * @param data Параметры для тела запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected put<T>(
    url: string,
    data?: any,
    params?: any
  ): Promise<RequestResult<T>> {
    return this.request('PUT', url, data, params)
  }

  /**
   * Отправка PATCH запроса
   * @param url url запроса
   * @param data Параметры для тела запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected patch<T>(
    url: string,
    data?: any,
    params?: any
  ): Promise<RequestResult<T>> {
    return this.request('PATCH', url, data, params)
  }

  /**
   * Отправка DELETE запроса
   * @param url url запроса
   * @param params Параметры для тела запроса
   * @returns Результат запроса
   */
  protected delete<T>(url: string, params?: any): Promise<RequestResult<T>> {
    return this.request('DELETE', url, null, params)
  }

  /**
   * Отправка RESTORE запроса
   * @param url url запроса
   * @returns Результат запроса
   */
  protected Restore<T>(url: string): Promise<RequestResult<T>> {
    return this.post(`${url}/${this._restoreUri}`)
  }
}
