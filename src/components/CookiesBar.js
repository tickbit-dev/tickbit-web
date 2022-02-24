import { useState } from "react"
import { Text, Button, Flex, Link } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export default function CookiesBar({...props}) {
    const [useCookies, setUseCookies] = useState(false);

    function acceptCookies(){
        Cookies.set("cookies", true, {expires: 9999});
        setUseCookies(true)
    }

    return(
        <Flex display={useCookies == true ? 'none' : 'flex'} direction={{base: "column", md: "row"}} justifyContent={"center"} alignItems={"center"} w={"100%"} bg={"black"} position={"fixed"} bottom={0} p={"16px"}>
            <Text fontFamily={"Montserrat"} color={"white"} fontWeight={"medium"} fontSize={"sm"} textAlign={"center"}>Usando esta web, estás de acuerdo con el uso de cookies descrito en nuestra <Link textDecoration={"underline"}>política de cookies</Link>.</Text>
            <Button ml={{base: "0px", md: "26px"}} mt={{base: "16px", md: "0px"}} h={"32px"} fontSize={"sm"} onClick={() => acceptCookies()}>Aceptar</Button>
        </Flex>
    )
}