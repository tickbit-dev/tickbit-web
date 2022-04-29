import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid, useBreakpointValue, } from '@chakra-ui/react';
import Portada from '../Portada';
import { FiUser } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import Colors from '../../constants/Colors';

import MAPAPRUEBA from '../../assets/mapaprueba.JPG';
import TicketCardCompra from '../Detailspage/TicketCardCompra';

export default function EventDetailsPage({...props}) {
    return (
        <Box mb={20}>
            <Box mt={{base:10,md:10}}  >
                <Portada image={props.image}/>
            </Box>
            <Heading fontFamily={'Montserrat'}>{props.tituloevento}</Heading>
            <Flex  direction={{base:"column",md:"row"}} mt={5} >
            
                <Flex w={"100%"} mb={{base:5,md:0}} direction={"column"}   >
                    <Text fontSize={"3xl"} as='u'>Información</Text>
                    <Text fontSize={"xl"} mt={2} textAlign={"justify"}>{props.description}</Text>
                 </Flex> 

                <Flex w={"100%"} direction={"column"} ml={{base:0,md:'20%'}}  mt={2} >
                    <Flex >
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <BiUser  strokeWidth="0.2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Artista/s: &nbsp;</Text>
                        <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.artista}</Text>
                    </Flex>
                    <Flex mt={5}>
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12} >
                            <IoCalendarOutline size={30}/>
                        </Center>
                        <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Fecha: &nbsp;</Text>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.fecha}</Text>
                    </Flex>
                    <Flex mt={5} textAlign={'center'}>
                        <Center  w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}  >
                            <BiCategoryAlt  strokeWidth=".2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5} fontWeight={"bold"}>Categoria: &nbsp;</Text>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.categoria}</Text>
                    </Flex>
                </Flex>
            </Flex>
            <SimpleGrid columns={{base:1,md:1,lg:2}}  spacing={5} mt={16} mb={20}>
                <Box  height={{base:390,md:390, lg:200}}>
                    <TicketCardCompra 
                        lugar={'Barcelona'} 
                        mes={"JUN"} 
                        dia={"25"}  
                        hora={'2:30 h'} 
                        fecha={'25 diciembre 2022 '}
                        local={"Pl. Sant Jordi"} 
                        precio={'80'} 
                        disponibilidad={false} />
                </Box>
                <Box  height={{base:390,md:390, lg:200}}>
                    <TicketCardCompra 
                        lugar={'Barcelona'} 
                        mes={"JUN"} 
                        dia={"25"}  
                        hora={'2:30 h'} 
                        fecha={'25 diciembre 2022 '}
                        local={"Pl. Sant Jordi"} 
                        precio={'80'} 
                        disponibilidad={true} />
                </Box>
                <Box  height={{base:390,md:390, lg:200}}>
                    <TicketCardCompra 
                        lugar={'Barcelona'} 
                        mes={"JUN"} 
                        dia={"25"}  
                        hora={'2:30 h'} 
                        fecha={'25 diciembre 2022 '}
                        local={"Pl. Sant Jordi"} 
                        precio={'80'} 
                        disponibilidad={true} />
                </Box>
                
                
            </SimpleGrid>

            
        </Box>
        );
    };
    