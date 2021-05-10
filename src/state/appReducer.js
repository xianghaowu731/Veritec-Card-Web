import {
  
  STORE_USER_DATA,
  SET_SEL_ORDER_CARD_FRONT
} from './constants'

const initialState = {
  
  userData: null,
  selOrderCardFront:undefined
}

import { navigate } from 'gatsby'

export default (state = initialState, action) => {
  switch (action.type) {
    
    case STORE_USER_DATA:
    
      const newStateStoreUserData = { ...state, userData: action.userData }
      
      return newStateStoreUserData
    case SET_SEL_ORDER_CARD_FRONT:
      return {
        ...state, 
        selOrderCardFront: action.data
      }
    default:
      return state
  }
}
