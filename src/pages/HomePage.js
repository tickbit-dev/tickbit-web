//Libraries
import { Box, Button, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import MyCalendar from '../components/MyCalendar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import TicketCard from '../components/TicketCard2';
import TitleHighlighted from '../components/TitleHighlighted';
import Colors from '../constants/Colors';

import IMAGEN_AITANA from "../assets/aitana.jpg"
import IMAGEN_DADDY_YANKEE from "../assets/dy.jpg"
import IMAGEN_ESTOPA from "../assets/estopa.jpg"
import IMAGEN_CTANGANA from "../assets/ctangana.jpg"
import ContentBox from '../components/Utils/ContentBox';
import Buscador from '../components/Buscador';
import Categorias from '../components/Categorias2';
import Portada from '../components/Portada';
import Footer from '../components/Footer';
import ProximosEventos from '../components/ProximosEventos';
import DestacadosEventos from '../components/DestacadosEventos';
import { useEffect, useState } from 'react';
import { cutIntervalDate, getCampaignById, getCampaignListFromBlockchain, getEventsListFromBlockchain, getStringFromTimestamp, getVenueById, readCurrentCampaigns, readEventbyId } from '../utils/funcionesComunes';
import moment from 'moment';
import { FiSearch } from 'react-icons/fi';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';


export default function HomePage() {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);

    const [frontPageEvent, setFrontPageEvent] = useState(null);
    const [outstandingEvents, setOutstandingEvents] = useState([]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [onUpdateColor, setOnUpdateColor] = useState(null);

    const {isOpen, onOpen, onClose } = useDisclosure(true)

    function applySearchFilter(word, list, type){
        setSearchValue(word.target.value);
        console.log(type)
        //onChangeTextSearch(word);
        
        if(word.target.value.length == 0){
            setEvents(initialEvents);
            return
        }

        setEvents(list ?? initialEvents);
        
        let newItems = [];

        for(let item of list ?? initialEvents){
            if(item._id == parseInt(word.target.value)){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item.title.toLowerCase().includes(word.target.value.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item.artist.toLowerCase().includes(word.target.value.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(type == 'CITY'){
                console.log("ENTRA")
                if(getVenueById(item.idVenue).id == word.target.value){
                    if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
                }
            } else {
                if(getVenueById(item.idVenue).name.toLowerCase().includes(word.target.value.toLowerCase())){
                    if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
                }
            }
        }

        setEvents(newItems);
        setOnUpdateColor(Math.floor(Math.random() * 999999999999999999999999999)); //!important
    }

    /*const onChangeTextSearch = (event) => {
        if(event.target.value.length == 0){
          window.history.replaceState({}, '', location.pathname)
          setSearchValue('')
        } else{
          window.history.replaceState({}, undefined, location.pathname + "?search=" + event.target.value.replace(" ", "+"))
          setSearchValue(event.target.value.replace(" ", "+"))
        }
    }*/

    async function getData(){
        const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
        const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').unix();

        const campaigns_list = await getCampaignListFromBlockchain(true);
        const events_list = await getEventsListFromBlockchain(true);

        var front_page = null;
        var outstanding = [];

        for(let item of campaigns_list) {
            if(getStringFromTimestamp(item.initialDate) == getStringFromTimestamp(NOW_DATE)){
                if(item.idType == 1){
                    for(let event of events_list){
                        if(event._id == item.eventId){
                            front_page = event;
                            break;
                        }
                    }
                } else {
                    for(let event of events_list){
                        if(event._id == item.eventId){
                            outstanding.push(event);
                            break;
                        }
                    }
                }
            }
        }

        setEvents(events_list);
        setInitialEvents(events_list);

        setFrontPageEvent(front_page);
        setOutstandingEvents(outstanding);
    }

    useEffect(() => {
        getData();
        onOpen();
    }, []);
    
    return (
        <Box maxW={"100%"} overflow={"hidden"}>
           <NavigationBar/>
            
            <ContentBox>
                
                <Buscador
                    onChange={(event, type) => {setOnUpdateColor(Math.floor(Math.random() * 999999999999999999999999999)) /*!important*/; applySearchFilter(event, events, type); }}
                />

                {searchValue == '' ?
                    <Flex direction={'column'}>
                        <Portada
                            image={frontPageEvent != null ? frontPageEvent.coverImageUrl : null}
                            eventid={frontPageEvent != null ? frontPageEvent._id : 0}
                        />

                        {/*<TitleHighlighted
                            text={"Categorías"}
                        />*/}
                        {/*<Text fontWeight={"bold"} fontFamily={"Montserrat"} mb={"16px"} color={"black"}>Categorías</Text>*/}

                        {/*<Categorias/>
                        <Categorias/>*/}

                        <Flex direction={'row'} mb={'20px'} mt={"20px"}  justifyContent={'space-between'} > 
                            {/*text={"Eventos destacados"}*/}
                            <Heading mb={"-10px"}>Eventos destacados</Heading>
                            <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events/featured')}>Ver más</Text>
                        </Flex> 


                        <DestacadosEventos
                            isLoaded={isLoaded}
                            data={outstandingEvents}
                        />

                        <Flex direction={'row'} mb={'20px'} mt={"20px"} justifyContent={'space-between'} > 
                            {/*text={"Próximos eventos"}*/}
                            <Heading mb={"-10px"}>Próximos eventos</Heading>
                            <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events')}>Ver más</Text>
                        </Flex> 

                        <ProximosEventos
                            data={events.sort((a, b) => {return a.initialDate - b.initialDate;})}
                        />
                    </Flex>
                :
                    <Flex direction={'column'}>
                        {events.length == 0 ?
                            <Flex p={4} justifyContent={"center"} w={'100%'} mt={10} >
                                <FiSearch />
                                <Text ml={'10px'} >No se han encontrado resultados para "{searchValue}".</Text>
                            </Flex>
                        :
                            <Wrap justify={{base: 'center', 'full': 'left'}}>
                                {events.map((event, index) => (
                                    <WrapItem key={"ticketcard" + index}>
                                        <TicketCard 
                                            updatecolor={onUpdateColor}
                                            index={index}
                                            titulo={event.title}
                                            imagen={event.coverImageUrl}
                                            fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                                            sitio={getVenueById(event.idVenue).name}
                                            url={"/event/" + event._id}
                                        />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        }
                    </Flex>
                }

            </ContentBox>

            <Footer/>
        </Box>
    )
}