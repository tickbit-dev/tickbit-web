import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Portada from '../components/Portada';
import Colors from '../constants/Colors';
import { Step, Steps, useSteps } from "chakra-ui-steps"
import Pasos from '../components/Detailspage/Pasos';
import Step0 from '../components/Detailspage/Step0';


export default function EventDetailsPage({...props}) {

    useEffect(() => {
    }, []);

    return (
        <Box maxW={"100%"} overflow={"hidden"}>
            <NavigationBar/>
            <ContentBox>
            <Box mt={10}>
            <Pasos 
                step0={
                    <Step0 image={"https://www.baccredomatic.com/sites/default/files/2022-02/GT-MOMENTOS-BANNER-BAD-BUNNY-CONCIERTO-070222_0.jpg"} artista={'Alberto Bujarrón'} fecha={'25 - 28 junio 2022 '} categoria={'Concierto'} tituloevento={'Melendi el nano tour 2022'}/>}
                
            />
            </Box>
               

            </ContentBox>

            
            {/*
             <Portada image={"https://www.baccredomatic.com/sites/default/files/2022-02/GT-MOMENTOS-BANNER-BAD-BUNNY-CONCIERTO-070222_0.jpg"}/>
                PARA EL FOOTER
            
            ContentBox bg={Colors.secondary.gray}>

                <Flex w={"100%"} h={"300px"} bg={Colors.secondary.gray}>
                    <Text color={"white"}>Josepe fotter</Text>
                </Flex>

            </ContentBox>*/}
        </Box>
    );
};
