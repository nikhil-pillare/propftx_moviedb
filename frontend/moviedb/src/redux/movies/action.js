import { FETCHFAILURE, FETCHREQUEST, FETCHSUCCESS, POSTFAILURE,POSTSUCCESS,POSTREQUEST } from "./actionTypes";
import axios from "axios";



export const fetchMovie = () => async (dispatch) => {
    dispatch({ type: FETCHREQUEST});
  
    try {
      const response = await axios.get('https://backendmoviedb.onrender.com/movies');
      dispatch({ type: FETCHSUCCESS, payload: response.data });
      console.log("detch res.data",response.data)
      
    } catch (error) {
      dispatch({ type: FETCHFAILURE, payload: error.message });
    }
  };