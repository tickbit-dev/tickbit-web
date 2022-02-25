import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, useBreakpointValue, } from '@chakra-ui/react';
import Portada from '../components/Portada';
import Colors from '../constants/Colors';


export default function Asientoscard({...props}) {
    return (
        <Flex h={100} w={600} mt={5} mb={5} backgroundColor={Colors.secondary.gray} rounded={20} _hover={{ backgroundColor: "#e1e3ed"}} >
            <Flex direction={{base:"column", md:"row"}} marginTop={"auto"} marginBottom={"auto"} flex={0.8}>
                <Flex display={"column"}  ml={5} >
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'}  fontSize={"xl"} textAlign={"left"} > Segunda graderia zona C1</Text>
                    <Text fontFamily={'Montserrat'}  fontSize={"xl"} textAlign={"left"}>Jueves, 9 jun 2022, 18:00-0:00</Text>
                </Flex>
            </Flex>
            <Flex flex={0.2} marginTop={"auto"} marginBottom={"auto"}>
                     <Flex as={"button"} margin={"auto"}  height='50px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _hover={{backgroundColor: "#333333"}}>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar</Text>
                    </Flex> 
                </Flex>
        </Flex>
        
        );
    };
        