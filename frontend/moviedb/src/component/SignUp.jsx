import { Box, Flex, FormControl, FormLabel, Input, Heading, Button, SubTitle } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../redux/auth/action";
import NavTemp from "./NavTemp";
function SignUp() {
      const [email, setEmail]= useState("")
      const [username, setUsername]= useState("")
      const [avatar, setAvatar]= useState("")
      const [password, setPassword]= useState("")
   const dispatch= useDispatch();
   const toast = useToast()
   const Navigate = useNavigate();

   const handleSubmit=(event)=>{
         event.preventDefault();
         try {
          dispatch(signup({email, username, avatar, password}))
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
            colorScheme: 'green'
          })
          Navigate("./signin")
         } catch (error) {
          toast({
            title: 'error',
            description: "invalid credentials",
            status: 'error',
            duration: 9000,
            isClosable: true,
            
          })
         }
   }

   return (
    <>
    <NavTemp/>
   
    <Box
      width={"md"}
      margin={"auto"}
      backgroundColor={"rgba(255, 255, 255, 0.8)"} 
      borderRadius={"8px"}
      p={8}
      mt={20}
      style={{marginTop:"100px", position:"fixed", top: '35%', left: '50%', transform: 'translate(-50%, -50%)'}}
      
    >
     

      <FormControl>
        <Heading>REGISTER</Heading>
        <FormLabel>Username</FormLabel>
        <Input id="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <FormLabel>Avatar</FormLabel>
        <Input id="image" placeholder="Profile Photo URL" value={avatar} onChange={(e)=>setAvatar(e.target.value)} />
        <FormLabel>E-mail</FormLabel>
        <Input id="email" placeholder="E-mail" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <FormLabel>Password</FormLabel>
        <Input id="password" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <Box>
          <p>
            If you already have an account, please{" "}
            <Link to="/signin" style={{ color: "blue" }}>
              sign in here
            </Link>
            .
          </p>
        </Box>

        <Button onClick={handleSubmit} bg={"teal"} color={"white"} margin={"20px"} name="submit">
          Register
        </Button>
      </FormControl>
    </Box>
    </>
  );

  }
  
  export default SignUp;