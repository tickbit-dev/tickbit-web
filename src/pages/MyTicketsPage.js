//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input, Heading, Image } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import { ImQrcode } from "react-icons/im";

//Constants
//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAddressTickets, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';
import Portada from '../components/Portada';
import { cutIntervalDate, getEventById, getEventsListFromBlockchain, getMyTicketsList, getSpanishWeekDayString, getVenueById, newEvent, readEventbyId } from '../utils/funcionesComunes';
import Asientoscard from '../components/Asientoscard';
import Colors from '../constants/Colors';

export default function MyTicketsPage({...props}) {
    const [itemsList, setItemsList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function newTicket(_owner, _id, _purchaseDate, idVenue, idEvent, idZona, price) {
        return { _owner, _id, _purchaseDate, idVenue, idEvent, idZona, price };
    }

   

    async function getData(){
        var items_list = [];
        var events_list = [];

        items_list = await getMyTicketsList();
        events_list = await getEventsListFromBlockchain();

        setItemsList(items_list);
        setEventsList(events_list);
        setIsLoaded(true) 
        console.log(items_list);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox py={"30px"}>
                <Heading mb={"30px"}>Mis tickets</Heading>
                {itemsList.map((item) => (
                    <TicketCard ticket={item} events={eventsList}/>
                ))}
            </ContentBox>
            <Footer/>
        </Box>
    );
};


function TicketCard({...props}) {
    return (
        <Flex h={{base: undefined, md: 200}} backgroundColor={'#FDFDFD'} rounded={20} direction={{base:"column", md:"row"}} p={4} mb={'16px'}  boxShadow='lg'>
            <Flex flex={1} h={'full'} direction={{base: "column", md: "row"}}>
                <Image w={{base: "full", md: "300px"}} h={"full"} fit={'cover'} src={getEventById(props.ticket._id, props.eventsList).coverImageUrl} borderRadius={"10px"}/>
                <Flex  direction={"column"} justifyContent={"center"} p={{base: 0, md: 12}} py={{base: 6, md: 12}} >
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'} fontSize={"2xl"}>{getEventById(props.ticket._id, props.eventsList).title}</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} pt={5} >Fecha y lugar:</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"}  >{getSpanishWeekDayString(new Date(getEventById(props.ticket._id, props.eventsList).initialDate * 1000)) + ',' + ' ' + cutIntervalDate(getEventById(props.ticket._id, props.eventsList).initialDate)}</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>{getVenueById(getEventById(props.ticket._id, props.eventsList).idVenue).name}</Text>
                </Flex>
                <Flex direction={"column"} justifyContent={"center"} p={{base: 0, md: 12}} py={{base: 2, md: 12}}>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} pt={{base:0,md:5}} >N.º ticket:</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>{props.ticket._id}</Text>
                </Flex>
                <Flex  ml={'auto'}  p={{base: 0, md: 10}} py={{base:2, md: 12}}>
                    <ImQrcode cursor={'pointer'} size={70}/>
                </Flex>
                
            </Flex>
        </Flex>
    );
};