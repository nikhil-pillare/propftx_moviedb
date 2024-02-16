import { Route, Routes } from "react-router-dom";
import SignIn from "../component/SignIn";
import SignUp from "../component/SignUp";
import { PrivateRoute } from "../component/PrivateRoute";
import Movies from "./movies";
export const MainRoutes=()=>{

    return <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/movies" element={
    <PrivateRoute>
          <Movies/>
    </PrivateRoute>
    }/>
    
</Routes>
}