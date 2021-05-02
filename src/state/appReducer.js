import {
  
  STORE_USER_DATA,
} from './constants'

const initialState = {
  
  userData: null,
 
}

import { navigate } from 'gatsby'

export default (state = initialState, action) => {
  switch (action.type) {
    
    case STORE_USER_DATA:
    
      const newStateStoreUserData = { ...state, userData: action.userData }
      
      return newStateStoreUserData

    default:
      return state
  }
}
