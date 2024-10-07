//PortAction

import * as Types from '../ActionTypes'
export const LoginRequest = ({sUsername,spassword}) => ({
    type: Types.LOGIN_REQUEST,
    payload:{sUsername, spassword}
  });