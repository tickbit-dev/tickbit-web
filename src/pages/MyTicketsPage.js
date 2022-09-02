//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Button, Input, Heading, Image, toast, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Tab, TabList, Tabs, TabPanels, TabPanel, Stack, Spacer, Spinner, Icon  } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import { ImQrcode } from "react-icons/im";
import { AiOutlineScan} from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineEventAvailable, MdOutlineEventBusy } from "react-icons/md";

//Constants
//Solidity
import { ethers, BigNumber } from 'ethers';
import { contractAddress, contractAddressTickets, RPC_URL_PROCIVER } from '../solidity/config';
import Tickbit from '../solidity/artifacts/contracts/Tickbit.sol/Tickbit.json';
import TickbitTicket from '../solidity/artifacts/contracts/TickbitTicket.sol/TickbitTicket.json';
import Web3Modal from 'web3modal';
import moment from 'moment';
import Portada from '../components/Portada';
import { cutIntervalDate, getCityById, getEventById, getEventsListFromBlockchain, getEventsListFromTest, getMyTicketsList, getSpanishWeekDayString, getTicketsListFromBlockchain, getTicketsListFromTest, getVenueById, newEvent, readEventbyId, validateTicket } from '../utils/funcionesComunes';
import Asientoscard from '../components/Asientoscard';
import Colors from '../constants/Colors';
import TipoTicketsMyTickets from '../components/TipoTicketsMyTickets';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import { BsCheckLg } from 'react-icons/bs';


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
    const [isCheking, setIsCheking] = useState(null);
    const now = moment(new Date()).subtract(1, 'days').unix();

    async function sendValidation(){
        const selectedTicket_aux = selectedTicket;
        const qrValue_aux = qrValue;

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
            setSelectedTicket(0);
            setQrValue(undefined);
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

            setTimeout(function () {
                onClose();
                setSelectedTicket(0);
                setQrValue(undefined);
            }, 4000);
        }
    }

    async function getData(){
        var items_list = [];
        var events_list = [];
        var availableTickets_list = [];
        var endedTickets_list = [];
      

        items_list = await getMyTicketsList();
        console.log(items_list);
        events_list = await getEventsListFromBlockchain(true);

        for(let i=0; i < items_list.length; i++) {
            if(items_list[i].validated == false || items_list[i].finalDate > now){
                availableTickets_list.push(items_list[i]);
            }

            if(items_list[i].validated == true || items_list[i].finalDate < now){
                endedTickets_list.push(items_list[i]);
            }
        }
        //setItemsList(items_list);
        setAvailableTickets(availableTickets_list);
        setEndedTickets(endedTickets_list);
        setEventsList(events_list);
        setIsLoaded(true);
    }

    useEffect(() => {
        getData();
    }, []);

    function onReadedQr(){
        //onClose();
        sendValidation();
    }

    useEffect(() => {
        if(qrValue){
            onReadedQr();
        }
    }, [qrValue]);

    return (
        <Flex maxW={"100%"} direction={'column'} overflow={"hidden"} minH={'100vh'}>
            <ContentBox>
                <NavigationBar/>
                <Flex direction={"column"} px={{base: '10px', md: '16px'}}>
                    <Modal isOpen={selectedTicket != 0 ? isOpen : false} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Escanea el código QR</ModalHeader>
                        <ModalBody>
                            {selectedTicket != 0 ?
                                <Flex borderRadius={"10px"} overflow={'hidden'}>
                                    <QrReader
                                        constraints={{facingMode: 'environment'}}
                                        style={{ width: '100%' }}
                                        onResult={(result, error) => {
                                            if (!!result) {
                                                setQrValue(result?.text);
                                            }
                                            /*if (!!error) {
                                                console.info(error);
                                            }*/
                                        }}
                                    />
                                    {!qrValue ?
                                        <Webcam
                                            audio={false}
                                            height={'100%'}
                                            //screenshotFormat="image/jpeg"
                                            width={'100%'}
                                            videoConstraints={{facingMode: 'environment'}}
                                        />
                                    : isCheking == true ?
                                        <Flex width={"100%"} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                            <Spinner mt={"32px"} size='xl'/>
                                        </Flex>
                                    : isCheking == false ?
                                        <Flex width={"100%"} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                            <Flex borderRadius={"full"} bg={Colors.primary.skyblue} w={"70px"} h={"70px"} alignItems={'center'} justifyContent={'center'}>
                                                <Icon
                                                    fontSize="30"
                                                    color={"white"}
                                                    as={BsCheckLg}
                                                />
                                            </Flex>
                                        </Flex>
                                    : 
                                        null
                                    }
                                </Flex>
                            : null}
                        </ModalBody>

                        <ModalFooter>
                            <ModalFooter w={'100%'}>
                                <Button colorScheme='gray' w={'100%'} onClick={onClose}>Cerrar</Button>
                            </ModalFooter>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Heading mb={"30px"}>Mis tickets</Heading>
                    <Flex w={"full"}>
                        <Tabs w={"full"} variant='soft-rounded' colorScheme={Colors.secondary.gray}>
                            <Flex>
                                <TabList>
                                    <Tab isFitted="true" _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                                        <MdOutlineEventAvailable  size={"20px"}/> &nbsp; <Text>Disponibles</Text>
                                    </Tab>
                                    <Tab isFitted="true" _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px"}} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                                        <MdOutlineEventBusy size={"20px"}/>&nbsp; <Text> Finalizados </Text>
                                    </Tab>
                                </TabList>
                            </Flex>
                            <TabPanels>
                                <TabPanel w={"100%"}>
                                    {isLoaded == false ?
                                        <Flex p={4} alignItems={"center"} justifyContent={'center'} w={'100%'} mt={10}>
                                            <Spinner mt={"32px"} mb={"32px"} size='lg' />
                                        </Flex>
                                    : availableTickets.length == 0 ?
                                        <Flex p={4} alignItems={"center"} justifyContent={'center'} w={'100%'} mt={10} >
                                            <IoIosInformationCircleOutline />
                                            <Text ml={'10px'} >No hay ningún ticket.</Text>
                                        </Flex>
                                    :
                                        availableTickets.map((item) => (
                                            <TicketCard
                                                ticket={item}
                                                eventsList={eventsList}
                                                onTicketValidation={(ticketId) => {setSelectedTicket(ticketId); onOpen();}}
                                            />
                                        ))}
                                </TabPanel>
                                <TabPanel w={"100%"}>
                                    {isLoaded == false ?
                                        <Flex p={4} alignItems={"center"} justifyContent={'center'} w={'100%'} mt={10}>
                                            <Spinner mt={"32px"} mb={"32px"} size='lg' />
                                        </Flex>
                                    : endedTickets.length == 0 ?
                                        <Flex p={4} alignItems={"center"} justifyContent={'center'} w={'100%'} mt={10} >
                                            <IoIosInformationCircleOutline />
                                            <Text ml={'10px'} >No hay ningún ticket.</Text>
                                        </Flex>
                                    :
                                        endedTickets.map((item) => (
                                            <TicketCard
                                                ticket={item}
                                                eventsList={eventsList}
                                                onTicketValidation={(ticketId) => {setSelectedTicket(ticketId); onOpen();}}
                                            />
                                        ))}
                                    
                
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Flex>
            </ContentBox>
            <Footer/>
        </Flex>
    );
};


