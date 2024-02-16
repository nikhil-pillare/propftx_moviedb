import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function Nav() {

    return(
        <Flex align="center" justify="space-around" width="100%" height="50px" bgGradient="linear(to-r, gray.300, violet)"  mb="50px">
        <Link to={"/"}>REGISTER</Link>
        <Link to={"/signin"}>LOGIN</Link>
        <Link to={"/movies"}>MOVIES</Link>
    </Flex>
    )
    
}

export default Nav;