import axios, { AxiosInstance } from 'axios'
import { TMetadata } from 'types/metadata'
import { GlobalConstants } from '../constants/global'
import { ErrorCodes } from '../enums/errorCodes'
import { RUStrings } from '../localization/ruRU'
import { RequestResult } from './responseModels/requestResult'

class CRMAPIBase {
  protected _httpClient: AxiosInstance
  protected _token?: string

  constructor(token?: string) {
    this._httpClient = axios.create({
      baseURL: GlobalConstants.BaseUrl,
      timeout: GlobalConstants.RequestTimeout,
    })
    this._httpClient.defaults.headers.post['Content-Type'] = 'application/json'
    this._httpClient.defaults.headers.put['Content-Type'] = 'application/json'
    if (token) {
      this._token = token
      this._httpClient.defaults.headers.common['Authorization'] =
        'Bearer ' + this._token
    }
  }

  /**
   * Отправка GET запроса
   * @param url url запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected async get<T>(url: string, params?: any): Promise<RequestResult<T>> {
    return this.request('GET', url, null, params)
  }

  /**
   * Отправка POST запроса
   * @param url url запроса
   * @param data Параметры для тела запроса
   * @param params Параметры для строки запроса
   * @returns Результат запроса
   */
  protected async post<T>(
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
  protected async put<T>(
    url: string,
    data?: any,
    params?: any
  ): Promise<RequestResult<T>> {
    return this.request('PUT', url, data, params)
  }

  /**
   * Отправка DELETE запроса
   * @param url url запроса
   * @param params Параметры для тела запроса
   * @returns Результат запроса
   */
  protected async delete<T>(
    url: string,
    params?: any
  ): Promise<RequestResult<T>> {
    return this.request('DELETE', url, null, params)
  }

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
    let result = new RequestResult<T>()
    try {
      const response = await this._httpClient.request<T & { meta?: TMetadata }>(
        {
          method: method,
          url: url,
          data: data,
          params: params,
        }
      )
      result.statusCode = response.status
      if (response.status >= 200 && response.status <= 300) {
        result.data = response.data
      } else {
        result = CRMAPIBase.parseErrors<T>(response.status, response.data)
      }
    } catch (error) {
      result = CRMAPIBase.parseErrors<T>(
        error.response.status,
        error.response.data
      )
    }
    return result
  }

  /**
   * Парсинг ошибок
   * @param data Тело
   * @returns Расшифровка
   */
  public static parseErrors<T>(
    statusCode: number,
    data: any
  ): RequestResult<T> {
    if (Object.keys(data).includes('exception')) {
      return {
        statusCode: statusCode,
        errorCode: data?.errorCode,
        errorMessages: ['Ошибка сервера'],
      }
    } else if (Object.keys(data).includes('errors')) {
      return {
        statusCode: statusCode,
        errorCode: data?.errorCode,
        errorMessages: Object.values(data?.errors),
      }
    } else {
      return {
        statusCode: statusCode,
        errorCode: data?.errorCode,
        errorMessages: Object.keys(ErrorCodes).includes(data?.errorCode)
          ? [RUStrings[data?.errorCode]]
          : [data?.errorCode],
      }
    }
  }

  // /**
  //  * Получение логируемой информации
  //  * @param response Объект ответа на запрос
  //  * @returns Строка лога
  //  */
  // private static getLogInfo<T>(response: AxiosResponse<T, any>): string {
  //     // Для IP надо спрашивать какой-то другой сервак или соотносить на бэке с Bearer Token
  //     return response.request.code + " " + response.request.responseUrl + " " + response.config.data;
  // }
}

export { CRMAPIBase }
