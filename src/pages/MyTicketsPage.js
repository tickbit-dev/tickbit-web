//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input, Heading, Image } from '@chakra-ui/react';

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
import { newEvent, readEventbyId } from '../utils/funcionesComunes';
import Asientoscard from '../components/Asientoscard';
import Colors from '../constants/Colors';

export default function MyTicketsPage({...props}) {
    const [itemsList, setItemsList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    function newTicket(_owner, _id, _purchaseDate, idVenue, idEvent, idZona, price) {
        return { _owner, _id, _purchaseDate, idVenue, idEvent, idZona, price };
    }

    async function getTicketsList() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
    
        const contract = new ethers.Contract(contractAddressTickets, TickbitTicket.abi, signer);
        const data = await contract.readTickets();
        const item_data = await Promise.all(data);
    
        let itemsArray = [];
    
        /*
        [0] address _owner;
        [1] uint _id;
        [2] uint256 _purchaseDate;
        [3] uint256 idVenue;
        [4] uint256 idEvent;
        [5] uint256 idZona;
        [6] uint256 price;
        */
    
        for (let item of item_data) {
            itemsArray.push(
                newTicket(
                    item[0], item[1].toNumber(), item[2].toNumber(), item[3].toNumber(), item[4].toNumber(), item[5].toNumber(), item[6].toNumber()
                )
            );
        }
    
        return itemsArray.reverse();
    }

    async function getData(){
        var items_list = [];

        items_list = await getTicketsList();

        setItemsList(items_list);
        setIsLoaded(true)
        console.log(items_list);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox py={"30px"}>
                <Heading mb={"30px"}>Mis tickets</Heading>
                {itemsList.map((row) => (
                    <TicketCard/>
                ))}
            </ContentBox>
            <Footer/>
        </Box>
    );
};


function TicketCard({...props}) {
    return (
        <Flex h={{base: undefined, md: 200}} backgroundColor={Colors.secondary.gray} rounded={20} direction={{base:"column", md:"row"}} p={4} mb={'16px'}>
            <Flex flex={1} h={'full'} direction={{base: "column", md: "row"}}>
                <Image w={{base: "full", md: "300px"}} h={"full"} fit={'cover'} src={"https://imagenes.elpais.com/resizer/URW_CCCx5JqK5Nex35y33AmsWX0=/414x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/DCRSO7QMAE6RCEYTGRVIPQ37ZA.jpg"} borderRadius={"10px"}/>
                <Flex direction={"column"} justifyContent={"center"} p={{base: 0, md: 12}} py={{base: 6, md: 12}}>
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'} fontSize={"2xl"}>El nano</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>Jueves, 9 jun 2022, 18:00-0:00</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};