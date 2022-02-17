//Libraries
import { Flex, Text} from '@chakra-ui/react';
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

export default function Categorias({...props}) {
    return (
        <Flex mt={10} display={"flex-end"} w={'100%'} >
      
        <Tabs variant='soft-rounded' colorScheme='gray'  >
            <Flex direction={'row'}    >
            <Flex direction={'row'} flex={1} >
            <TabList>
                <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} textColor={'#AFB1C5'}style={{webkitTapHighlightColor: "transparent", marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                    <MdMusicNote /> &nbsp; Conciertos
                </Tab>
                <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} textColor={'#AFB1C5'}style={{webkitTapHighlightColor: "transparent", marginRight:"20px"}} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                    <MdStarBorder />&nbsp; Festivales
                </Tab>
                <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} textColor={'#AFB1C5'}style={{webkitTapHighlightColor: "transparent",marginRight:"20px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                    <MdOutlineTheaterComedy />&nbsp; Teatro
                </Tab>
                <Tab  _selected={{ color: 'black', bg: '#F0F1F8'}} textColor={'#AFB1C5'}style={{webkitTapHighlightColor: "transparent",marginRight:"0px" }} _focus={{boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white, }} >
                    <MdTheaters/>&nbsp; Películas
                </Tab>
            </TabList>
            </Flex>
            <Flex direction={'row'} flex={0.25}   >
            <Text margin={'auto'} fontWeight={'bold'} textDecorationLine={'underline'}>Ver todos los eventos</Text>
            </Flex>
            </Flex>
        
        <TabPanels>
            <TabPanel>
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
                titulo={"Daddy Yankee"}
                imagen={IMAGEN_DADDY_YANKEE}
                fecha={"7 de marzo - 16 de marzo"}
                sitio={"Barcelona, Palau Sant Jordi"}
                url={"/eventos/daddy_jankee"}
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
                titulo={"C Tangana"}
                imagen={IMAGEN_CTANGANA}
                fecha={"7 de marzo - 16 de marzo"}
                sitio={"Barcelona, Palau Sant Jordi"}
                url={"/eventos/estopa"}
            />
            <TicketCard 
            mr={"0px"}
            titulo={"Melendi"}
            imagen={IMAGEN_MELENDI}
            fecha={"7 de marzo - 16 de marzo"}
            sitio={"Barcelona, Palau Sant Jordi"}
            url={"/eventos/melendi"}
            
            />
            </Flex>
            </TabPanel>
            <TabPanel>
            <p>two!</p>
            </TabPanel>
        </TabPanels>
        </Tabs>
      </Flex>
    );
}


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
    titulo={"Daddy Yankee"}
    imagen={IMAGEN_DADDY_YANKEE}
    fecha={"7 de marzo - 16 de marzo"}
    sitio={"Barcelona, Palau Sant Jordi"}
    url={"/eventos/daddy_jankee"}
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
    titulo={"C Tangana"}
    imagen={IMAGEN_CTANGANA}
    fecha={"7 de marzo - 16 de marzo"}
    sitio={"Barcelona, Palau Sant Jordi"}
    url={"/eventos/estopa"}
/>
<TicketCard mr={"0px"}/>
</Flex>