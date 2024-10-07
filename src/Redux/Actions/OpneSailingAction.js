import * as Types from '../ActionTypes'
export const opensailingRequest = ({orign,destination}) => ({
    type: Types.OPENSAILING_REQUEST,
    payload:{orign,destination}
  });