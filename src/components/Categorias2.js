import { useState, useEffect } from 'react';
import { Box, Text, Flex, Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import Colors from '../constants/Colors';

//Iconos
import { MdMusicNote, MdStarBorder, MdOutlineTheaterComedy, MdTheaters } from "react-icons/md";
import { HiStar } from "react-icons/hi"
import { FaTheaterMasks } from "react-icons/fa"
import { IoMusicalNotes } from "react-icons/io5"
import { IoIosArrowForward } from "react-icons/io"
import { FaAngleRight } from "react-icons/fa";

export default function Categorias({...props}) {

    const [state, setState] = useState();

    return (
        <Flex w={"full"}>
            <Tabs w={"full"} variant='soft-rounded' colorScheme={Colors.secondary.gray}>
                <TabList w={"full"}>
                    <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{webkitTapHighlightColor: "transparent", marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                        <IoMusicalNotes size={"20px"}/> &nbsp; Conciertos
                    </Tab>
                    <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{webkitTapHighlightColor: "transparent", marginRight:"20px"}} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                        <HiStar size={"20px"}/>&nbsp; Festivales
                    </Tab>
                    <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{webkitTapHighlightColor: "transparent",marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                        <FaTheaterMasks size={"20px"}/>&nbsp; Teatro
                    </Tab>
                    <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{webkitTapHighlightColor: "transparent",marginRight:"0px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                        <MdTheaters size={"20px"}/>&nbsp; Películas
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel w={"100%"} h={"200px"} bg={"red"}>

                    </TabPanel>
                    <TabPanel w={"100%"} h={"200px"} bg={"blue"}>

                    </TabPanel>
                    <TabPanel w={"100%"} h={"200px"} bg={"green"}>

                    </TabPanel>
                    <TabPanel w={"100%"} h={"200px"} bg={"orange"}>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};
