import { useState, useEffect } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import DY from "../assets/estopa.jpg"

export default function Ticket({...props}) {

    const [state, setState] = useState();

    const ALTURA_TICKET = 350;
    const ANCHURA_TICKET = 300;
    const FORMA_RECORTE_TICKET_SIZE = 40;

    useEffect(() => {
    }, []);

    return (
        <Flex flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={"blue"} borderRadius={20} overflow="hidden" {...props}>
            <Image position={"absolute"} h={"full"} w={"full"} objectFit="cover" src={DY}/>
            <Box position={"absolute"} w={"full"} h={"40%"} bg={"rgba(0,0,0,0.7)"} top={"60%"}>

            </Box>
            <Box position={"absolute"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
            <Box position={"absolute"} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
            <Flex zIndex={1} direction={"column"} w={"full"} h={"full"} p={"16px"} justifyContent={"end"}>
                <Text color={"white"}>Hola asdadasdsa asdsad asdsad asdas das dasda</Text>
                <Flex w={"100%"} h={"50px"} bg={"white"} borderRadius={"20px"} alignItems={"center"} justifyContent={"center"}>
                    <Text color={"black"} fontWeight={"bold"}>Comprar tickets</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
