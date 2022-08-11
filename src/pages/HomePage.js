//Libraries
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import MyCalendar from '../components/MyCalendar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import TicketCard from '../components/TicketCard';
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
import { getCampaignById, getCampaignListFromBlockchain, getEventsListFromBlockchain, getStringFromTimestamp, readCurrentCampaigns, readEventbyId } from '../utils/funcionesComunes';
import moment from 'moment';


export default function HomePage() {
    const navigate = useNavigate();

    const [outstandingEvents, setOutstandingEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [frontPageEvent, setFrontPageEvent] = useState(null);

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

        //setCampaigns(items_list);
        setEvents(events_list);
        setFrontPageEvent(front_page)
        setOutstandingEvents(outstanding)
    }

    useEffect(() => {
        getData();
    }, []);
    
    return (
        <Box maxW={"100%"} overflow={"hidden"}>
           <NavigationBar/>
            
            <ContentBox>
                
                <Buscador/>

                <Portada
                    image={frontPageEvent != null ? frontPageEvent.coverImageUrl : null}
                    eventid={frontPageEvent != null ? frontPageEvent._id : 0}
                />

                {/*<TitleHighlighted
                    text={"Categorías"}
                />*/}
                {/*<Text fontWeight={"bold"} fontFamily={"Montserrat"} mb={"16px"} color={"black"}>Categorías</Text>*/}

                {/*<Categorias/>*/}
                {/*<Categorias/>*/}

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

            </ContentBox>

            <Footer/>
        </Box>
    )
}