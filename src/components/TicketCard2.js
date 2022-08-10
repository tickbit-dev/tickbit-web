import { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import { HiTicket } from 'react-icons/hi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'

import IMAGE from "../assets/aitana.jpg"
import Colors from '../constants/Colors';

export default function TicketCard({...props}) {

    const [state, setState] = useState();

    const ALTURA_TICKET = 320;
    const FORMA_RECORTE_TICKET_SIZE = 40;
    const OFFSET_SOMBRA = 10

    useEffect(() => {
    }, []);

    return (
        <Box w={'300px'} h={ALTURA_TICKET + 20 + "px"} role={'group'} transition="all .3s ease" {...props}>
            <Flex w={"100%"} as={"button"} transition="all .1s ease" flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={Colors.secondary.gray} borderRadius={16} overflow="hidden">
                
                {props.imagen ? <Image position={"absolute"} h={"55%"} w={"100%"} objectFit="cover" src={props.imagen}/> : null}
                {/*<Box style={{backdropFilter: 'saturate(180%) blur(40px)'}} position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"45%"} top={"55%"} bg={"rgba(0,0,0,0.3)"}/>*/}
                {/*<Box position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"75%"} top={"25%"} bgGradient='linear(to-t, black, transparent)'/>*/}
                {/*<Box position={"absolute"} style={{backdropFilter: 'blur(40px)'}} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"45%"} top={"55%"} bgGradient='linear(to-t, black, transparent)'>
                    <Image style={{filter: 'saturate(180%)'}} w={"105%"} h={"105%"} src={props.imagen} />
                </Box>*/}
                <Box style={{backdropFilter: 'saturate(180%) blur(40px)'}} position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"45%"} top={"55%"} bg={"rgba(0,0,0,0.3)"}/>

                
                <Box position={"absolute"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
                <Box position={"absolute"} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
                
                <Flex zIndex={1} flex={1} w={"full"} h={"full"} alignItems={"end"}>
                    <Flex flex={1} w={"full"} h={"45%"}>
                        <Flex direction={"column"} pb={"10px"} px={"10px"} flex={1}>
                            <Flex direction={"column"} flex={1} alignItems={"left"} justifyContent={"center"}>
                                <Flex alignItems={"center"} justifyContent={"left"}>
                                    <BsFillCalendarFill color={"white"} size={"10px"}/>
                                    <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} ml={"10px"} textAlign="left">{props.fecha}</Text>
                                </Flex>
                                <Text color={"white"} fontWeight={"bold"} fontSize={20} mb={"0px"} mt={"-2px"} fontFamily={"Montserrat"} textAlign='left'>{props.titulo}</Text>
                                <Flex alignItems={"center"} justifyContent={"left"}>
                                    <MdLocationPin color={"white"} size={"14px"}/>
                                    <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} ml={"6px"} textAlign="left">{props.sitio}</Text>
                                </Flex>
                            </Flex>
                            <Flex as={"button"} onClick={() => window.open(props.url, '_self')} _groupHover={{backgroundColor: "rgba(255,255,255,0.3)"}} transition="all .6s ease" w={"100%"} h={"45px"} bg={"rgba(255,255,255,0.2)"} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"}>
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
