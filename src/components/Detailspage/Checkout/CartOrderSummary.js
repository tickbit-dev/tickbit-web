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
  import { FaArrowRight } from 'react-icons/fa'
import { buyTicket } from '../../../utils/funcionesComunes'
  
  const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
      <Flex justify="space-between" fontSize="sm">
        <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
          {label}
        </Text>
        {value ? <Text fontWeight="medium">{value}</Text> : children}
      </Flex>
    )
  }
  
  export const CartOrderSummary = (props) => {
    const toast = useToast();
    async function onBuyingTickets(){
   

      const transaction = await buyTicket(props.idEvento, props.precio);
  
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
        console.log('asssssssssssss')
        props.onNext();
      }
  }

    return (
      <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
        <Heading size="md">Importe de la compra</Heading>
  
        <Stack spacing="6">
          <OrderSummaryItem label="Subtotal" value={props.precio.toString().slice(0,6) + ' ' + 'Matic'} />
          <OrderSummaryItem label="Comisión plataforma" value={'1%'}>
 
          </OrderSummaryItem>
          <Flex justify="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontSize="xl" fontWeight="extrabold">
              {props.precio.toString().slice(0,6) + ' ' + 'Matic'}
            </Text>
          </Flex>
        </Stack>
        <Button colorScheme={'black'} color={'white'} backgroundColor={'black'} size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={()=> {props.onNext(); onBuyingTickets()}}>
          Pagar
        </Button>
      </Stack>
    )
  }