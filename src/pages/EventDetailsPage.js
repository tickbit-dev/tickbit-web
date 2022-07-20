import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Spacer } from '@chakra-ui/react';
import moment from 'moment';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Portada from '../components/Portada';
import Colors from '../constants/Colors';
import { Step, Steps, useSteps } from "chakra-ui-steps"
import Pasos from '../components/Detailspage/Pasos';
import Step0 from '../components/Detailspage/Step0';
import Footer from '../components/Footer';

import Step1 from'../components/Detailspage/Step1';
import Step2 from '../components/Detailspage/Step2';
import { useParams } from 'react-router-dom';

//Solidity
import { ethers, BigNumber } from 'ethers'
import { buyTicket, changeNumberforNameMonth, cutIntervalDate, getCategoryById, getVenueById, momentDaytoSpanishDay, readEventbyId, timestampToDate } from '../utils/funcionesComunes';
//import { contractAddress } from '../solidity/config';
//import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';

export default function EventDetailsPage({...props}) {
    const [event, setEvent] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [usdConversion, setUsdConversion] = useState();
    const [day, setDay] = useState();
    const [numTickets, setNumTickets] = useState(1);

    var fecha = new Date();
    let params = useParams();

    async function getData(){
        const item = await readEventbyId(params.eventId, true);

        setEvent(item)
        fecha = moment(item.initialDate * 1000);
        setDay((fecha._d).toString().slice(0,3));
        setIsLoaded(true)
    }

    function getEurToMaticConversion() {
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT')
            .then(response => response.text())
            .then(data => {
                setUsdConversion(JSON.parse(data).price.slice(0,6))
                //setIsPriceLoaded(true)
            })
            .catch(error => {
                // handle the error
                console.log(error)
            });
    }

    useEffect(() => {
        getData();
        getEurToMaticConversion();
    }, []);

    return (
        <Box maxW={"100%"} overflow={"hidden"} minH={'100vh'}>
            <NavigationBar/>
            <ContentBox>
            <Box mt={10}>
                <Pasos 
                    image={event.coverImageUrl}
                    idEvento={params.eventId}
                    tituloevento={event.title}
                    artista={event.artist}
                    fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                    categoria={getCategoryById(event.idCategory).name}
                    description={event.description}
                    precio={event.price +'$'+' ' + '≈' +' '+(usdConversion * event.price).toString().slice(0,6)+ ' ' + 'MATIC' + '/entrada'}
                    recinto={getVenueById(event.idVenue).name}
                    fecha2={momentDaytoSpanishDay(day) + ',' + ' ' + cutIntervalDate(event.initialDate)}
                    onChangeNumTickets={(num) => setNumTickets(num)}
                    numTickets={numTickets}
                    precio2={(event.price * numTickets) +'$'+' ' + '≈' +' '+(usdConversion * event.price * numTickets)+ ' ' + 'MATIC' + '/entrada'} 
                    precioMatic={(usdConversion * event.price * numTickets)}     
                />
            </Box>
               

            </ContentBox>
            <Spacer/>
            <Footer/>
            

            
            {/*
             <Portada image={"https://www.baccredomatic.com/sites/default/files/2022-02/GT-MOMENTOS-BANNER-BAD-BUNNY-CONCIERTO-070222_0.jpg"}/>
                PARA EL FOOTER
            
            ContentBox bg={Colors.secondary.gray}>

                <Flex w={"100%"} h={"300px"} bg={Colors.secondary.gray}>
                    <Text color={"white"}>Josepe fotter</Text>
                </Flex>

            </ContentBox>*/}
        </Box>
    );
};
