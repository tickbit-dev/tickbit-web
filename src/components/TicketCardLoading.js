import { useState, useEffect } from 'react';
import { Box, Center, Flex, Heading, Image, Skeleton, Spacer, Stack, Text } from '@chakra-ui/react';
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
        <Box minw={"100%"} h={ALTURA_TICKET + 20 + "px"} role={'group'} /*_hover={{transform: 'translateY(2px)'}}*/ transition="all .3s ease" {...props}>
            <Box h={ALTURA_TICKET/4 + "px"} transition="all .6s ease" mt={(3*ALTURA_TICKET)/4 + OFFSET_SOMBRA + "px"} /*style={{backgroundImage: `url(${IMAGE})`, filter: 'blur(15px)', zIndex: -1}}*/ filter={'blur(10px)'} borderRadius={16} style={{backgroundImage: `url(${props.imagen})`}} zIndex={-1} _groupHover={{filter: 'blur(15px)'}}>

            </Box>
            <Flex w={"100%"} as={"button"} /*onClick={() => window.open(props.url,"_self")} */ transition="all .1s ease" flex={1} position={"relative"} h={ALTURA_TICKET + "px"} bg={Colors.secondary.gray} mt={-ALTURA_TICKET - OFFSET_SOMBRA + "px"} borderRadius={16} overflow="hidden">
                
                {props.imagen ? <Image position={"absolute"} h={"105%"} w={"105%"} objectFit="cover" src={props.imagen}/> : null}
                <Box style={{backdropFilter: 'saturate(180%) blur(40px)'}} position={"absolute"} borderTopRadius={0} overflow={"hidden"} w={"full"} h={"45%"} top={"55%"} bg={"rgba(0,0,0,0.3)"}/>
                
                <Box position={"absolute"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"} mt={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"}/>
                <Box position={"absolute"} top={(ALTURA_TICKET - FORMA_RECORTE_TICKET_SIZE) / 2.5 + "px"} left={"100%"} ml={-(FORMA_RECORTE_TICKET_SIZE/2) + "px"} h={FORMA_RECORTE_TICKET_SIZE + "px"} w={FORMA_RECORTE_TICKET_SIZE + "px"} borderRadius={"full"} bg={"white"}/>
                
                <Flex zIndex={1} flex={1} w={"full"} h={"full"} alignItems={"end"}>
                    <Flex flex={1} w={"full"} h={"45%"}>
                        <Flex direction={"column"} pb={"10px"} px={"10px"} flex={1} >
                            <Flex direction={"column"} flex={1} alignItems={"center"} justifyContent={"center"} mt={2} >
                                 <Skeleton height='20px' w={'50%'}  borderRadius={"5px"}/>
                                <Flex alignItems={"center"} w={'100%'} justifyContent={"center"} mt={2}>
                                    <Skeleton height='20px'w={'50%'}  borderRadius={"5px"}/>
                                </Flex>
                                <Flex alignItems={"center"} justifyContent={"center"} w={'100%'}  mt={2}>
                                    <Skeleton height='20px' w={'50%'} borderRadius={"5px"}/>
                                </Flex>
                            </Flex>
                            <Skeleton  w={"100%"} h={"45px"} mt={2} borderRadius={"12px"} />
                            
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};
