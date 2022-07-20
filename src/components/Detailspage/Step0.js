import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid, useBreakpointValue, Skeleton, } from '@chakra-ui/react';
import Portada from '../Portada';
import { FiUser } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import Colors from '../../constants/Colors';

import MAPAPRUEBA from '../../assets/mapaprueba.JPG';
import TicketCardCompra from '../Detailspage/TicketCardCompra';
import Asientoscard from '../Asientoscard';

export default function EventDetailsPage({...props}) {

    

    return (
        <Box mb={20}>
            <Box mt={{base:10,md:10}}  >
                <Portada image={props.image}/>
            </Box>
                
                {props.tituloevento == null ? <Skeleton height='40px' width={'300px'}  borderRadius={"5px"} mt={2} mr={'auto'} ml={{base:'auto' , sm:'auto',md:'0'}} /> : <Heading fontFamily={'Montserrat'}>{props.tituloevento}</Heading>}
                
            <Flex  direction={{base:"column",md:"row"}} mt={5} >
            
                <Flex w={"100%"} mb={{base:5,md:0}} direction={"column"}   >
                    <Text fontSize={"3xl"} as='u'>Información</Text>
                    {props.description == null ?
                        <Flex direction={'column'}>
                            <Skeleton height='20px' width={'100%'}  borderRadius={"5px"} mt={3} />
                            <Skeleton height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                            <Skeleton height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                            <Skeleton height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                            <Skeleton height='20px' width={'100%'}   borderRadius={"5px"} mt={3} />
                        </Flex> :
                        <Text fontSize={"xl"} mt={2} textAlign={"justify"}>{props.description}</Text>
                         }
                   
                 </Flex> 

                <Flex w={"100%"} direction={"column"} ml={{base:0,md:'20%'}}  mt={2} >
                    <Flex >
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <BiUser  strokeWidth="0.2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Artista/s: &nbsp;</Text>
                        {props.artista == null ? <Skeleton height='20px' width={'40%'}  borderRadius={"5px"} ml={2}  marginTop={'auto'} marginBottom={'auto'} /> : <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.artista}</Text>}
                        
                    </Flex>
                    <Flex mt={5}>
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12} >
                            <IoCalendarOutline size={30}/>
                        </Center>
                        <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Fecha: &nbsp;</Text>
                            {props.artista == null ? <Skeleton height='20px' width={'40%'}  borderRadius={"5px"} ml={2}  marginTop={'auto'} marginBottom={'auto'} /> : <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.fecha}</Text>}
                        
                    </Flex>
                    <Flex mt={5} textAlign={'center'}>
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}  >
                            <BiCategoryAlt  strokeWidth=".2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5} fontWeight={"bold"}>Categoria: &nbsp;</Text>
                        {props.artista == null ? <Skeleton height='20px' width={'40%'}  borderRadius={"5px"} ml={2}  marginTop={'auto'} marginBottom={'auto'} /> : <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.categoria}</Text>}
                        
                    </Flex>
                </Flex>
            </Flex>
            <Asientoscard recinto={props.recinto} precio={props.precio} fecha2={props.fecha2} onNext={() => {props.onNext()}} onChangeNumTickets={(num) => props.onChangeNumTickets(num)} numTickets={props.numTickets}/>
     
                
        </Box>
        );
    };
    