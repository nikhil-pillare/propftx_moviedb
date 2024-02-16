import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {


    const {isAuth}= useSelector((store)=>store.auth)
     

    const storedAuth = localStorage.getItem("isAuth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : isAuth;

  if (!initialAuth) {
    return <Navigate to="/signin" />;
  }

  return children;
};