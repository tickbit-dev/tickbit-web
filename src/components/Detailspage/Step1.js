import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { CartItem } from './Checkout/CartItem';
  import { CartOrderSummary } from './Checkout/CartOrderSummary'
  import { cartData } from './Checkout/_data'
  
  export default function EventDetailsPage({...props}) {
    return(
    <Box
      w={'100%'}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
     
    >
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Tus tickets seleccionados 
          </Heading>
  
          <Stack spacing="6">
              <CartItem  {...props} />
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary precio={props.precioMatic} idEvento={props.idEvento} onPrev={() => {props.onPrev()}} onNext={() => {props.onNext()}} />

        </Flex>
      </Stack>
    </Box>
  )
}
    