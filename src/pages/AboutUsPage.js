//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input, Heading, SimpleGrid, Stack, Image } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import Colors from '../constants/Colors';
import { AiFillLinkedin } from "react-icons/ai";
import Albert from '../assets/albert.webp';
import Josep from '../assets/josep.webp';


//Constants


export default function AboutUsPage({...props}) {

   
    useEffect(() => {

    }, []);

    return (
        <Flex direction={'column'} maxW={"100%"} minH={'100vh'} overflow={"hidden"}>
            
            <ContentBox>
                <NavigationBar/>
                <Flex w={'100%'} alignItems={'center'} mt={10} direction={'column'} >
                    <Heading fontFamily={"Montserrat"} >Equipo de Tickbit</Heading>
                    <Text color={Colors.text.subtitle} fontFamily={"Montserrat"} mt={5}>Desarrollando en Web3 el futuro del ticketing</Text>
                    <Text fontFamily={"Montserrat"} mt={10} textAlign={'center'} p={4}>
                    Tickbit es un proyecto de final de carrera en el cual hemos desarrollado un prototipo de plataforma de compra y venta de entradas para eventos 
                    integrada en la tecnología blockchain. El objetivo es conseguir que las entradas para eventos como conciertos, partidos de fútbol, 
                    teatros, etc… no puedan ser falsificadas, duplicadas o revendidas por terceros a precios abusivos al estar registradas en la blockchain, 
                    evitando así el fraude que es frecuente en este tipo de servicios.
                    </Text>
                </Flex>
                
                
                <Flex p={4} w={'100%'} justifyContent={'center'}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
                        <Feature
                            icon={Albert}
                            title={'Albert Granados'}
                            text={
                                'Estudiante de Ingenieria Informática en la EPSEVG.'
                            }
                            linkedin={'https://www.linkedin.com/in/albertgranados/'}
                            />
                        <Feature
                            icon={Josep}
                            title={'Josep Marches'}
                            text={
                                'Estudiante de Ingenieria Informática en la EPSEVG.'
                            }
                            
                            linkedin={'https://www.linkedin.com/in/josep-marches-parra-aa6a8522a/'}
                        />
                    </SimpleGrid>
                </Flex>
`
            </ContentBox>
            <Footer/>
        </Flex>
    );
};


const Feature = ({...props}) => {
    return (
      <Stack alignItems={'center'}>

        <Image w={'125px'} h={'125px'} src={props.icon} align={'center'}  justify={'center'}  rounded={'full'} mb={1}  objectFit={'fit'}/>
          
       
        <Text fontFamily={"Montserrat"}  fontWeight={600} fontSize={'lg'}>{props.title}</Text>
        <Text  fontFamily={"Montserrat"} color={'gray.600'}>{props.text}</Text>`
        <Box _hover={{cursor:'pointer'}} onClick={() => window.open(props.linkedin)}>
            <AiFillLinkedin size={45} />
        </Box>

      </Stack>
    );
  };