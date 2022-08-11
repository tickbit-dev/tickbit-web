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

    /*async function readCurrentCampaigns() {
        const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
        const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');

        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    
        const data = await contract.getCurrentCampaigns(moment(NOW_DATE).unix());
        const item_data = await Promise.all(data);

        let itemsArray = [];

        for (let item of item_data) {
            itemsArray.push(
                newCampaign(
                    item[0], item[1].toNumber(), item[2].toNumber(), item[3].toNumber(), item[4], item[5], item[6], item[7]
                )
            );
        }

        return itemsArray;
    }

    async function getData(){
        var event = null;

        const items_list = await readCurrentCampaigns();

        for (let item of items_list) {
            if(item.idType == 1){
                event = await readEventbyId(item.eventId, false);
            }
        }

        setCampaigns(items_list);
        setFrontPageEvent(event)
        setIsLoaded(true)
    }

    useEffect(() => {
        getData();
        //readCurrentCampaigns()
    }, []);*/

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
        setIsLoaded(true)
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
                    <Heading>Eventos destacados</Heading>
                    <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events/featured')}>Ver más</Text>
                </Flex> 

                <DestacadosEventos
                    isLoaded={isLoaded}
                    data={outstandingEvents}
                />

                 <Flex direction={'row'} mb={'20px'} mt={"20px"} justifyContent={'space-between'} > 
                    {/*text={"Próximos eventos"}*/}
                    <Heading>Próximos eventos</Heading>
                    <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events')}>Ver más</Text>
                </Flex> 

                <ProximosEventos
                    isLoaded={isLoaded}
                    data={events.sort((a, b) => {return a.initialDate - b.initialDate;}).slice(0,5)}
                />

            </ContentBox>

            <Footer/>
        </Box>
    )
}