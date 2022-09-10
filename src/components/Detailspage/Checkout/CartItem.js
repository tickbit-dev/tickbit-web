import { CloseButton, Flex, Link, Select, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import Colors from '../../../constants/Colors';

import { CartProductMeta } from './CartProductMeta'

const MAX_TICKETS = 5;

export const CartItem = (props) => {
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    imageUrl,
    currency,
    price,
    onChangeQuantity,
    onClickDelete,
  } = props
  return (
    <Flex
      direction={{
        base: 'column',
        md: 'row',
      }}
      justify="space-between"
    >
      <CartProductMeta
        event={props.event}
        isResale={props.isResale}
      />

      <Flex direction={'column'} mt={{base: "30px", md: "0px"}}>
        <Text fontFamily={"Montserrat"} fontWeight={'medium'} fontSize={{base: "lg", md: "sm"}} textAlign={'left'}>Nº de tickets:</Text>
        <Flex mt={'10px'}>
          {props.availability < MAX_TICKETS ? 
              <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} value={props.numTickets} variant='outline'  w={{base: '100%', md: "120px"}} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                  {new Array(props.availability).fill().map((item, index) => (
                      <option value={index + 1}>{index + 1}</option>
                  ))}
              </Select>
          : 
              <Select onChange={(e) => props.onChangeNumTickets((e.target.value))} value={props.numTickets} variant='outline'  w={{base: '100%', md: "120px"}} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                  {new Array(MAX_TICKETS).fill().map((item, index) => (
                      <option value={index + 1}>{index + 1}</option>
                  ))}
              </Select>
          }
        </Flex>
      </Flex>

      {/* Desktop */}
      {/*<Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
       <Text>N.º tickets {props.numTickets}</Text>
        <Text ml={'auto'}>{props.usdPricePerTicket +'$'+' ' + '≈' +' '+ parseFloat((props.maticUsdConversion).toFixed(4) * props.usdPricePerTicket).toFixed(4) + ' ' + 'MATIC' + '/entrada'}</Text>
      </Flex>*/}

      {/* Mobile */}
      {/*<Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: 'flex',
          md: 'none',
        }}
      >
         <Text>N.º tickets: {props.numTickets}</Text>
        <Text>{props.usdPricePerTicket +'$'+' ' + '≈' +' '+ (props.maticUsdConversion).toFixed(4) + ' ' + 'MATIC' + '/entrada'}</Text>
      </Flex>*/}
    </Flex>
  )
}