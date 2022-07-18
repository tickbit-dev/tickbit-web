//Libraries
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import TicketCard from '../components/TicketCard';
import { cutIntervalDate, getEventsListFromBlockchain, getVenueById } from '../utils/funcionesComunes';



//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import Web3Modal from 'web3modal';
import TicketCardLoading from './TicketCardLoading';

export default function DestacadosEventos() {

    const [events, setEvents] = useState([]);
    var number = [1,2,3,4];

    async function getData(){
        var item_list = [];
        item_list = await getEventsListFromBlockchain(true);

        item_list.sort((a, b) => {
                return a.initialDate - b.initialDate;
        });

         setEvents(item_list);
       

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Flex maxW={"100%"} >
            {events.length == 0 ? 
            <SimpleGrid columns={{base:'1', sm:'2', md:'2', lg:'4'}} spacing={'20px'} w={'100%'}>
                {number.map((event) => (
                    <TicketCardLoading /> 
                 )) }
            </SimpleGrid>
            
            :
            events.map((event) => (
                <TicketCard 
                    mr={"20px"}
                    titulo={event.title}
                    imagen={event.coverImageUrl}
                    fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                    sitio={getVenueById(event.idVenue).name}
                    url={"/eventos/aitana"}
                />
                ))}
                
        </Flex>
    )
}