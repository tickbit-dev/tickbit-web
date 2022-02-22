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

    useEffect(() => {
    }, []);

    return (
        <Box w={"full"} h={ALTURA_TICKET} {...props}>
            <Flex position={"relative"} h={"full"} borderRadius={16} bg={Colors.secondary.gray} overflow={"hidden"} maxW={"260px"} _hover={{transform: "scale(1.01)"}} transition="all .6s ease">
                
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

                <Flex w={"full"} h={"full"} alignItems={"end"} zIndex={1}>
                    <Box h={"45%"} w={"full"} style={{backdropFilter: 'saturate(180%) blur(40px)'}} bg={"rgba(0,0,0,0.3)"}>
                        
                    </Box>
                </Flex>

            </Flex>
            {/*<Flex w={"100%"} as={"button"} transition="all .1s ease" flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={Colors.secondary.gray} borderRadius={16} overflow="hidden">
                
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
            </Flex>*/}
        </Box>
    );
};
