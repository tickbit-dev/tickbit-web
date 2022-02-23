import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid } from '@chakra-ui/react';
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
            <Box mt={{base:0,md:10}}  >
                <Portada image={props.image}/>
            </Box>
            <Flex  direction={{base:"column",md:"row"}} mt={10} >
                <Flex w={"100%"} direction={"column"} >
                    <Flex>
                        <Center w={50} h={50} backgroundColor={Colors.secondary.gray} borderRadius={12}>
                            <BiUser  strokeWidth="0.2" size={30}/>
                        </Center>
                        <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Artista: &nbsp;</Text>
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
                <Flex w={"100%"} mt={{base:5,md:0}} direction={"column"} backgroundColor={Colors.secondary.gray} overflow={"hidden"} borderRadius={20} >
                    <Image  borderRadius={20} w={"full"} h={"full"} fit={'cover'} src={MAPAPRUEBA}/>
                </Flex>
            </Flex>
            <SimpleGrid minChildWidth='120px' spacing='40px' mt={16} mb={20}>
                <Box  height='80px'>
                    <TicketCardCompra/>
                </Box>
                <Box bg='tomato' height='80px'></Box>
                
                
            </SimpleGrid>

            
        </Box>
        );
    };
    