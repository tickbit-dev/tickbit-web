//Libraries
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import TicketCard from '../components/TicketCard2';
import { cutIntervalDate, getCampaignListFromBlockchain, getEventsListFromBlockchain, getVenueById } from '../utils/funcionesComunes';
import moment from 'moment';
import Flickity from 'react-flickity-component';
import "../flickity.css";


//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import Web3Modal from 'web3modal';
import TicketCardLoading from './TicketCardLoading';


const flickityLoadingOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true,
    cellAlign: 'left',
    prevNextButtons: false
}

const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true,
    cellAlign: 'left'
}

export default function ProximosEventos({...props}) {

    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [featuredEventsId, setFeaturedEventsId] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    var number = [1,2,3,4,5];
 
    useEffect(() => {
        //console.log(props)
    }, []);
  
    useEffect(() => {
        setFeaturedEvents(props.data)
    }, [props.data]);
  
    useEffect(() => {
        setIsLoaded(props.isLoaded)
    }, [props.isLoaded]);

    return (
        <Flex maxW={"100%"} direction={'column'}>
            {featuredEvents.length == 0 ? 
                <Flickity
                    key={"FlickityLoading"}
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityLoadingOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    {number.map((event, index) => (
                        <TicketCard 
                            key={"ticketcardloading" + index}
                            loading={1}
                            mr={"12px"}
                        />
                    ))}
                </Flickity>
            : 
                <Flickity
                    key={"Flickity"}
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    {featuredEvents.map((event, index) => (
                        <TicketCard 
                            key={"ticketcard" + index}
                            index={index}
                            mr={"12px"}
                            titulo={event.title}
                            imagen={event.coverImageUrl}
                            fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                            sitio={getVenueById(event.idVenue).name}
                            url={"/event/" + event._id}
                        />
                    ))}
                </Flickity>
            }
        </Flex>
    )
}

  {/*<SimpleGrid columns={{base:'1', sm:'2', md:'2', lg:'4'}} spacing={'20px'} w={'100%'}>
                {number.map((event) => (
                    <TicketCardLoading /> 
                 )) }
                </SimpleGrid>*/}