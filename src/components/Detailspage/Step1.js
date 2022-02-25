import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, useBreakpointValue, } from '@chakra-ui/react';
import Portada from '../Portada';
import Colors from '../../constants/Colors';
import Asientoscard from '../Asientoscard';


export default function Step1({...props}) {
    return (
        <Box>
            <Box mt={{base:0,md:10}}>
                <Portada image={props.image}/>
            </Box>
            <Heading fontFamily={'Montserrat'} textAlign={"left"}>{props.tituloevento}</Heading>
            <Text fontFamily={'Montserrat'} color={"gray"} mt={3} textAlign={"left"}>Domingo, 5 jun 2022, 18:00 a sábado, 11 jun 2022, 21:00 </Text>
            <Text fontFamily={'Montserrat'} textAlign={"left"} fontSize={'2xl'} fontWeight={"bold"} mt={10}>Entradas disponibles</Text>
            <Asientoscard/>
            <Asientoscard/>
            <Asientoscard/>
            <Asientoscard/>
            <Asientoscard/>
        </Box>
    );
};
    