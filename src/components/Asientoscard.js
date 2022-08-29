import { useState, useEffect } from 'react';
import { Box, Flex, Text, Select, Skeleton, Icon, Center, Badge, Spacer } from '@chakra-ui/react';
import Colors from '../constants/Colors';
import { cutIntervalDate, getCityById, getSpanishWeekDayString, getVenueById, momentDaytoSpanishDay } from '../utils/funcionesComunes';
import { BsCalendarFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { FaLocationArrow } from 'react-icons/fa';

const MAX_TICKETS = 5;
  
export default function Asientoscard({...props}) {
    return (
        <Flex bg={'gray.100'} rounded={20} direction={{base:"column", md:"row"}} padding={"32px"} alignItems={{base: 'left', md: 'center'}}>
            <Flex direction={"column"}>
                <Flex alignItems={'center'} direction={{base: 'column', md: 'row'}}>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} fontWeight={800} textAlign={"left"} textOverflow={"elipsis"}>Entrada general </Text>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} fontWeight={500} textAlign={"left"} textOverflow={"elipsis"} color={'gray.500'} ml={{base: '0px', md: '6px'}}>(No numerada)</Text>
                </Flex>
                <Flex alignItems={{base: 'center', md: 'flex-start'}} justifyContent={{base: 'center', md: 'flex-start'}} mt={"6px"}>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} fontWeight={500} textAlign={"left"} textOverflow={"elipsis"}>{getSpanishWeekDayString(new Date(props.event.initialDate * 1000)) + ',' + ' ' + cutIntervalDate(props.event.initialDate)}</Text>
                </Flex>
                <Flex alignItems={'center'} justifyContent={{base: 'center', md: 'flex-start'}}>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} fontWeight={500} textAlign={"left"} textOverflow={"elipsis"}>{getVenueById(props.event.idVenue).name}</Text>
                </Flex>
                <Flex alignItems={'center'} justifyContent={{base: 'center', md: 'flex-start'}}>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} fontWeight={500} textAlign={"left"} textOverflow={"elipsis"}>{getCityById(props.event.idCity).name}</Text>
                </Flex>
            </Flex>
            <Spacer/>
            <Flex direction={"column"} alignItems={{base: 'center', md: 'flex-end'}} mt={{base: "30px", md: "0px"}}>
                <Flex alignItems={'flex-end'}>
                    <Spacer/>
                    <Text fontFamily={'Montserrat'} fontSize={"3xl"} fontWeight={800}>{props.event.price + "$"}</Text>
                    <Text color={"gray.400"} fontWeight={500} fontFamily={"Montserrat"} fontSize={14} mb={"4px"} ml={"6px"}> / ticket</Text>
                </Flex>
                <Text color={"gray.500"} fontWeight={500} fontFamily={"Montserrat"} fontSize={16} textAlign={'right'} mb={'16px'}>{'≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC'}</Text>
                {props.availability == 0 ?
                    <Flex disabled={true} borderRadius={"10px"} backgroundColor='gray.300' color='white'>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Agotado</Text>
                    </Flex>     
                :   
                    <Flex direction={{base: 'column', md: 'row'}} w={{base: '100%', md: 'undefined'}}>
                        {props.availability < MAX_TICKETS ? 
                            <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} variant='outline'  w={{base: '100%', md: "120px"}} margin={"auto"} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                                {new Array(props.availability).fill().map((item, index) => (
                                    <option value={index + 1}>{index + 1}</option>
                                ))}
                            </Select>
                        : 
                            <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} variant='outline'  w={{base: '100%', md: "120px"}} margin={"auto"} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                                {new Array(MAX_TICKETS).fill().map((item, index) => (
                                    <option value={index + 1}>{index + 1}</option>
                                ))}
                            </Select>
                        }
                        <Flex as={"button"} mt={{base: "10px", md: '0px'}} w={{base: '100%', md: undefined}} borderRadius={"6px"} bg='black' ml={{base: "0px", md: "16px"}} color='white' _hover={{backgroundColor: "#333333"}} onClick={()=> props.onNext()} px={"32px"} py={"12px"}>
                            <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar tickets</Text>
                        </Flex>   
                    </Flex>  
                }
            </Flex>
            {/*<Flex  margin={"auto"}  flex={{base:0.4,md:0.4}}>
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
            </Flex>*/}
        </Flex>
    );
};