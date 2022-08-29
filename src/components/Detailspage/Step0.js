import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid, useBreakpointValue, Skeleton, SkeletonText, Stack, } from '@chakra-ui/react';
import Portada from '../Portada';
import { FiUser } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import Colors from '../../constants/Colors';

import MAPAPRUEBA from '../../assets/mapaprueba.JPG';
import TicketCardCompra from '../Detailspage/TicketCardCompra';
import Asientoscard from '../Asientoscard';
import { cutIntervalDate, getCategoryById } from '../../utils/funcionesComunes';

const BORDER_RADIUS = {base: '10px', md: '20px'}

export default function EventDetailsPage({...props}) {

    return (
        <Box mb={20}>
            <Box mt={{base:10,md:10}}  >
                <Portada image={props.event.coverImageUrl}/>
            </Box>
            <Stack flex={1} spacing={"16px"}>
                <Flex flex={1}>
                    <Skeleton flex={1} isLoaded={props.isEventLoaded} borderRadius={"5px"}>
                        <Heading as={"h2"} size='md' fontFamily={'Montserrat'}>{props.event.artist}</Heading>
                        <Heading fontFamily={'Montserrat'}>{props.event.title}</Heading>
                    </Skeleton>
                </Flex>
                <Stack flex={1} direction={'row'} spacing={"36px"}>
                    <Flex flex={1} h={{base: '200px', md: '310px'}}>
                        <Skeleton flex={1} isLoaded={props.isEventLoaded} borderRadius={BORDER_RADIUS}>
                            <Flex
                                w={'100%'}
                                overflow={"hidden"}
                                borderRadius={BORDER_RADIUS}
                                h={{base: '200px', md: '310px'}}
                                transition="all .6s ease"
                                style={{WebkitTapHighlightColor: "transparent"}}
                            >
                                {props.event.coverImageUrl ? <Image _hover={{base: {transform: 'scale(1.01)'}, md: {transform: 'scale(1.004)'}}} bg={Colors.secondary.gray} transition="all .6s ease" w={"full"} h={"100%"} fit={'cover'} src={props.event.coverImageUrl}/> : null}
                            </Flex>
                        </Skeleton>
                    </Flex>
                    <Flex flex={1.5} h={{base: '200px', md: '310px'}}>
                        <Flex flex={1} direction={'column'}>
                            <Skeleton isLoaded={props.isEventLoaded} height='30px' width={'100%'} borderRadius={"5px"} mt={3}>
                                <Text fontSize={"lg"} fontFamily={'Montserrat'} fontWeight={500} mt={2} textAlign={"justify"}>{props.event.description}</Text>
                            </Skeleton>
                            <Skeleton isLoaded={props.isEventLoaded} height='30px' width={'100%'} borderRadius={"5px"} mt={3} />
                            <Skeleton isLoaded={props.isEventLoaded} height='30px' width={'100%'} borderRadius={"5px"} mt={3} />
                            <Skeleton isLoaded={props.isEventLoaded} height='30px' width={'100%'} borderRadius={"5px"} mt={3} />
                        </Flex>
                    </Flex>
                </Stack>
                <Skeleton isLoaded={props.isEventLoaded} borderRadius={BORDER_RADIUS}>
                    <Asientoscard
                        event={props.event}
                        availability={props.availability}
                        isEventLoaded={props.isEventLoaded}
                        isPriceLoaded={props.isPriceLoaded}
                        usdPricePerTicket={props.usdPricePerTicket}
                        maticUsdConversion={props.maticUsdConversion}
                        onNext={() => {props.onNext()}}
                        onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
                        numTickets={props.numTickets}
                    />
                </Skeleton>
            </Stack>
                
            {/*<Skeleton isLoaded={props.isEventLoaded} height='40px' width={'300px'}  borderRadius={"5px"} mt={2} mr={'auto'} ml={{base:'auto' , sm:'auto',md:'0'}}>
                <Heading fontFamily={'Montserrat'}>{props.event.title}</Heading>
            </Skeleton>
                
            <Flex  direction={{base:"column",md:"row"}} mt={5} >
                <Flex w={"100%"} mb={{base:5,md:0}} direction={"column"}>
                    <Text fontSize={"3xl"} as='u'>Información</Text>
                    <Flex direction={'column'}>
                        <Skeleton isLoaded={props.isEventLoaded} height='20px' width={'100%'}  borderRadius={"5px"} mt={3}>
                            <Text fontSize={"xl"} mt={2} textAlign={"justify"}>{props.event.description}</Text>
                        </Skeleton>
                        <Skeleton isLoaded={props.isEventLoaded} height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                        <Skeleton isLoaded={props.isEventLoaded} height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                        <Skeleton isLoaded={props.isEventLoaded} height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                    </Flex>
                 </Flex> 

                <Flex w={"100%"} direction={"column"} ml={{base:0,md:'20%'}} mt={2}>
                    <Flex alignItems={'center'}>
                        <Center w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <BiUser strokeWidth="0.2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} ml={5} fontWeight={"bold"}>Artista/s: &nbsp;</Text>
                        <Skeleton isLoaded={props.isEventLoaded} borderRadius={"5px"} w={'200px'} h={"25px"}>
                            <Text fontFamily={'Montserrat'}>{props.event.artist}</Text>
                        </Skeleton>
                    </Flex>
                    <Flex mt={5} alignItems={'center'}>
                        <Center w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <IoCalendarOutline size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} ml={5} fontWeight={"bold"}>Fecha: &nbsp;</Text>
                        <Skeleton isLoaded={props.isEventLoaded} borderRadius={"5px"} w={'200px'}>
                            <Text fontFamily={'Montserrat'}>{props.event.initialDate == props.event.finalDate ? cutIntervalDate(props.event.initialDate) : (cutIntervalDate(props.event.initialDate) + " - " + cutIntervalDate(props.event.finalDate))}</Text>
                        </Skeleton>
                    </Flex>
                    <Flex mt={5} alignItems={'center'}>
                        <Center w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <BiCategoryAlt  strokeWidth=".2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} ml={5} fontWeight={"bold"}>Categoria: &nbsp;</Text>
                        <Skeleton isLoaded={props.isEventLoaded} borderRadius={"5px"} w={'200px'}>
                            <Text fontFamily={'Montserrat'}>{getCategoryById(props.event.idCategory).name}</Text>
                        </Skeleton>
                    </Flex>
                </Flex>
            </Flex>

            <Skeleton isLoaded={props.isEventLoaded} borderRadius={"10px"}>
                <Asientoscard
                    event={props.event}
                    availability={props.availability}
                    isEventLoaded={props.isEventLoaded}
                    isPriceLoaded={props.isPriceLoaded}
                    usdPricePerTicket={props.usdPricePerTicket}
                    maticUsdConversion={props.maticUsdConversion}
                    onNext={() => {props.onNext()}}
                    onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
                    numTickets={props.numTickets}
                />
            </Skeleton>*/}
        </Box>
    );
};
    