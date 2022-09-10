//Libraries
import { useState, useEffect, useRef } from 'react';
import { Box, Text, Flex, Button, Input, Heading, Image, toast, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Tab, TabList, Tabs, TabPanels, TabPanel, Stack, Spacer, Spinner, Icon, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Alert, AlertIcon  } from '@chakra-ui/react';

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
import { cancelResale, cutIntervalDate, getCityById, getEventById, getEventsListFromBlockchain, getEventsListFromTest, getMyTicketsList, getSpanishWeekDayString, getTicketsListFromBlockchain, getTicketsListFromTest, getVenueById, newEvent, readEventbyId, resaleTicket, validateTicket } from '../utils/funcionesComunes';
import Asientoscard from '../components/Asientoscard';
import Colors from '../constants/Colors';
import TipoTicketsMyTickets from '../components/TipoTicketsMyTickets';
import { QrReader } from 'react-qr-reader';
import Webcam from 'react-webcam';
import { BsCheckLg } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';


export default function MyTicketsPage({...props}) {
    const toast = useToast();

    const [itemsList, setItemsList] = useState([]);
    const [eventsList, setEventsList] = useState([]);
    const [availableTickets, setAvailableTickets] = useState([]);
    const [endedTickets, setEndedTickets] = useState([]);

    const [selectedTicket, setSelectedTicket] = useState(0);
    const [isRevalidar, setIsRevalidar] = useState(false);
    const [qrValue, setQrValue] = useState(undefined);

    const {isOpen, onOpen, onClose } = useDisclosure();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCheking, setIsCheking] = useState(null);
    const [isError, setIsError] = useState(false);
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
            setIsError(true)
            setIsCheking(false);
            setSelectedTicket(0);
            setQrValue(undefined);
            setTimeout(function () {
                setIsError(false)
            }, 4000);
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
            setIsRevalidar(true);

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
                        <ModalHeader fontFamily={'Montserrat'}>Escanea el código QR</ModalHeader>
                        <ModalBody>
                            {selectedTicket != 0 ?
                                <Flex minH={{base: '55vh', md: '50vh'}}>
                                    <QrReader
                                        constraints={{facingMode: 'environment'}}
                                        style={{ width: '100%', height: '100%' }}
                                        onResult={(result, error) => {
                                            if (!!result) {
                                                setQrValue(result?.text);
                                            }
                                            /*if (!!error) {
                                                console.info(error);
                                            }*/
                                        }}
                                    />
                                    <Flex borderRadius={"10px"} width={"100%"} overflow={'hidden'}>
                                        {!qrValue ?
                                            <Webcam
                                                audio={false}
                                                //screenshotFormat="image/jpeg"
                                                width={'100%'}
                                                videoConstraints={{facingMode: 'environment'}}
                                            />
                                        : isCheking == true ?
                                            <Flex flex={1} width={"100%"} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                                                <Spinner mt={"32px"} size='xl'/>
                                            </Flex>
                                        : isCheking == false ?
                                            isError == true ?
                                                <Flex width={"100%"} height={'100%'} alignItems={'center'} direction={'column'} justifyContent={'center'}>
                                                    <Flex borderRadius={"full"} bg={"#e05a65"} w={"70px"} h={"70px"} alignItems={'center'} justifyContent={'center'}>
                                                        <Icon
                                                            fontSize="30"
                                                            color={"white"}
                                                            as={IoClose}
                                                        />
                                                    </Flex>
                                                    <Text mt={"16px"} fontFamily={'Montserrat'} fontWeight={500}>Error al validar</Text>
                                                </Flex>
                                            :
                                                <Flex width={"100%"} height={'100%'} alignItems={'center'} direction={'column'} justifyContent={'center'}>
                                                    <Flex borderRadius={"full"} bg={Colors.primary.skyblue} w={"70px"} h={"70px"} alignItems={'center'} justifyContent={'center'}>
                                                        <Icon
                                                            fontSize="30"
                                                            color={"white"}
                                                            as={BsCheckLg}
                                                        />
                                                    </Flex>
                                                    <Text mt={"16px"} fontFamily={'Montserrat'} fontWeight={500}>Ticket validado</Text>
                                                </Flex>
                                        : 
                                            null
                                        }
                                    </Flex>
                                </Flex>
                            : null}
                        </ModalBody>

                        <ModalFooter>
                            <ModalFooter w={'100%'}>
                                <Button colorScheme='gray' w={'100%'} onClick={onClose} fontFamily={'Montserrat'}>Cerrar</Button>
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
                                            <Text ml={'10px'} fontFamily={'Montserrat'} fontWeight={500}>No tienes ningún ticket disponible</Text>
                                        </Flex>
                                    :
                                        availableTickets.map((item) => (
                                            <TicketCard
                                                ticket={item}
                                                isRevalidar={isRevalidar}
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
                                            <Text ml={'10px'} fontFamily={'Montserrat'} fontWeight={500}>Todavía no hay tickets validados</Text>
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
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    const [isOnSale, setIsOnSale] = useState(props.ticket.isOnSale);
    const [isRevalidar, setIsRevalidar] = useState(props.isRevalidar);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedTicket, setSelectedTicket] = useState(0);

    async function _handleTicketAction(){
        setIsLoading(true);
        const transaction = isOnSale == true ? await cancelResale(props.ticket._id) : await resaleTicket(selectedTicket)

        if(transaction == null){
            setIsLoading(false);
            //Enseñamos un toast de error
            toast({
                title: isOnSale == true ? 'Error al cancelar la venta del ticket' : 'Error al vender el ticket',
                description: isOnSale == true ? 'No se ha podido cancelar la venta del ticket debido a un error.' : "No se ha podido poner a la venta el ticket debido a un error.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            /*setTimeout(() => {
                window.open("/tickets","_self")
            }, 2000);*/
        } else {
            setIsLoading(false);
            //Enseñamos un toast de éxito
            toast({
                title: isOnSale == true ? 'Venta cancelada correctamente' : 'Ticket puesto a la venta correctamente',
                description: isOnSale == true ? 'La venta del ticket ha sido cancelada.' : "El ticket ha sido puesto a la venta.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setIsOnSale(!isOnSale);
            /*setTimeout(() => {
                window.open("/tickets","_self")
            }, 2000);*/
        }
    }

    useEffect(() => {
        if(isLoading == false){
            onCloseModal();
        }
    }, [isLoading]);

    useEffect(() => {
        setIsRevalidar(props.isRevalidar);
    }, [props.isRevalidar]);

    return (
        <Flex flex={1} rounded={20} direction={{base:"column", md:"row"}} p={4} mb={'16px'} borderWidth={1}>
            <AlertDialog
                isOpen={isOpen}
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {isOnSale == true ? 'Cancelar venta' : 'Vender el ticket'}
                    </AlertDialogHeader>
        
                    <AlertDialogBody>
                        {isOnSale == true ? '¿Estás seguro que quieres cancelar la venta del ticket?' : '¿Estás seguro que quieres poner a la venta este ticket?'}
                        <Alert flexDirection={{base: 'column', md: 'row'}} textAlign={{base: 'center', md: 'left'}} status='warning' bg={'rgb(254, 235, 200)'} mb={'16px'} color={"gray.700"} mt={"30px"}>
                            <AlertIcon alignSelf={"flex-start"} color={'orange.500'} mb={{base: "10px", md: "0px"}}/>
                            El ticket se pondrá a la venta a su precio oficial. En caso de que el ticket sea vendido se te abonará en la cartera ese importe aplicando un 10% de comisión en concepto de gestión.
                        </Alert>
                    </AlertDialogBody>
        
                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button bg={Colors.primary.skyblue} _active={{bg: Colors.primary.skyblue}} _hover={{bg: Colors.primary.skyblueHover}} color={'white'} onClick={() => {onOpenModal(); onClose(); _handleTicketAction(); props.setIsLoading(true)}} ml={3}>
                        {isOnSale == true ? 'Cancelar venta' : 'Poner ticket a la venta'}
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Modal motionPreset='slideInBottom' closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpenModal} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"}>
                        <Spinner size='xs' mr={'16px'}/>
                        <Text>Espera un momento, por favor...</Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Text>La acción está siendo registrada en la blockchain. Esta acción puede tardar un poco...</Text>
                </ModalBody>

                {/*<ModalFooter>
                    
                </ModalFooter>*/}
                </ModalContent>
            </Modal>
            <Stack direction="row" spacing="5" width="full">
                <Image
                    rounded="lg"
                    width={{base: "140px", md: "180px"}}
                    height={{base: "140px", md: "180px"}}
                    fit="cover"
                    src={getEventById(props.ticket.idEvent, props.eventsList).coverImageUrl}
                    backgroundColor={'gray.100'}
                    borderWidth={0}
                    alt={" "}
                    draggable="false"
                    loading="lazy"
                />
                <Flex direction={"column"} minH={{base: "140px", md: "180px"}} justifyContent={"center"}>
                    <Stack spacing={0}>
                        <Text fontWeight="bold" fontSize={'xl'} textAlign={'left'}>{getEventById(props.ticket.idEvent, props.eventsList).title}</Text>
                        <Text fontWeight="medium" mt={"-10px"} textAlign={'left'}>{getEventById(props.ticket.idEvent, props.eventsList).artist}</Text>
                    </Stack>
                    <Text mt={'10px'} textAlign={'left'}>{getSpanishWeekDayString(new Date(getEventById(props.ticket.idEvent, props.eventsList).initialDate * 1000)) + ',' + ' ' + cutIntervalDate(getEventById(props.ticket.idEvent, props.eventsList).initialDate)}</Text>
                    <Text textAlign={'left'}>{getVenueById(getEventById(props.ticket.idEvent, props.eventsList).idVenue).name}</Text>
                    <Text textAlign={'left'}>{getCityById(getEventById(props.ticket.idEvent, props.eventsList).idCity).name}</Text>
                </Flex>
            </Stack>
            <Flex direction={'column'} w={{base: 'full', md: '300px'}} mt={{base: "20px", md: "0px"}}>
                <Flex direction={'column'}>
                    <Text fontSize="sm" fontWeight="medium" color={'gray.500'} fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                        Id de ticket:
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" fontFamily={'Montserrat'} textAlign={{base: 'start', md: 'end'}}>
                        {props.ticket._id}
                    </Text>
                </Flex>
                <Spacer/>
                <Flex flex={1} direction={'column'} w={{base: 'full', md: '300px'}} minW={{base: 'full', md: '300px'}}>
                    {props.ticket.validated == false ?
                        isOnSale == false ?
                            <Flex flex={1} flexDirection={"column"} w={{base: 'full', md: '300px'}} minW={{base: 'full', md: '300px'}}>
                                <Button w={{base: 'full', md: '300px'}} h={'50px'} colorScheme={isRevalidar == true ? 'green' : undefined} bg={isRevalidar == true ? undefined : Colors.primary.skyblue} _active={isRevalidar == true ? undefined : {bg: Colors.primary.skyblue}} _hover={isRevalidar == true ? undefined : {bg: Colors.primary.skyblueHover}} color={'white'} fontFamily={'Montserrat'} mt={{base: "32px", md: "6px"}} onClick={()=> {props.onTicketValidation(props.ticket._id); console.log("selectedTicket", props.ticket._id)}}>{isRevalidar == true ? 'Revalidar ticket' : 'Validar ticket'}</Button>
                                <Button w={{base: 'full', md: '300px'}} h={'50px'} colorScheme={'gray'} fontFamily={'Montserrat'} mt={"10px"} onClick={()=> {onOpen(); setSelectedTicket(props.ticket._id)}}>Poner ticket a la venta</Button>
                            </Flex>
                        :
                            <Flex flex={1} flexDirection={"column"} w={{base: 'full', md: '300px'}} minW={{base: 'full', md: '300px'}}>
                                <Button w={{base: 'full', md: '300px'}} h={'50px'} colorScheme={'gray'} fontFamily={'Montserrat'} mt={"32px"} onClick={()=> {onOpen(); setSelectedTicket(props.ticket._id)}}>Cancelar venta</Button>
                            </Flex>
                    :
                        <Flex w={{base: 'full', md: '300px'}} minW={{base: 'full', md: '300px'}} minH={'50px'} h={'50px'} backgroundColor='#F0F1F8' fontFamily={'Montserrat'} mt={"32px"} borderRadius={"6px"} alignItems={'center'} justifyContent={'center'}>
                            <Text color={"gray"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Validado</Text>
                        </Flex>
                    }
                </Flex>
            </Flex>
        </Flex>
    );
};
