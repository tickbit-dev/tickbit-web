import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid } from '@chakra-ui/react';


export default function TicketCardCompra({...props}) {
    return (
        <Flex background={"red"} direction={"row"} h={200}  >
            <Flex h={'full'} flex={0.25}background={"blue"}>
                <Text></Text>
            </Flex>
            
        </Flex>

        );
    };