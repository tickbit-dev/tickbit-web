import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, useBreakpointValue } from '@chakra-ui/react';

import Colors from '../../constants/Colors';
import { Step, Steps, useSteps } from "chakra-ui-steps"

import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import "../../../src/chakra-ui-steps-mobile.css"

export default function Pasos({...props}) {
    
    const steps = [{ label: "Selección de evento" }, { label: "Detalles de la compra" }, { label: "Pago" }]
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    const [finishStatus, setfinishStatus] = useState(false);

    const onBackButtonEvent = (e) => {
        e.preventDefault();
        prevStep();
    }

    useEffect(() => {
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);  
        };
    }, []);

    return (
        <Flex flexDir="column" width="100%" >
            <Steps size={"lg"} colorScheme="green" activeStep={activeStep}>
                {steps.map(({ label }, index) => (
                <Step label={label} key={label}>
                    {index == 0 ? 
                        <Step0
                            event={props.event}
                            availability={props.availability}
                            isResale={props.isResale}
                            isEventLoaded={props.isEventLoaded}
                            isPriceLoaded={props.isPriceLoaded}
                            usdPricePerTicket={props.usdPricePerTicket}
                            maticUsdConversion={props.maticUsdConversion}
                            numTickets={props.numTickets}
                            onNext={() => {nextStep(); window.history.pushState(null, null, window.location.pathname); props.onChangeNumTickets(1)}}
                            onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
                        /> 
                    : index == 1 ?
                        <Step1
                            event={props.event}
                            availability={props.availability}
                            isResale={props.isResale}
                            isEventLoaded={props.isEventLoaded}
                            isPriceLoaded={props.isPriceLoaded}
                            usdPricePerTicket={props.usdPricePerTicket}
                            maticUsdConversion={props.maticUsdConversion}
                            numTickets={props.numTickets}
                            onNext={() => {nextStep(); window.history.pushState(null, null, window.location.pathname);}}
                            onPrev={() => {window.history.back()}}
                            onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
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
                            onNext={() => {nextStep();}}
                        /> 
                    
                    }
                </Step>
            ))}
        </Steps>
        {activeStep === steps.length ? 
            <Step3
                event={props.event}
                availability={props.availability}
                isEventLoaded={props.isEventLoaded}
                isPriceLoaded={props.isPriceLoaded}
                usdPricePerTicket={props.usdPricePerTicket}
                maticUsdConversion={props.maticUsdConversion}
                numTickets={props.numTickets}
                onNext={() => {nextStep(); window.history.pushState(null, null, window.location.pathname);}}
                onPrev={() => {window.history.back()}}
                onChangeNumTickets={(num) => props.onChangeNumTickets(num)}
            />
        : 
            <Flex width="100%" justify="flex-end">

            </Flex>
        }
        </Flex>
    );
};
