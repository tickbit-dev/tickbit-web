import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading } from '@chakra-ui/react';

import Colors from '../../constants/Colors';
import { Step, Steps, useSteps } from "chakra-ui-steps"


export default function Pasos({...props}) {
    
    const steps = [{ label: "Fecha" }, { label: "Asiento" }, { label: "Pago" }, { label: "Confirmación" }]
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
      })
      

    return (
    <Flex flexDir="column" width="100%">
                <Steps size={"lg"} colorScheme="gray" activeStep={activeStep}>
                    {steps.map(({ label }, index) => (
                    <Step label={label} key={label}>
                        {/*<Contents index={index} />*/}
                        {index==0 ? props.step0 : index==1 ? props.step1 : props.step2  }
                    </Step>
                    ))}
                </Steps>
                {activeStep === steps.length ? (
                    <Flex px={4} py={4} width="100%" flexDirection="column">
                    <Heading fontSize="xl" textAlign="center">
                        Woohoo! All steps completed!
                    </Heading>
                    <Button mx="auto" mt={6} size="sm" onClick={reset}>
                        Reset
                    </Button>
                    </Flex>
                ) : (
                    <Flex width="100%" justify="flex-end">
                    <Button
                        isDisabled={activeStep === 0}
                        mr={4}
                        onClick={prevStep}
                        size="sm"
                        variant="ghost"
                    >
                        Prev
                    </Button>
                    <Button size="sm" onClick={nextStep}>
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                    </Flex>
                )}
            </Flex>

);
};
