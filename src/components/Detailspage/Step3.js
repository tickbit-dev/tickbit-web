import { useState, useEffect } from 'react';
import { Flex, Text,Heading, Image, Button, Icon, Stack, Box, Spacer} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Tickbit from '../../assets/logo.webp';
import Colors from '../../constants/Colors';
import { BsCheckLg } from 'react-icons/bs';
import { CartItem } from './Checkout/CartItem';
import { cutIntervalDate, getCityById, getSpanishWeekDayString, getVenueById } from '../../utils/funcionesComunes';

export default function Step3({...props}) {
    const navigate = useNavigate();
    return (
        <Flex  w={'100%'} alignItems={'center'} justifyContent={'center'} textAlign={'center'} direction={'column'} pt={"100px"} pb={"140px"}>
            <Flex display={{base: 'none', md: 'flex'}} alignItems={"center"}>
                <Image width={"30px"} src={Tickbit}/>
                {/*<Text fontFamily={"Montserrat"} fontWeight={900} fontSize={'xl'} ml={"10px"}>Tickbit</Text>*/}
            </Flex>
            <Stack direction={{base: 'column', md: 'row'}} alignItems={"center"} spacing={"16px"} mt={{base: '0px', md: '30px'}}>
                <Flex borderRadius={"full"} bg={Colors.primary.skyblue} w={"40px"} h={"40px"} alignItems={'center'} justifyContent={'center'}>
                    <Icon
                        fontSize="15px"
                        color={"white"}
                        as={BsCheckLg}
                    />
                </Flex>
                <Heading fontFamily={"Montserrat"}>¡Pago realizado correctamente!</Heading>
            </Stack>
            <Text fontSize="xl" fontFamily={"Montserrat"} fontWeight="medium" mt={"6px"} color={'gray.600'}>Gracias por confiar en Tickbit</Text>
            <Flex direction={{base: 'column', md: 'row'}} maxW={'600px'} borderWidth={1} borderRadius={"10px"} p={"16px"} mt={"32px"}>
                <Stack direction="row" spacing="5" width="full">
                    <Image
                        rounded="lg"
                        width="140px"
                        height="140px"
                        fit="cover"
                        src={props.event.coverImageUrl}
                        alt={props.event.title}
                        draggable="false"
                        loading="lazy"
                    />
                    <Box>
                        <Stack spacing={0}>
                            <Text fontWeight="bold" fontSize={'xl'} textAlign={'left'}>{props.event.title}</Text>
                            <Text fontWeight="medium" mt={"-10px"} textAlign={'left'}>{props.event.artist}</Text>
                        </Stack>
                        <Text mt={'10px'} textAlign={'left'}>{getSpanishWeekDayString(new Date(props.event.initialDate * 1000)) + ',' + ' ' + cutIntervalDate(props.event.initialDate)}</Text>
                        <Text textAlign={'left'}>{getVenueById(props.event.idVenue).name}</Text>
                        <Text textAlign={'left'}>{getCityById(props.event.idCity).name}</Text>
                    </Box>
                </Stack>
                <Flex direction={'column'} width={"300px"} mt={{base: "20px", md: "0px"}}>
                    <Flex direction={'column'}>
                        <Text fontSize="sm" fontWeight="medium" color={'gray.500'} fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                            Nº de tickets:
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                            {props.numTickets}
                        </Text>
                    </Flex>
                    <Spacer/>
                    <Flex direction={'column'}>
                        <Text fontSize="sm" fontWeight="medium" color={'gray.500'} fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                            Total:
                        </Text>
                        <Text fontSize="lg" fontWeight="bold" fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                            {/*props.usdPricePerTicket +'$'+' ' + '≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC' + '/entrada'*/}
                            {parseFloat((1/(props.maticUsdConversion).toFixed(4)) * props.usdPricePerTicket * props.numTickets).toFixed(4) + ' ' + 'MATIC'}
                        </Text>
                        <Text fontSize="sm" fontWeight="500" color={"gray.500"} fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                            {'≈ ' + (props.event.price * props.numTickets) + "$"}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Button w={'300px'} h={'50px'} bg={Colors.primary.skyblue} _active={{bg: Colors.primary.skyblue}} _hover={{bg: Colors.primary.skyblueHover}} color={'white'} fontFamily={'Montserrat'} mt={"32px"} onClick={() => window.open('/tickets', '_self')}>Ir a mis tickets</Button>
        </Flex> 
        
    );
};
    