import { CloseButton, Flex, Link, Select, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

import { CartProductMeta } from './CartProductMeta'

const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
      defaultValue={1}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  )
}

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
        name={props.tituloevento + ' ' + '-' + ' ' + props.artista}
        categoria={props.categoria}
        image={props.image}
        date={props.fecha2}
        venue={props.recinto}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: 'none',
          md: 'flex',
        }}
      >
       <Text>N.º tickets {props.numTickets}</Text>
        <Text ml={'auto'}>{props.precio}</Text>
      </Flex>

      {/* Mobile */}
      <Flex
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
        <Text>{props.precio.toString()}</Text>
      </Flex>
    </Flex>
  )
}