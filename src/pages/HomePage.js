//Libraries
import { Box, Flex, Heading, Spacer, Text, Wrap, WrapItem } from '@chakra-ui/react';
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
import { useEffect, useState } from 'react';
import { cutIntervalDate, getCampaignById, getCampaignListFromBlockchain, getCityById, getEventsListFromBlockchain, getStringFromTimestamp, getVenueById, readCurrentCampaigns, readEventbyId } from '../utils/funcionesComunes';
import moment from 'moment';
import { FiSearch } from 'react-icons/fi';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import HomeListSlider from '../components/HomeListSlider';

export default function HomePage() {
    const navigate = useNavigate();

    const [events, setEvents] = useState(null);
    const [initialEvents, setInitialEvents] = useState([]);

    const [frontPageEvent, setFrontPageEvent] = useState(null);
    const [outstandingEvents, setOutstandingEvents] = useState(null);

    const [isLoaded, setIsLoaded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [onUpdateColor, setOnUpdateColor] = useState(null);

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
        if(outstanding.length != 0) setOutstandingEvents(outstanding);

        setIsLoaded(true);
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
        <Flex direction={'column'} maxW={"100%"} minH={'100vh'} overflow={"hidden"}>
            
            <ContentBox mb={{base: '20px', md: '40px'}}>
                <NavigationBar/>

                <Buscador
                    onChange={(event, type) => {setOnUpdateColor(Math.floor(Math.random() * 999999999999999999999999999)) /*!important*/; applySearchFilter(event, events, type); }}
                />

                {searchValue == '' ?
                    <Flex direction={'column'}>
                        <Portada
                            isLoaded={isLoaded}
                            image={frontPageEvent?.coverImageUrl}
                            eventid={frontPageEvent?._id}
                        />

                        {/*<Categorias/>
                        <Categorias/>*/}

                        <HomeListSlider
                            title={"Eventos destacados"}
                            isLoaded={isLoaded}
                            data={outstandingEvents}
                        />

                        <HomeListSlider
                            mt={{base: '0px', md: '10px'}}
                            title={"Próximos eventos"}
                            isLoaded={isLoaded}
                            link={"/events"}
                            data={events?.sort((a, b) => {return a.initialDate - b.initialDate;})}
                        />
                    </Flex>
                :
                    <Flex direction={'column'}>
                        {events?.length == 0 ?
                            <Flex p={4} justifyContent={"center"} w={'100%'} mt={10} >
                                <FiSearch />
                                <Text ml={'10px'} >No se han encontrado resultados para "{searchValue}".</Text>
                            </Flex>
                        :
                            <Wrap justify={{base: 'center', 'full': 'left'}}>
                                {events?.map((event, index) => (
                                    <WrapItem key={"ticketcard" + index}>
                                        <TicketCard 
                                            updatecolor={onUpdateColor}
                                            index={index}
                                            isLoaded={isLoaded}
                                            titulo={event.title}
                                            artist={event.artist}
                                            imagen={event.coverImageUrl}
                                            fecha={cutIntervalDate(event.initialDate) != cutIntervalDate(event.finalDate) ? (cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)) : cutIntervalDate(event.initialDate)}
                                            sitio={getVenueById(event.idVenue).name}
                                            city={getCityById(event.idCity).name}
                                            url={"/event/" + event._id}
                                        />
                                    </WrapItem>
                                ))}
                            </Wrap>
                        }
                    </Flex>
                }

            </ContentBox>

            <Spacer/>

            <Footer/>
        </Flex>
    )
}