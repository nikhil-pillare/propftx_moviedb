import { SIGNINFAILURE,SIGNUPFAILURE, SIGNINREQUEST, SIGNINSUCCESS, SIGNUPREQUEST, SIGNUPSUCCESS, } from "./actionTypes";

const initialState = {
    isloading: false,
    iserror: false,
    isAuth:true,
    
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGNUPREQUEST:
            return {
                ...state, isloading: true
            }
        case SIGNUPSUCCESS:
            return {
                ...state, isloading: false,
            }
        case SIGNUPFAILURE:
            return {
                ...state, isloading: false, iserror: true
            }
        case SIGNINREQUEST:
            return {
                ...state, isloading: true
            }
        case SIGNINSUCCESS:
                return {
                    ...state, isloading:false, isAuth:true
                }   
        case SIGNINFAILURE:
                    return {
                        ...state, iserror:true 
                    }              

        default:
            return state
    }
}