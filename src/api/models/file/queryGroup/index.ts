import { APIBase } from '@api/common/abstract/APIBase'
import { ICRUDModel, type ID } from '@api/common/interfaces/ICRUDModel'
import { RequestResult } from '@api/common/responseModels/requestResult'

import type { TFileResponse } from '../responseModels/TFileResponse'
import type { TFileParams } from '../params/TFileParams'
import type { TFilePreviewVariant } from '@utils/constants/filePreviewVariants'
import { FILE_PREVIEW_VARIANTS } from '@utils/constants/filePreviewVariants'

export class FileGroup extends APIBase implements ICRUDModel {
  readonly _URI: string

  constructor(token: string) {
    super(token)
    this._URI = '/files'
  }

  /** Axios response → Laravel JSON body (`{ data, meta, links }`). */
  select = (data: { data: unknown }) => data.data

  index = async (params?: TFileParams): Promise<RequestResult<TFileResponse[]>> => {
    return this.get<TFileResponse[]>(this._URI, { ...params })
  }

  show = async ({ id }: ID): Promise<RequestResult<TFileResponse>> => {
    return this.get<TFileResponse>(`${this._URI}/${id}`)
  }

  destroy = async (id: number): Promise<RequestResult<TFileResponse>> => {
    return this.delete<TFileResponse>(`${this._URI}/${id}`)
  }

  restore = async (id: number): Promise<RequestResult<TFileResponse>> => {
    return this.Restore<TFileResponse>(`${this._URI}/${id}`)
  }

  store = async (): Promise<RequestResult<TFileResponse>> => {
    throw new Error('Use TUS uploader to create files')
  }

  update = async (): Promise<RequestResult<TFileResponse>> => {
    throw new Error('Files cannot be updated via CRUD')
  }

  finalize = async (payload: {
    upload_key: string
    original_name: string
    owner_profile_type?: string
    owner_profile_id?: number
    fileable_type?: string
    fileable_id?: number
  }): Promise<RequestResult<TFileResponse>> => {
    return this.post<TFileResponse>(`${this._URI}/finalize`, payload)
  }

  downloadUrl = (id: number): string =>
    `${import.meta.env.VITE_API_URL}/api/v1${this._URI}/${id}/download`

  previewUrl = (
    id: number,
    variant: TFilePreviewVariant = FILE_PREVIEW_VARIANTS.COMPRESSED
  ): string =>
    `${import.meta.env.VITE_API_URL}/api/v1${this._URI}/${id}/preview?variant=${variant}`

  download = async (id: number): Promise<Blob> => {
    const response = await this._httpClient.get<Blob>(`${this._URI}/${id}/download`, {
      responseType: 'blob',
    })

    return response.data
  }

  preview = async (
    id: number,
    variant: TFilePreviewVariant = FILE_PREVIEW_VARIANTS.COMPRESSED
  ): Promise<Blob> => {
    const response = await this._httpClient.get<Blob>(`${this._URI}/${id}/preview`, {
      params: { variant },
      responseType: 'blob',
    })

    return response.data
  }
}
