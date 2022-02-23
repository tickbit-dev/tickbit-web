import { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import { HiTicket } from 'react-icons/hi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'

import IMAGE from "../assets/aitana.jpg"
import Colors from '../constants/Colors';

export default function Ticket({...props}) {

    const [state, setState] = useState();

    const ALTURA_TICKET = 320;
    const RECORTE_TICKET_SIZE = 40;
    const RECORTE_TICKET_RANGO_ALTURA = 3;
    const BORDER_RADIUS = 16;

    useEffect(() => {
    }, []);

    return (
        <Box w={"full"} h={ALTURA_TICKET} {...props}>
            <Flex position={"relative"} h={"full"} borderRadius={BORDER_RADIUS} bg={Colors.secondary.gray} overflow={"hidden"} maxW={"260px"} _hover={{transform: "scale(1.01)"}} transition="all .6s ease">
                
                <Box
                    position={"absolute"}
                    h={RECORTE_TICKET_SIZE + "px"}
                    w={RECORTE_TICKET_SIZE + "px"}
                    borderRadius={"full"} bg={"white"}
                    mt={(ALTURA_TICKET - RECORTE_TICKET_SIZE) / RECORTE_TICKET_RANGO_ALTURA + "px"}
                    ml={-(RECORTE_TICKET_SIZE/2) + "px"}
                    zIndex={2}
                />
                <Box 
                    position={"absolute"}
                    top={(ALTURA_TICKET - RECORTE_TICKET_SIZE) / RECORTE_TICKET_RANGO_ALTURA + "px"}
                    left={"100%"} ml={-(RECORTE_TICKET_SIZE/2) + "px"}
                    h={RECORTE_TICKET_SIZE + "px"}
                    w={RECORTE_TICKET_SIZE + "px"}
                    borderRadius={"full"}
                    bg={"white"}
                    zIndex={2}
                />
                
                { props.imagen ? 
                    <Image
                        position={"absolute"}
                        h={"full"}
                        w={"full"}
                        objectFit="cover"
                        src={props.imagen}
                    /> 
                : null }

                <Flex w={"full"} h={"full"} direction={"column"} overflow={"hidden"} zIndex={1}>
                    <Spacer/>
                    <Flex w={"full"} direction={"column"} bg={"rgba(255,255,255,0.9)"} p={"10px"} borderRadius={BORDER_RADIUS} borderBottomWidth={1} borderLeftWidth={1} borderRightWidth={1} borderColor={Colors.secondary.grayHover}>
                        <Text fontWeight={"bold"} fontSize={"18px"} fontFamily={"Montserrat"}>Aitana</Text>
                        <Flex alignItems={"center"}>
                            <BsFillCalendarFill color={"black"} size={"10px"}/>
                            <Text color={"black"} fontSize={13} fontFamily={"Montserrat"} ml={"10px"}>{props.fecha}</Text>
                        </Flex>
                        <Flex alignItems={"center"}>
                            <MdLocationPin color={"black"} size={"14px"}/>
                            <Text color={"black"} fontSize={13} fontFamily={"Montserrat"} ml={"6px"}>{props.sitio}</Text>
                        </Flex>

                        <Flex as={"button"} _groupHover={{transform: "translateY(-2px)", backgroundColor: "rgba(255,255,255,0.3)"}} transition="all .6s ease" w={"100%"} h={"45px"} bg={Colors.secondary.gray} mt={"16px"} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"}>
                            <HiTicket color={"black"}/>
                            <Text ml={"10px"} color={"black"} fontWeight={600} fontFamily={"Montserrat"} fontSize={14}>Comprar tickets</Text>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </Box>
    );
};
