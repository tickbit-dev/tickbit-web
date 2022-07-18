//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';

//Constants
//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAddressTickets, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';
import Portada from '../components/Portada';
import { readEventbyId } from '../utils/funcionesComunes';

export default function MyTicketsPage({...props}) {

    useEffect(() => {
    }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox>
                <Input
                    defaultValue={price}
                    onChange={(event) => setPrice(event.target.value)}
                ></Input>
                <Button onClick={()=> buyTicketOnBlockchain()}>Hola</Button>
                <Portada
                    //src={'https://c8.alamy.com/zoomses/9/984bb3c4eae3444e9d3433d1d59470c7/2eg06b6.jpg'}
                    image={isLoaded == true ? frontPageEvent.coverImageUrl : null/*"https://www.baccredomatic.com/sites/default/files/2022-02/GT-MOMENTOS-BANNER-BAD-BUNNY-CONCIERTO-070222_0.jpg"*/}
                    eventId={2}
                />
            </ContentBox>
            <Footer/>
        </Box>
    );
};