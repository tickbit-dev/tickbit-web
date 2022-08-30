import { CloseButton, Flex, Link, Select, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

import { CartProductMeta } from './CartProductMeta'

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
      align="center"
    >
      <CartProductMeta
        event={props.event}
      />

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