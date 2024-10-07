//PortAction

import * as Types from '../ActionTypes'
export const portRequest = ({search_key, limits}) => ({
    type: Types.PORT_REQUEST,
    payload:{search_key, limits}
  });