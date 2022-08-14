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
import { buyTicket, changeNumberforNameMonth, checkAvailabilityByEventId, cutIntervalDate, getCategoryById, getVenueById, readEventbyId, timestampToDate } from '../utils/funcionesComunes';
//import { contractAddress } from '../solidity/config';
//import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';

export default function EventDetailsPage({...props}) {
    const [event, setEvent] = useState([]);
    const [availability, setAvailability] = useState(0);

    const [isEventLoaded, setIsEventLoaded] = useState(false);
    const [isPriceLoaded, setIsPriceLoaded] = useState(false);
    const [usdConversion, setUsdConversion] = useState();
    const [day, setDay] = useState();
    const [numTickets, setNumTickets] = useState(1);

    var fecha = new Date();
    let params = useParams();

    async function getData(){
        const item = await readEventbyId(params.eventId, true);
        const availabilityNumber = await checkAvailabilityByEventId(params.eventId);

        setEvent(item)
        setAvailability(availabilityNumber);
        setIsEventLoaded(true)
    }

    function getEurToMaticConversion() {
        fetch('https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT')
            .then(response => response.text())
            .then(data => {
                setUsdConversion(parseFloat(JSON.parse(data).price).toFixed(4))
                setIsPriceLoaded(true)
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
                        event={event}
                        availability={availability}
                        onChangeNumTickets={(num) => setNumTickets(num)}
                        isEventLoaded={isEventLoaded}
                        isPriceLoaded={isPriceLoaded}
                        numTickets={numTickets}
                        usdPricePerTicket={event.price}
                        maticUsdConversion={parseFloat(usdConversion)}
                    />
                </Box>
            </ContentBox>
            <Spacer/>
            <Footer/>
        </Box>
    );
};
