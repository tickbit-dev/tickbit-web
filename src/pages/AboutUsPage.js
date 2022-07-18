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

export default function AboutUsPage({...props}) {

    const [price, setPrice] = useState(0);

    const [campaigns, setCampaigns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [frontPageEvent, setFrontPageEvent] = useState({});

    async function buyTicketOnBlockchain() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddressTickets, TickbitTicket.abi, signer)

        try {
            var myprice = price;
            const finalprice = ethers.utils.parseUnits(myprice.toString())
            console.log(finalprice);
            const transaction = await contract.buyTicket(1, {value: finalprice });
            await transaction.wait()

            return transaction;
        } catch (error) {
            console.log(error);
        }
    }

    async function buyTicketOnBlockchain() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddressTickets, TickbitTicket.abi, signer)

        try {
            var myprice = price;
            const finalprice = ethers.utils.parseUnits(myprice.toString())
            console.log(finalprice);
            const transaction = await contract.buyTicket(1, {value: finalprice });
            await transaction.wait()

            return transaction;
        } catch (error) {
            console.log(error);
        }
    }

    async function readCurrentCampaigns() {
        const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
        const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');

        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    
        const data = await contract.getCurrentCampaigns(moment(NOW_DATE).unix());
        const item_data = await Promise.all(data);

        console.log(item_data)
    }

    async function readCurrentCampaigns() {
        const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
        const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');

        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    
        const data = await contract.getCurrentCampaigns(moment(NOW_DATE).unix());
        const item_data = await Promise.all(data);

        let itemsArray = [];

        /*
        [0] address _owner;
        [1] uint _id;
        */

        for (let item of item_data) {
            itemsArray.push(
                newCampaign(
                    item[0], item[1].toNumber(), item[2].toNumber(), item[3].toNumber(), item[4], item[5], item[6], item[7]
                )
            );
        }

        return itemsArray;
    }

    function newCampaign(_owner, _id, idType, eventId, initialDate, finalDate, price, purchaseDate) {
        return { _owner, _id, idType, eventId, initialDate, finalDate, price, purchaseDate };
    }

    async function getData(){
        var items_list = [];
        var event = null;

        items_list = await readCurrentCampaigns();

        for (let item of items_list) {
            if(item.idType == 1){
                event = await readEventbyId(item.eventId, false);
            }
        }

        setCampaigns(items_list);
        setFrontPageEvent(event)
        setIsLoaded(true)
        console.log(items_list);
        console.log(event);
    }

    useEffect(() => {
        getData();
        //readCurrentCampaigns()
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