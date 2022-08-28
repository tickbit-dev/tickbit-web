//Libraries
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react';
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
import { FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const flickityLoadingOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true,
    cellAlign: 'left',
    prevNextButtons: false,
    freeScroll: true
}

const flickityLessThan5Options = {
    initialIndex: 0,
    pageDots: false,
    contain: true,
    cellAlign: 'left',
    prevNextButtons: false,
    freeScroll: true
}

const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true,
    cellAlign: 'left',
    prevNextButtons: false,
    freeScroll: true
}

export default function HomeListSlider({...props}) {
    const navigate = useNavigate();

    const [eventsList, setEventsList] = useState([]);
    const isFullScreen = window.innerWidth >= 1280;

    var number = [1,2,3,4,5];
  
    useEffect(() => {
        setEventsList(props.data)
    }, [props.data]);

    return (
        props.data != null || props.isLoaded == false ?
            <Flex direction={'column'} {...props}>
                <Flex direction={'row'} px={{base: "10px", md: "16px"}} mb={'6px'} justifyContent={'space-between'} alignItems={'center'}> 
                    <Heading as='h2' color={'black'} size='lg' fontFamily={"Montserrat"} fontWeight={800}>{props.title}</Heading>
                    {props.link ? 
                        <Flex as={'button'} role={'group'} justifyContent={'center'} alignItems={'center'} mt={{base: '3px', md: '6px'}}>
                            <Text fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'} _groupHover={{color: 'black'}} cursor={'pointer'} fontWeight={500} onClick={() => navigate(props.link)}>Ver más</Text>
                            <Icon
                                fontSize={"17px"}
                                mt={"2px"}
                                transition={'all .6s ease'}
                                color={'gray.400'}
                                _groupHover={{color: 'black'}}
                                as={FiChevronRight}
                            />
                        </Flex> 
                    : null}
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
                            <Flex w={"0px"}/>
                            {number.map((event, index) => (
                                <Flex>
                                    <TicketCard 
                                        key={"ticketcardloading" + index}
                                        isLoaded={props.isLoaded}
                                        mr={"12px"}
                                        ml={index == 0 ? {base: "10px", md: "16px"} : null}
                                    />
                                    {index == (number.length - 1) ?
                                        <Flex w={"0px"}/>
                                    : null}
                                </Flex>
                            ))}
                        </Flickity>
                    : 
                        <Flickity
                            key={"Flickity"}
                            className={'carousel'} //default ''
                            elementType={'div'} //default 'div'
                            options={isFullScreen == true ? props.data.length <= 5 ? flickityLessThan5Options : flickityOptions : flickityOptions} //takes flickity options {}
                            disableImagesLoaded={false} //default false
                            reloadOnUpdate //default false
                            static //default false
                        >
                            <Flex w={"0px"}/>
                            {eventsList?.map((event, index) => (
                                <Flex>
                                    <TicketCard 
                                        key={"ticketcard" + index}
                                        index={index}
                                        mr={"12px"}
                                        ml={index == 0 ? {base: "10px", md: "16px"} : null}
                                        isLoaded={props.isLoaded}
                                        titulo={event.title}
                                        imagen={event.coverImageUrl}
                                        fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                                        sitio={getVenueById(event.idVenue).name}
                                        url={"/event/" + event._id}
                                    />
                                    {index == (eventsList?.length - 1) ?
                                        <Flex w={"0px"}/>
                                    : null}
                                </Flex>
                            ))}
                        </Flickity>
                    }
                </Flex>
            </Flex>
        : null
    )
}