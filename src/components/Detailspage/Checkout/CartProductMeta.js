import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { FiGift } from 'react-icons/fi'
import { cutIntervalDate, getSpanishWeekDayString, getVenueById } from '../../../utils/funcionesComunes'
  
  export const CartProductMeta = (props) => {
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={props.event.coverImageUrl}
          alt={props.event.title}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{props.event.title + " - " + props.event.artist}</Text>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {props.event.category}
            </Text>
          </Stack>
          <Text>{getSpanishWeekDayString(new Date(props.event.initialDate * 1000)) + ',' + ' ' + cutIntervalDate(props.event.initialDate)}</Text>
          <Text>{getVenueById(props.event.idVenue).name}</Text>
        </Box>
      </Stack>
    )
  }