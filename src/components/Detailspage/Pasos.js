import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading } from '@chakra-ui/react';

import Colors from '../../constants/Colors';
import { Step, Steps, useSteps } from "chakra-ui-steps"

import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';


export default function Pasos({...props}) {
    
    const steps = [{ label: "Evento" }, { label: "Detalles" }, { label: "Pago" }]
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
      })
      

    return (
    <Flex flexDir="column" width="100%" >
                <Steps size={"lg"} colorScheme="green"   activeStep={activeStep}>
                    {steps.map(({ label }, index) => (
                    <Step label={label} key={label}>
                        {/*<Contents index={index} />*/}
                        {index==0 ? 
                            <Step0
                                image={props.image}
                                tituloevento={props.tituloevento}
                                artista={props.artista}
                                fecha={props.fecha}
                                categoria={props.categoria}
                                description={props.description}
                                precio={props.precio}
                                recinto={props.recinto}
                                fecha2={props.fecha2}
                                onNext={() => {nextStep()}}
                                onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
                                numTickets={props.numTickets}
                                /> 
                       
                        : index==1 ?
                        <Step1
                            image={props.image}
                            tituloevento={props.tituloevento}
                            numTickets={props.numTickets}
                            artista={props.artista}
                            fecha={props.fecha}
                            categoria={props.categoria}
                            description={props.description}
                            precio={props.precio2}
                            recinto={props.recinto}
                            fecha2={props.fecha2}
                            precioMatic={props.precioMatic}
                            onNext={() => {nextStep()}}
                            onPrev={() => {prevStep()}}
                            idEvento={props.idEvento}
                        /> 
                         
                         : 
                         <Step2
                            image={props.image}
                            tituloevento={props.tituloevento}
                            numTickets={props.numTickets}
                            artista={props.artista}
                            fecha={props.fecha}
                            categoria={props.categoria}
                            description={props.description}
                            precio={props.precio2}
                            recinto={props.recinto}
                            fecha2={props.fecha2}
                            precioMatic={props.precioMatic}
                            onNext={() => {nextStep()}}
                           
                     /> 
                       
                }
                    </Step>
                    ))}
                </Steps>
                {activeStep === steps.length ? (
                     <Step3
                     image={props.image}
                     tituloevento={props.tituloevento}
                     numTickets={props.numTickets}
                     artista={props.artista}
                     fecha={props.fecha}
                     categoria={props.categoria}
                     description={props.description}
                     precio={props.precio2}
                     recinto={props.recinto}
                     fecha2={props.fecha2}
                     precioMatic={props.precioMatic}
                     /> 
                ) : (
                    <Flex width="100%" justify="flex-end">
   
                    </Flex>
                )}
            </Flex>

);
};
