import { FETCHFAILURE, FETCHREQUEST, FETCHSUCCESS, POSTFAILURE,POSTSUCCESS,POSTREQUEST } from "./actionTypes";


const initialState = {
    movies:[],
    isLoading: false,
    isError: false,
  };


  const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHREQUEST:
      case FETCHSUCCESS:
        return {
          ...state,
          isLoading: false,
          movies: action.payload,
          
        };
      case FETCHFAILURE:
      
  
      
  
      default:
        return state;
    }
  };
  
  export default movieReducer;