import {
  Badge,
    Button,
    Flex,
    Heading,
    Icon,
    Link,
    Stack,
    Text,
    useColorModeValue as mode, 
    useToast
  } from '@chakra-ui/react'
  import * as React from 'react'
import { BsShieldFillCheck } from 'react-icons/bs'
  import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Colors from '../../../constants/Colors'
import { buyTicket, buyTicketResale } from '../../../utils/funcionesComunes'
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" fontFamily={'Montserrat'} color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium" fontFamily={'Montserrat'}>{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = (props) => {
    const toast = useToast();
    async function onBuyingTickets(){
      const transaction = props.isResale ?
      await buyTicketResale(props.event._id, props.numTickets, parseFloat((1/(props.maticUsdConversion).toFixed(4)) * props.usdPricePerTicket * props.numTickets).toFixed(4))
      : await buyTicket(props.event._id, props.numTickets, parseFloat((1/(props.maticUsdConversion).toFixed(4)) * props.usdPricePerTicket * props.numTickets).toFixed(4));
      
      if(transaction == null){
        toast({
          title: 'Error al realizar el pago',
          description: "No se ha podido realizar el pago correctamente.",
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
        props.onPrev();
      } else {
        props.onNext();
      }
  }

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding={{base: "20px", md: 8}} width="full">
        <Heading size="md" fontFamily={'Montserrat'} textAlign={{base: "left", md: undefined}} mt={{base: "10px", md: "0px"}}>Importe de la compra</Heading>
  
        <Stack spacing="6" position={"relative"}>
          <Flex direction={'column'}>
            <OrderSummaryItem label="Subtotal" value={parseFloat((1/(props.maticUsdConversion).toFixed(4)) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC'}/>
            <Text fontSize="sm" fontWeight="500" color={"gray.500"} fontFamily={'Montserrat'} textAlign={'end'}>
              {'≈ ' + (props.event.price) + "$"}
            </Text>
          </Flex>
          <OrderSummaryItem label={"Número de tickets"} value={props.numTickets + " " + (props.numTickets == 1 ? " Ticket" : " Tickets")}/>
          <OrderSummaryItem label="Comisión de la plataforma" value={props.isResale ? '1%' : '5%'}/>
          <Text color={"gray.400"} fontFamily={'Montserrat'} fontSize={11} position={'absolute'} top={"115px"} textAlign={'left'}>(*) Comisión ya incluída en el precio</Text>
          <Flex height={"10px"}/>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold" fontFamily={'Montserrat'}>
              Total
            </Text>
            <Flex direction={'column'}>
              <Text fontSize="xl" fontWeight="extrabold" fontFamily={'Montserrat'}>
                {/*props.usdPricePerTicket +'$'+' ' + '≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC' + '/entrada'*/}
                {parseFloat((1/(props.maticUsdConversion).toFixed(4)) * props.usdPricePerTicket * props.numTickets).toFixed(4) + ' ' + 'MATIC'}
                
              </Text>
              <Text fontSize="sm" fontWeight="500" color={"gray.500"} fontFamily={'Montserrat'} textAlign={'end'}>
                {'≈ ' + (props.event.price * props.numTickets) + "$"}
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Flex direction={"column"}>
          {props.isResale ?
            <Flex flex={1} justifyContent={"flex-end"} alignItems={'center'} mt={"-10px"}>
              <Badge colorScheme='cyan' pt={"6px"} pb={"16px"} borderTopRadius={'6px'} px={"10px"} mb={"-10px"} flex={1}>
                  <Flex alignItems={'center'} justifyContent={'center'}>
                      <Icon
                          fontSize={"15px"}
                          as={BsShieldFillCheck}
                      />
                      <Text ml={"10px"}>Reventa segura con Tickbit</Text>
                  </Flex>
              </Badge>
            </Flex> 
          : null}
          <Button fontFamily={'Montserrat'} color={'white'} backgroundColor={Colors.primary.skyblue} _hover={{backgroundColor: Colors.primary.skyblueHover}} size="lg" fontSize="md" /*rightIcon={<FaArrowRight />}*/ onClick={()=> {props.onNext(); onBuyingTickets()}}>
            Pagar
          </Button>
          <Button backgroundColor={"gray.300"} mt={"12px"} fontFamily={'Montserrat'} color={'white'} size="lg" fontSize="md" textColor={'black'} onClick={()=> {props.onPrev();}}>
            Atrás
          </Button>
        </Flex>
      </Stack>
    )
  }