import { useState, useEffect } from 'react';
import { Box, Flex, Text, Select, Skeleton } from '@chakra-ui/react';
import Colors from '../constants/Colors';
import { cutIntervalDate, getSpanishWeekDayString, getVenueById, momentDaytoSpanishDay } from '../utils/funcionesComunes';

const MAX_TICKETS = 5;
  
export default function Asientoscard({...props}) {
    return (
        <Flex h={{base:220,md:220, lg:150}} backgroundColor={Colors.secondary.gray} rounded={20} _hover={{ backgroundColor: "#e1e3ed"}}direction={{base:"column", md:"row"}} >
            <Flex  margin={"auto"}  flex={{base:0.4,md:0.4}}>
                <Flex  display={"column"}  ml={5} mt={{base:5,md:0}} >
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'} fontSize={"xl"} textAlign={"left"}>{getVenueById(props.event.idVenue).name}</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>{getSpanishWeekDayString(new Date(props.event.initialDate * 1000)) + ',' + ' ' + cutIntervalDate(props.event.initialDate)}</Text>
                </Flex>
            </Flex>
            <Flex flex={{base:0.3,md:0.2}}>
                {props.availability == 0 ? 
                    null
                : props.availability < MAX_TICKETS ? 
                    <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} variant='outline'  w={20} margin={"auto"} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                        {new Array(props.availability).fill().map((item, index) => (
                            <option value={index + 1}>{index + 1}</option>
                        ))}
                    </Select>
                : 
                    <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} variant='outline'  w={20} margin={"auto"} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                        {new Array(MAX_TICKETS).fill().map((item, index) => (
                            <option value={index + 1}>{index + 1}</option>
                        ))}
                    </Select>
                }
            </Flex>
            <Flex paddingTop={{base:0,md:7}}  flex={{base:0.3,md:0.3}} marginTop={"auto"} marginBottom={{base:2,md:"auto"}} direction={"column"} >
                {props.availability == 0 ?
                    <Flex disabled={true} margin={"auto"}  height='50px' width='100px' borderRadius={20}  backgroundColor='gray.300' color='white' onClick={()=> props.onNext()}>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Agotado</Text>
                    </Flex>     
                :
                    <Flex as={"button"}  margin={"auto"}  height='50px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _hover={{backgroundColor: "#333333"}} onClick={()=> props.onNext()}>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar</Text>
                    </Flex>     
                }
                <Text margin={"auto"}  color={"black"} fontWeight={"bold"} fontFamily={"Montserrat"} mt={2} fontSize={14}>{props.usdPricePerTicket +'$'+' ' + '≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC' + '/entrada'}</Text>
            </Flex>
        </Flex>
    );
};