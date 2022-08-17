//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';


//Components
import useWindowDimensions from './Utils/useWindowDimensions';

//Iconos & Images
import { MdOutlineEventAvailable, MdOutlineEventBusy } from "react-icons/md";

//Constants
import Colors from '../constants/Colors';
import Dimensions from '../constants/Dimensions';

export default function TipoTicketsMyTickets({...props}) {

    const [state, setState] = useState();
	const { height, width } = useWindowDimensions();

    return (
        <Flex w={"full"}>
            <Tabs w={"full"} variant='soft-rounded' colorScheme={Colors.secondary.gray}>
                <Flex>
                    <TabList>
                        <Tab isFitted="true" _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                            <MdOutlineEventAvailable size={"20px"}/> &nbsp; Disponibles
                        </Tab>
                        <Tab _selected={{ color: 'black', bg: '#F0F1F8'}} _hover={{color: 'black'}} py={"13px"} pl={"20px"} pr={"26px"} textColor={'#AFB1C5'} fontFamily={"Montserrat"} style={{WebkitTapHighlightColor: "transparent", marginRight:"20px"}} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                            <MdOutlineEventBusy size={"20px"}/>&nbsp; Finalizados
                        </Tab>

                    </TabList>
                </Flex>
                <TabPanels>
                    <TabPanel w={"100%"} h={"200px"} bg={"red"}>
                
                    </TabPanel>
                    <TabPanel w={"100%"} h={"200px"} bg={"blue"}>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
};
