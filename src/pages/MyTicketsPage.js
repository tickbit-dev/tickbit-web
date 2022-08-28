//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input, Heading, Image, toast, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import { ImQrcode } from "react-icons/im";
import { AiOutlineScan} from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";

//Constants
//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAddressTickets, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';
import Portada from '../components/Portada';
import { cutIntervalDate, getEventById, getEventsListFromBlockchain, getEventsListFromTest, getMyTicketsList, getSpanishWeekDayString, getTicketsListFromBlockchain, getTicketsListFromTest, getVenueById, newEvent, readEventbyId, validateTicket } from '../utils/funcionesComunes';
import Asientoscard from '../components/Asientoscard';
import Colors from '../constants/Colors';
import TipoTicketsMyTickets from '../components/TipoTicketsMyTickets';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';


export default function MyTicketsPage({...props}) {
    const toast = useToast();

    const [itemsList, setItemsList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [availableTickets, setAvailableTickets] = useState([]);
    const [endedTickets, setEndedTickets] = useState([]);

    const [selectedTicket, setSelectedTicket] = useState(0);
    const [qrValue, setQrValue] = useState(undefined);

    const {isOpen, onOpen, onClose } = useDisclosure();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCheking, setIsCheking] = useState(false);
    const now = moment(new Date()).unix();

    async function sendValidation(){
        const selectedTicket_aux = selectedTicket;
        const qrValue_aux = qrValue;

        setSelectedTicket(0);
        setQrValue(undefined);
        setIsCheking(true);

        const transaction = await validateTicket(selectedTicket_aux, JSON.parse(qrValue_aux).validationHash, JSON.parse(qrValue_aux).idEvent)
        if(transaction == null){
            //Enseñamos un toast de error
            toast({
                title: 'Error al verificar el ticket',
                description: "No se ha podido verificar el ticket debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setIsCheking(false);
        } else {
            //Enseñamos un toast de éxito
            toast({
                title: 'Ticket validado',
                description: "Se ha validado el ticket.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setIsCheking(false);
        }
    }

    async function getData(){
        var items_list = [];
        var events_list = [];
      

        items_list = await getMyTicketsList();
        events_list = await getEventsListFromBlockchain(true);

        for(let i=0; i < items_list.length; i++) {
            
        }
        console.log(now);
        setItemsList(items_list);
        setEventsList(events_list);
        setIsLoaded(true); 
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(qrValue){
            onClose();
            sendValidation();
        }
    }, [qrValue]);

    return (
        <Box>
            <NavigationBar/>
            <Modal isOpen={selectedTicket != 0 ? isOpen : false} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Escanea el código QR</ModalHeader>
                <ModalBody>
                    {selectedTicket != 0 ?
                        <Flex borderRadius={"10px"} overflow={'hidden'}>
                            <QrReader
                                constraints={{
                                    facingMode: 'environment'
                                }}
                                onResult={(result, error) => {
                                if (!!result) {
                                    setQrValue(result?.text);
                                }

                                /*if (!!error) {
                                    console.info(error);
                                }*/
                                }}
                                style={{ width: '100%' }}
                            />
                            <Webcam
                                audio={false}
                                height={'100%'}
                                //screenshotFormat="image/jpeg"
                                width={'100%'}
                                videoConstraints={{facingMode: 'environment'}}
                            />
                        </Flex>
                    : null}
                </ModalBody>

                <ModalFooter>
                    <ModalFooter>
                        <Button colorScheme='gray' w={'100%'} onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <ContentBox py={"30px"}>
                <Heading mb={"30px"}>Mis tickets</Heading>
                {/*<TipoTicketsMyTickets/>*/}
                {eventsList.length == 0 && itemsList.length == 0 ?
                    <Flex p={4} alignItems={"center"} justifyContent={'center'} w={'100%'} mt={10} >
                        <IoIosInformationCircleOutline />
                        <Text ml={'10px'} >No has comprado ningún ticket.</Text>
                    </Flex>
                :
                    itemsList.map((item) => (
                        <TicketCard
                            ticket={item}
                            eventsList={eventsList}
                            onTicketValidation={(ticketId) => {setSelectedTicket(ticketId); onOpen();}}
                        />
                    ))}
              
            </ContentBox>
            <Footer/>
        </Box>
    );
};


function TicketCard({...props}) {
    return (
        <Flex h={{base: undefined, md: 200}} backgroundColor={'#FDFDFD'} rounded={20} direction={{base:"column", md:"row"}} p={4} mb={'16px'}  boxShadow='lg'>
            <Flex flex={1} h={'full'} direction={{base: "column", md: "row"}}>
                <Image w={{base: "full", md: "300px"}} h={"full"} fit={'cover'} src={getEventById(props.ticket.idEvent, props.eventsList).coverImageUrl} borderRadius={"10px"}/>
                <Flex  flex={0.6} direction={"column"} justifyContent={"center"} p={{base: 0, md: 12}} py={{base: 6, md: 12}} >
                    <Text fontFamily={'Montserrat'} fontWeight={'bold'} fontSize={"2xl"}>{getEventById(props.ticket.idEvent, props.eventsList).title}</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} pt={5} >Fecha y lugar:</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"}  >{getSpanishWeekDayString(new Date(getEventById(props.ticket.idEvent, props.eventsList).initialDate * 1000)) + ',' + ' ' + cutIntervalDate(getEventById(props.ticket.idEvent, props.eventsList).initialDate)}</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>{getVenueById(getEventById(props.ticket.idEvent, props.eventsList).idVenue).name}</Text>
                </Flex>
                <Flex flex={0.2} direction={"column"} justifyContent={"center"} p={{base: 0, md: 12}} py={{base: 2, md: 12}}>
                    <Text fontFamily={'Montserrat'} fontSize={"md"} pt={{base:0,md:5}} >N.º ticket:</Text>
                    <Text fontFamily={'Montserrat'} fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"}>{props.ticket._id}</Text>
                </Flex>
                <Flex  flex={0.2} ml={'auto'}  p={{base: 0, md: 10}} py={{base:2, md: 12}}>
                    {props.ticket.validated == false ?
                        <Flex as={"button"} margin={"auto"}  height='50px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _hover={{backgroundColor: "#333333"}} onClick={()=> {props.onTicketValidation(props.ticket._id); console.log("selectedTicket", props.ticket._id)}}>
                            <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Validar</Text>
                        </Flex>
                    :
                        <Text color={'black'}>Validado</Text>
                    }
                    <AiOutlineScan cursor={'pointer'} size={70}/>
                </Flex>
                
            </Flex>
        </Flex>
    );
};
