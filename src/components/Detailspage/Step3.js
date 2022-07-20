import { useState, useEffect } from 'react';
import { Flex, Text,Heading, Image, Button} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Tickbit from '../../assets/logo.webp';

export default function Step3({...props}) {
    const navigate = useNavigate();
    return (
        <Flex  w={'100%'} alignItems={'center'} justifyContent={'center'} textAlign={'center'} direction={'column'} mt={20}>
            <Image src={Tickbit}/>
            <Heading mt={10}>  Pago realizado correctamente</Heading>
            <Text fontSize="2xl" fontWeight="normal" mt={5}>Gracias por confiar en Tickbit!</Text>
            <Button w={'200px'} h={'50px'} mt={10} onClick={() => navigate('/tickets')}>Ir a mis tickets</Button>
            
        </Flex> 
        
    );
};
    