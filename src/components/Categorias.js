//Libraries
import { Flex, Text, Box} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

//Componentes
import TicketCard from '../components/TicketCard';
import Colors from '../constants/Colors';

//Imágenes
import IMAGEN_AITANA from "../assets/aitana.jpg"
import IMAGEN_DADDY_YANKEE from "../assets/dy.jpg"
import IMAGEN_ESTOPA from "../assets/estopa.jpg"
import IMAGEN_CTANGANA from "../assets/ctangana.jpg"
import IMAGEN_MELENDI from "../assets/melendi.jpg"

//Iconos
import { MdMusicNote, MdStarBorder, MdOutlineTheaterComedy, MdTheaters  } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoMusicalNotes } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"
import { FaAngleRight } from "react-icons/fa";


import React, { Component } from "react";
      

<Flex mt={10} display={"flex-end"} w={'100%'} >
      
<Tabs variant='soft-rounded' colorScheme='gray' >
    <Flex direction={'row'}    >
    <Flex direction={'row'} flex={1} >
    <TabList >
        <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
            <IoMusicalNotes size={"20px"}/> &nbsp; Conciertos
        </Tab>
        <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px"}} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
            <HiStar size={"20px"}/>&nbsp; Festivales
        </Tab>
        <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent",marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
            <FaTheaterMasks size={"20px"}/>&nbsp; Teatro
        </Tab>
        <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent",marginRight:"0px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
            <MdTheaters size={"20px"}/>&nbsp; Películas
        </Tab>
    </TabList>
    </Flex>
    <Flex as={"button"} direction={'row'} alignItems={"center"} justifyContent="center">
        <Text margin={'auto'} fontWeight={'bold'} textDecorationLine={'underline'}>Ver todos los eventos</Text>
        {/*<Flex mt={"4px"} ml={"6px"}><IoIosArrowForward/></Flex>*/}
    </Flex>
    </Flex>

<TabPanels>
    <TabPanel>
 <Box mt={"16px"}  >
 
    </Box>
    </TabPanel>
    <TabPanel >
    <Flex mt={"16px"}>
      
    <TicketCard 
        mr={"20px"}
        titulo={"Aitana"}
        imagen={IMAGEN_AITANA}
        fecha={"7 de marzo - 16 de marzo"}
        sitio={"Barcelona, Palau Sant Jordi"}
        url={"/eventos/aitana"}
    />
    <TicketCard
        mr={"20px"}
        titulo={"Estopa"}
        imagen={IMAGEN_ESTOPA}
        fecha={"7 de marzo - 16 de marzo"}
        sitio={"Barcelona, Palau Sant Jordi"}
        url={"/eventos/estopa"}
    />
    <TicketCard
        mr={"20px"}
        titulo={"Daddy Yankee"}
        imagen={IMAGEN_DADDY_YANKEE}
        fecha={"7 de marzo - 16 de marzo"}
        sitio={"Barcelona, Palau Sant Jordi"}
        url={"/eventos/daddy_jankee"}
    />

    <TicketCard 
    mr={"20px"}
    titulo={"Melendi"}
    imagen={IMAGEN_MELENDI}
    fecha={"7 de marzo - 16 de marzo"}
    sitio={"Barcelona, Palau Sant Jordi"}
    url={"/eventos/melendi"}
    
    />
    <TicketCard
        mr={"0px"}
        titulo={"C Tangana"}
        imagen={IMAGEN_CTANGANA}
        fecha={"7 de marzo - 16 de marzo"}
        sitio={"Barcelona, Palau Sant Jordi"}
        url={"/eventos/estopa"}
    />

    </Flex>
    </TabPanel>
</TabPanels>
</Tabs>
</Flex>
    
    );
  }
}
