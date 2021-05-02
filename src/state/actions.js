import {
    
    STORE_USER_DATA,
    
} from "./constants"


export const storeUserData = userData => ({
    type: STORE_USER_DATA, userData
});
