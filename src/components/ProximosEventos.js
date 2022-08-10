//Libraries
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import TicketCard from '../components/TicketCard';
import { cutIntervalDate, getEventsListFromBlockchain, getVenueById } from '../utils/funcionesComunes';
import Flickity from 'react-flickity-component';
import "../flickity.css";


//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import Web3Modal from 'web3modal';
import TicketCardLoading from './TicketCardLoading';

const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true
}

export default function ProximosEventos() {

    const [events, setEvents] = useState([]);
    var number = [1,2,3,4,5,6,7,8];

    async function getData(){
        var item_list = [];
        item_list = await getEventsListFromBlockchain(true);
        console.log(item_list);
        item_list.sort((a, b) => {
                return a.initialDate - b.initialDate;
        });

        setEvents(item_list);
       

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Flex maxW={"100%"} direction={'column'}>
            {events.length == 0 ? 
               

               <Flickity
                className={'carousel'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                static // default false 
                >
                    {number.map((event) => (
                        <TicketCardLoading /> 
                    )) }
                </Flickity>
            :
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false 
                >
                    {events.map((event) => (
                        <TicketCard 
                            mr={"20px"}
                            titulo={event.title}
                            imagen={event.coverImageUrl}
                            fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                            sitio={getVenueById(event.idVenue).name}
                            url={"/eventos/aitana"}
                        />
                    ))}
                </Flickity>
            }
                
        </Flex>
    )
}