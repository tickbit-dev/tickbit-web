//Libraries
import { Box, Flex, Heading, Icon, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
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
import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';


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
    const navigate = useNavigate();

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
        props.data != null || props.isLoaded == false ?
            <Flex direction={'column'}>
                <Flex direction={'row'} mb={'20px'} mt={"20px"} justifyContent={'space-between'} alignItems={'center'}> 
                    <Heading as='h2' color={'black'} size='lg' fontFamily={"Montserrat"} fontWeight={800}>Eventos destacados</Heading>
                    <Flex as={'button'} role={'group'} justifyContent={'center'} alignItems={'center'} mt={'6px'}>
                        <Text fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'} _groupHover={{color: 'black'}} cursor={'pointer'} fontWeight={500} onClick={() => navigate('/events/featured')}>Ver más</Text>
                        <Icon
                            fontSize={"17px"}
                            mt={"2px"}
                            transition={'all .6s ease'}
                            color={'gray.400'}
                            _groupHover={{color: 'black'}}
                            as={FiChevronRight}
                        />
                    </Flex>
                </Flex>
                <Flex maxW={"100%"} direction={'column'}>
                    {props.data == null ? 
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
                                    isLoaded={props.isLoaded}
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
                                    isLoaded={props.isLoaded}
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
            </Flex>
        : null
    )
}

  {/*<SimpleGrid columns={{base:'1', sm:'2', md:'2', lg:'4'}} spacing={'20px'} w={'100%'}>
                {number.map((event) => (
                    <TicketCardLoading /> 
                 )) }
                </SimpleGrid>*/}