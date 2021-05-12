import {
    
    STORE_USER_DATA,
    SET_SEL_ORDER_CARD_FRONT,
    SET_SEL_CARD
} from "./constants"


export const storeUserData = userData => ({
    type: STORE_USER_DATA, userData
});


export const setSelOrderCardFront = data =>({
    type: SET_SEL_ORDER_CARD_FRONT, data
})

export const setSelCard = data => ({
    type: SET_SEL_CARD, data
})