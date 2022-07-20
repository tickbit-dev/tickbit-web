import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, useBreakpointValue, Spinner, } from '@chakra-ui/react';
import Portada from '../Portada';
import Colors from '../../constants/Colors';



export default function Step2({...props}) {
    return (
        <Flex h={'50vh'} w={'100%'} alignItems={'center'} justifyContent={'center'}  direction={'column'}>
            <Heading fontSize="4xl" fontWeight="normal">
                Realizando el pago...
            </Heading>
            <Spinner  mt={15} size='xl' />
        </Flex> 
        
    );
};
    