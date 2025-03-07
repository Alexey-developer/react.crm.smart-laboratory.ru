import { TMetadata } from '../types/TMetadata'

class EmptyRequestResult {
  errorCode?: string
  errorMessages?: string[]
  // statusCode: number;
}

export class RequestResult<T> extends EmptyRequestResult {
  /*recieve_user_id (user: TUser, creds: TCredentials, isForInvitation: boolean, recieve_user_id: any) {
        throw new Error('Method not implemented.');
    }*/
  data?: T & { meta?: TMetadata }
}

// export { EmptyRequestResult, RequestResult }
