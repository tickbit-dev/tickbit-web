import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading } from '@chakra-ui/react';
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
//import { contractAddress } from '../solidity/config';
//import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';

export default function EventDetailsPage({...props}) {
    const [event, setEvent] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    let params = useParams();

    useEffect(() => {
        //loadEvent(params.eventId);
    }, []);

    /*async function loadEvent(eventId) {
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
        const data = await contract.readEvent(BigNumber.from(String(eventId)));

        const item_data = await Promise.all(data);

        let item = {
            _owner: item_data[0],
            _id: item_data[1].toNumber(),
            title: item_data[2],
            city: item_data[3].toNumber(),
            description: item_data[4],
            artist: item_data[5],
            coverImageUrl: item_data[6],
            category: item_data[7].toNumber()
        }

        console.log(data)
        setEvent(item)
        setLoadingState('loaded') 
    }*/

    return (
        <Box maxW={"100%"} overflow={"hidden"}>
            <NavigationBar/>
            <ContentBox>
            <Box mt={10}>
            <Pasos 
                step0={
                    <Step0
                        image={loadingState != 'not-loaded' ? event.coverImageUrl : ''}
                        tituloevento={loadingState != 'not-loaded' ? event.title : ''}
                        artista={loadingState != 'not-loaded' ? event.artist : ''}
                        fecha={'25 - 28 junio 2022 '}
                        categoria={'Concierto'}
                        description={event.description}
                    />
                }
                step1={
                    <Step1
                        image={"https://www.diariodecadiz.es/2021/05/21/vivir_en_cadiz/Cartel-anunciador-Melendi-Sancti-Petri_1576053138_138871992_667x375.jpg"}
                        tituloevento={'Melendi el nano tour 2022'}
                    />
                }

                step2={
                  <Step2/>
                }
            />
            </Box>
               

            </ContentBox>

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
