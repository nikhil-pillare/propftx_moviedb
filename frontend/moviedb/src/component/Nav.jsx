import { Box, Button, Flex } from "@chakra-ui/react";
import { Link ,} from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
function Nav() {
    const {isAuth}= useSelector((store)=>store.auth)
    const storedAuth = localStorage.getItem("isAuth");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : isAuth;
    return(
        <Flex align="center" justify="space-between" width="100%" height="60px" bgGradient="linear(to-r, gray.300, violet)" position={"fixed"} mb="50px" zIndex={"2"} top={"0"}>
            <Heading style={{fontFamily:"fantasy", color:"black"}} ml={"30px"}>Prop<span style={{color:"teal"}}>FTX</span></Heading>

            <Flex width={"30%"} justifyContent={"space-around"}>
            <Button>
            <Link to={"/movies"}>MOVIES</Link>
            </Button>
           
            
            {initialAuth?
            <Button>
                 
                <Link to="/" >SIGNOUT</Link>.
            </Button>:
        <Button>
        <Link to={"/"}>REGISTER</Link>
        <span>/</span>
        <Link to={"/signin"}>LOGIN</Link>
   
        </Button>
        }
            

           
           
        
            </Flex>
        
    </Flex>
    )
    
}

export default Nav;