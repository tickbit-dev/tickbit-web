import {
  Badge,
    Box,
    Flex,
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
import { cutIntervalDate, getCityById, getSpanishWeekDayString, getVenueById } from '../../../utils/funcionesComunes'
  
  export const CartProductMeta = (props) => {
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="155px"
          height="155px"
          fit="cover"
          src={props.event.coverImageUrl}
          alt={props.event.title}
          draggable="false"
          loading="lazy"
        />
        <Box>
          
          {props.isResale == true ?
            <Flex>
                <Badge colorScheme='cyan' mb={"4px"}>Tickets de reventa</Badge>
            </Flex>
          : null}
          <Stack spacing={0}>
            <Text fontWeight="bold" fontSize={'xl'} textAlign={'left'}>{props.event.title}</Text>
            <Text fontWeight="medium" mt={"-10px"} textAlign={'left'}>{props.event.artist}</Text>
          </Stack>
          <Text mt={'10px'} textAlign={'left'}>{getSpanishWeekDayString(new Date(props.event.initialDate * 1000)) + ',' + ' ' + cutIntervalDate(props.event.initialDate)}</Text>
          <Text textAlign={'left'}>{getVenueById(props.event.idVenue).name}</Text>
          <Text textAlign={'left'}>{getCityById(props.event.idCity).name}</Text>
        </Box>
      </Stack>
    )
  }