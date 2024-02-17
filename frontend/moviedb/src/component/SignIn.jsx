import { Box, Button, Flex , FormControl, FormLabel, Heading, Input} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../redux/auth/action";
import { useState , } from "react";
import { useToast } from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import NavTemp from "./NavTemp";
import Nav from "./Nav";
function SignIn() {
  const [email, setEmail]= useState("")
  
  const [password, setPassword]= useState("")
   const dispatch = useDispatch();
   const data= useSelector(store=>store.auth.isAuth)
   const toast = useToast()
   const navigate = useNavigate()
   
   const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       
       await dispatch(signin({ email, password }));
       if(data){
        toast({
            title: 'Login Successful',
            description: 'Welcome!!',
            status: 'success',
            duration: 3000,
            isClosable: true,
         });
   
        setTimeout(()=>{
          navigate("/movies");
        },1000)
       }else{
         toast({
            title: 'Login Failed Try after some time',
            description: '',
            status: 'error',
            duration: 3000,
            isClosable: true,
         });
       }
      
       
    } catch (error) {
     
       toast({
          title: 'Login Failed',
          description: 'Please try again',
          status: 'error',
          duration: 3000,
          isClosable: true,
       });
    }
 } 
 return (
  <>

  <NavTemp/>
  <Box width={"md"}
  margin={"auto"}
  backgroundColor={"rgba(255, 255, 255, 0.8)"} 
  borderRadius={"8px"}
  p={8}
  style={{marginTop:"100px", position:"fixed", top: '35%', left: '50%', transform: 'translate(-50%, -50%)'}}
  >
    
  <FormControl style={{marginTop:"0px"}}>
    <Heading>Login</Heading>
   <FormLabel>E-mail</FormLabel>
   <Input id="loginmail" placeholder='E-mail' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
   <FormLabel>Password</FormLabel>
   <Input id="loginpassword" placeholder='Password' type={"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
   <p>
        Didn't have an account, please{" "}
        <Link to="/" style={{color:"blue"}}>sign up here</Link>.
      </p>
   <Button type="submit" bg={"teal"} margin={"20px"} color={"white"} onClick={handleSubmit} name="submit">Login</Button>
  </FormControl>
</Box>

</>
);
   
  }
  
  export default SignIn;