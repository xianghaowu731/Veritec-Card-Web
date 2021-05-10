import {
    
    STORE_USER_DATA,
    SET_SEL_ORDER_CARD_FRONT
} from "./constants"


export const storeUserData = userData => ({
    type: STORE_USER_DATA, userData
});


export const setSelOrderCardFront = data =>({
    type: SET_SEL_ORDER_CARD_FRONT, data
})