function TicketCard({...props}) {
    return (
        <Flex flex={1} rounded={20} direction={{base:"column", md:"row"}} p={4} mb={'16px'} borderWidth={1}>
            <Stack direction="row" spacing="5" width="full">
                <Image
                    rounded="lg"
                    width="140px"
                    height="140px"
                    fit="cover"
                    src={getEventById(props.ticket.idEvent, props.eventsList).coverImageUrl}
                    backgroundColor={'gray.100'}
                    borderWidth={0}
                    alt={" "}
                    draggable="false"
                    loading="lazy"
                />
                <Box>
                    <Stack spacing={0}>
                        <Text fontWeight="bold" fontSize={'xl'} textAlign={'left'}>{getEventById(props.ticket.idEvent, props.eventsList).title}</Text>
                        <Text fontWeight="medium" mt={"-10px"} textAlign={'left'}>{getEventById(props.ticket.idEvent, props.eventsList).artist}</Text>
                    </Stack>
                    <Text mt={'10px'} textAlign={'left'}>{getSpanishWeekDayString(new Date(getEventById(props.ticket.idEvent, props.eventsList).initialDate * 1000)) + ',' + ' ' + cutIntervalDate(getEventById(props.ticket.idEvent, props.eventsList).initialDate)}</Text>
                    <Text textAlign={'left'}>{getVenueById(getEventById(props.ticket.idEvent, props.eventsList).idVenue).name}</Text>
                    <Text textAlign={'left'}>{getCityById(getEventById(props.ticket.idEvent, props.eventsList).idCity).name}</Text>
                </Box>
            </Stack>
            <Flex direction={'column'} width={"300px"} mt={{base: "20px", md: "0px"}}>
                <Flex direction={'column'}>
                    <Text fontSize="sm" fontWeight="medium" color={'gray.500'} fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                        Id de ticket:
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                        {props.ticket._id}
                    </Text>
                </Flex>
                <Spacer/>
                <Flex direction={'column'}>
                    {props.ticket.validated == false ?
                        <Button w={{base: 'full', md: '300px'}} h={'50px'} bg={Colors.primary.skyblue} _active={{bg: Colors.primary.skyblue}} _hover={{bg: Colors.primary.skyblueHover}} color={'white'} fontFamily={'Montserrat'} mt={"32px"} onClick={()=> {props.onTicketValidation(props.ticket._id); console.log("selectedTicket", props.ticket._id)}}>Validar ticket</Button>
                    :
                        <Flex w={{base: 'full', md: '300px'}} h={'50px'} backgroundColor='#F0F1F8' fontFamily={'Montserrat'} mt={"32px"} borderRadius={"6px"} alignItems={'center'} justifyContent={'center'}>
                            <Text color={"gray"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Validado</Text>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};
