//Libraries
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import TicketCard from '../components/TicketCard';
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



const flickityOptions = {
    initialIndex: 0,
    pageDots: false,
    contain: true
}

export default function DestacadosEventos() {

    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [featuredEventsId, setFeaturedEventsId] = useState([]);
    const [loaded, setLoaded] = useState(false);

    var number = [1,2,3,4,5,6,7,8];

    async function getData(){
   
        var event_list = await getEventsListFromBlockchain(true);
        var campaign_list = await getCampaignListFromBlockchain();
 
        var fechaactual = new Date();

        while (fechaactual.getDay() - 1 !== 0) {
            fechaactual.setDate(fechaactual.getDate() - 1);
        }
    
        //Le pasamos esto para que coja hora las 00:00
        fechaactual = moment(fechaactual).format('YYYY-MM-DD');
    
        var fechainicial = moment(fechaactual);
        var fechafinal = moment(fechainicial).add(6, 'days');
        
        for(let i = 0; i < campaign_list.length; i++){
            if(campaign_list[i].initialDate == fechainicial.unix() && campaign_list[i].finalDate == fechafinal.unix() && campaign_list[i].idType == 2){
                featuredEventsId.push(campaign_list[i].eventId)
            }
        }
       
       for(let i = 0; i < event_list.length; i++){
            for(let j = 0; j < featuredEventsId.length; j++){
                if(event_list[i]._id == featuredEventsId[j]){
                    featuredEvents.push(event_list[i]);        
                }
            }
        }
        setLoaded(true);
    }

   
    
    useEffect(() => {
        getData();
    }, [loaded]);

 

    return (
        <Flex maxW={"100%"} direction={'column'}  >
            {featuredEvents.length == 0 ? 
          

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
                {featuredEvents.map((event) => (
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

  {/*<SimpleGrid columns={{base:'1', sm:'2', md:'2', lg:'4'}} spacing={'20px'} w={'100%'}>
                {number.map((event) => (
                    <TicketCardLoading /> 
                 )) }
                </SimpleGrid>*/}