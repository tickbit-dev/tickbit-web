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
    const FORMA_RECORTE_TICKET_SIZE = 40;
    const OFFSET_SOMBRA = 10

    useEffect(() => {
    }, []);

    return (
        <Box w={'300px'} h={ALTURA_TICKET + 20 + "px"} role={'group'} /*_hover={{transform: 'translateY(2px)'}}*/ transition="all .3s ease" {...props}>
            <Box h={ALTURA_TICKET/4 + "px"} transition="all .6s ease" mt={(3*ALTURA_TICKET)/4 + OFFSET_SOMBRA + "px"} /*style={{backgroundImage: `url(${IMAGE})`, filter: 'blur(15px)', zIndex: -1}}*/ filter={'blur(10px)'} borderRadius={16} style={{backgroundImage: `url(${props.imagen})`}} zIndex={-1} _groupHover={{filter: 'blur(15px)'}}>

            </Box>
            <Flex w={"100%"} as={"button"} /*onClick={() => window.open(props.url,"_self")} */ transition="all .1s ease" flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={Colors.secondary.gray} mt={-ALTURA_TICKET - OFFSET_SOMBRA + "px"} borderRadius={16} overflow="hidden">
                
                {props.imagen ? <Image position={"absolute"} h={"105%"} w={"105%"} objectFit="cover" src={props.imagen}/> : null}
                <Box style={{backdropFilter: 'saturate(180%) blur(40px)'}} position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"45%"} top={"55%"} bg={"rgba(0,0,0,0.3)"}/>
                
                <Box position={"absolute"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
                <Box position={"absolute"} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
                
                <Flex zIndex={1} flex={1} w={"full"} h={"full"} alignItems={"end"}>
                    <Flex flex={1} w={"full"} h={"45%"}>
                        <Flex direction={"column"} pb={"10px"} px={"10px"} flex={1}>
                            <Flex direction={"column"} flex={1} alignItems={"center"} justifyContent={"center"} alignItems="center">
                                <Text color={"white"} fontWeight={"bold"} fontSize={20} mb={"0px"} mt={"-2px"} fontFamily={"Montserrat"}>{props.titulo}</Text>
                                <Flex alignItems={"center"} justifyContent={"center"}>
                                    <BsFillCalendarFill color={"white"} size={"10px"}/>
                                    <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} ml={"10px"}>{props.fecha}</Text>
                                </Flex>
                                <Flex alignItems={"center"} justifyContent={"center"}>
                                    <MdLocationPin color={"white"} size={"14px"}/>
                                    <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} ml={"6px"}>{props.sitio}</Text>
                                </Flex>
                            </Flex>
                            <Flex as={"button"} _groupHover={{transform: "translateY(-2px)", backgroundColor: "rgba(255,255,255,0.3)"}} transition="all .6s ease" w={"100%"} h={"45px"} bg={"rgba(255,255,255,0.2)"} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"}>
                                <HiTicket color={"white"}/>
                                <Text ml={"10px"} color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar tickets</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};
