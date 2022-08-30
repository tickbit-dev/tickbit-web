import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode, 
    useToast
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Colors from '../../../constants/Colors'
import { buyTicket } from '../../../utils/funcionesComunes'
  
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
      const transaction = await buyTicket(props.event._id, props.numTickets, parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket * props.numTickets).toFixed(4));
      
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
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md" fontFamily={'Montserrat'}>Importe de la compra</Heading>
  
        <Stack spacing="6" position={"relative"}>
          <OrderSummaryItem label="Subtotal" value={parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC'}/>
          <OrderSummaryItem label={"Número de tickets"} value={props.numTickets + " " + (props.numTickets == 1 ? " Ticket" : " Tickets")}/>
          <OrderSummaryItem label="Comisión de la plataforma" value={'1%'}/>
          <Text color={"gray.400"} fontFamily={'Montserrat'} fontSize={11} position={'absolute'} top={"90px"} textAlign={'left'}>(*) Comisión ya incluída en el precio</Text>
          <Flex height={"10px"}/>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold" fontFamily={'Montserrat'}>
              Total
            </Text>
            <Flex direction={'column'}>
              <Text fontSize="xl" fontWeight="extrabold" fontFamily={'Montserrat'}>
                {/*props.usdPricePerTicket +'$'+' ' + '≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC' + '/entrada'*/}
                {parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket * props.numTickets).toFixed(4) + ' ' + 'MATIC'}
                
              </Text>
              <Text fontSize="sm" fontWeight="500" color={"gray.500"} fontFamily={'Montserrat'} textAlign={'end'}>
                {'≈ ' + (props.event.price * props.numTickets) + "$"}
              </Text>
            </Flex>
          </Flex>
        </Stack>
        <Stack spacing={"3"}>
          <Button fontFamily={'Montserrat'} color={'white'} backgroundColor={Colors.primary.skyblue} _hover={{backgroundColor: Colors.primary.skyblueHover}} size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={()=> {props.onNext(); onBuyingTickets()}}>
            Pagar
          </Button>
          <Button backgroundColor={"gray.300"} fontFamily={'Montserrat'} color={'white'} size="lg" fontSize="md" textColor={'black'} onClick={()=> {props.onPrev();}}>
            Atrás
          </Button>
        </Stack>
      </Stack>
    )
  }