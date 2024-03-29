import { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, Image, Skeleton, Spacer, Stack, Text } from '@chakra-ui/react';
import { HiTicket } from 'react-icons/hi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { MdLocationPin } from 'react-icons/md'
import getAverageColor from 'get-average-color'

import IMAGE from "../assets/aitana.jpg"
import Colors from '../constants/Colors';

export default function TicketCard({...props}) {

    const [state, setState] = useState({r:240, g:241, b:248});
    const [isColorLoaded, setIsColorLoaded] = useState(false);

    const ALTURA_TICKET = 340;
    const FORMA_RECORTE_TICKET_SIZE = 40;
    const OFFSET_SOMBRA = 10

    useEffect(() => {
        if(props.isLoaded){
            getAverageColor(props.imagen).then(rgb => {
                setState(rgb)
                setIsColorLoaded(true)
            }) // { r: 66, g: 83, b: 25 }
        }
    }, []);

    useEffect(() => {
        getAverageColor(props.imagen).then(rgb => {
            setState(rgb)
            setIsColorLoaded(true)
        })
    }, [props.updatecolor]);

    return (
        <Box role={"group"} maxW={(1280/5) - 12 - 16/4 - 5} w={(1280/5) - 12 - 16/4 - 5} h={ALTURA_TICKET + 20 + "px"} mt={"10px"} {...props}>
                <Flex w={"100%"} flex={1} position={"relative"} h={ALTURA_TICKET + "px"} borderRadius={16} overflow="hidden">
                    <Box position={"absolute"} zIndex={1} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
                    <Box position={"absolute"} zIndex={1} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
                    
                    <Skeleton isLoaded={props.isLoaded && isColorLoaded} w={'100%'} h={'100%'} startColor={Colors.secondary.gray} endColor={"#d3d6e6"} borderRadius={16} overflow="hidden">

                    <Flex w={"100%"} flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={Colors.secondary.gray} borderRadius={16} overflow="hidden">
                        {props.isLoaded ? props.imagen ? <Image id={"ticketcard" + props.index} _groupHover={{transform: 'scale(1.02)'}} transition="all .4s ease" position={"absolute"} h={"52%"} w={"100%"} objectFit="cover" src={props.imagen}/> : null : null}
                        {props.isLoaded ? <Box position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"48%"} top={"52%"} bg={'rgba(' + (state.r) + ',' + (state.g) + ',' + (state.b) + ')'}/> : null}

                        <Box position={"absolute"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
                        <Box position={"absolute"} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
                        
                        {props.isLoaded ?
                            <Flex zIndex={1} flex={1} w={"full"} h={"full"} alignItems={"end"}>
                                <Flex flex={1} w={"full"} h={"48%"}>
                                    <Flex direction={"column"} pb={"10px"} px={"10px"} flex={1}>
                                        <Flex direction={"column"} flex={1} alignItems={"left"} justifyContent={"center"}>
                                            <Text color={"white"} fontWeight={"600"} fontSize={14} mb={"0px"} fontFamily={"Montserrat"} textAlign='left' noOfLines={1}>{props.artist}</Text>
                                            <Text color={"white"} fontWeight={"bold"} fontSize={18} mb={"0px"} mt={"-2px"} fontFamily={"Montserrat"} textAlign='left' noOfLines={1}>{props.titulo}</Text>
                                            <Flex alignItems={"center"} justifyContent={"left"} pl={"3px"}>
                                                <BsFillCalendarFill color={"white"} size={"10px"}/>
                                                <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} fontWeight={"600"} ml={"7px"} textAlign="left">{props.fecha}</Text>
                                            </Flex>
                                            <Flex alignItems={"center"} justifyContent={"left"}>
                                                <MdLocationPin color={"white"} size={"14px"}/>
                                                <Text color={"white"} fontSize={13} fontFamily={"Montserrat"} fontWeight={"600"} ml={"6px"} textAlign="left" noOfLines={1}>{props.city + " (" + props.sitio + ")"}</Text>
                                            </Flex>
                                        </Flex>
                                        <Flex as={"button"} onClick={() => window.open(props.url, '_self')} _hover={{backgroundColor: "rgba(255,255,255,0.3)"}} transition="all .6s ease" w={"100%"} h={"45px"} bg={"rgba(255,255,255,0.2)"} borderRadius={"12px"} alignItems={"center"} justifyContent={"center"}>
                                            <HiTicket color={"white"}/>
                                            <Text ml={"10px"} color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar tickets</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                        : null}
                    </Flex>
                    </Skeleton>
                </Flex>
        </Box>
    );
};
