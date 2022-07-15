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
import { contractAddressTickets } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';

export default function AboutUsPage({...props}) {

    const [price, setPrice] = useState(0);

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
            </ContentBox>
            <Footer/>
        </Box>
    );
};