import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, SimpleGrid } from '@chakra-ui/react';

import { IoPricetagOutline,IoLocationOutline,IoTimeOutline } from "react-icons/io5";
import { BiCategoryAlt, BiUser } from "react-icons/bi";
import Colors from '../../constants/Colors';


export default function TicketCardCompra({...props}) {
    return (
        <Flex direction={{base:"column", md:"row"}} height={{base:390,md:250}} borderRadius={20} borderWidth={1}>
            <Flex flex={0.2}>
                {props.disponibilidad === true ? 
                <Flex borderLeftRadius={20}  borderRightRadius={{base:20, md:0}} h={'full'} w={"full"}  background={"black"} direction={'column'} textAlign={"center"} justifyContent={"center"}>
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'} textColor={'white'} fontSize={"3xl"}>{props.mes}</Text>
                    <Text fontFamily={'Montserrat'} fontWeight={'regular'} textColor={'white'} fontSize={"2xl"}>{props.dia}</Text>
                </Flex>
                :
                <Flex borderLeftRadius={20} borderRightRadius={{base:20, md:0}} h={'full'} w={"full"}  background={"#E10B33"} direction={'column'} textAlign={"center"} justifyContent={"center"}>
                <Text fontFamily={'Montserrat'} fontWeight={'bold'} textColor={'white'} fontSize={"3xl"}> {props.mes}</Text>
                <Text fontFamily={'Montserrat'} fontWeight={'regular'} textColor={'white'}fontSize={"2xl"}>{props.dia}</Text>
            </Flex>}
            </Flex>
            
            <Flex  direction={{base:"column", md:"row"}} flex= {0.8} mt={{base:'10',md:'0'}}>
                <Flex   direction={"column"} marginTop={"auto"} marginBottom={"auto"} flex={{base:'0.5',md:'0.65'}}  flex={{base:0.4,md:0.7}}>
                        <Flex marginLeft={5}>
                            <IoLocationOutline  strokeWidth="0.2" size={30}/>
                            <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Lugar: &nbsp;</Text>
                            <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} mr={{base:5,md:0}} ml={{base:1,md:0}}  textAlign={"left"} > {props.lugar} • {props.local}</Text>
                        </Flex>
                        <Flex mt={5} marginLeft={5}>
                        <IoTimeOutline size={30}/>
                            <Text  fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5}  fontWeight={"bold"}>Hora: &nbsp;</Text>
                            <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> {props.hora}</Text>
                        </Flex>
                        <Flex mt={5} marginLeft={5} textAlign={'center'}>
                            <IoPricetagOutline  strokeWidth=".2" size={30}/>
                            <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'} ml={5} fontWeight={"bold"}>Precio: &nbsp;</Text>
                            <Text fontFamily={'Montserrat'} marginTop={'auto'} marginBottom={'auto'}> Desde de {props.precio}€</Text>
                        </Flex>

                </Flex>
                <Flex  flex={{base:0.6,md:0.3}} >
                {props.disponibilidad === true ? 
                    <Flex as={"button"} margin={"auto"}  height='60px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _hover={{backgroundColor: "#333333"}}>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar</Text>
                    </Flex> 
                :
                <Flex as={"button"} margin={"auto"}  height='60px' width='100px' borderRadius={20}  backgroundColor='#E10B33' color='white'>
                <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Agotado</Text>
                </Flex> }

                </Flex>
                </Flex>
        </Flex>

        );
    };

       {/* <Flex as={"button"} margin={"auto"}  height='60px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _groupHover={{transform: "translateY(-10px)", backgroundColor: "red"}}>
                     <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar</Text>
                     </Flex> 
                    
    */}