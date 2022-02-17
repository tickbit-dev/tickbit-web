//Libraries
import { Box, Flex, Text } from '@chakra-ui/react';
import MyCalendar from '../components/MyCalendar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import TicketCard from '../components/TicketCard';
import TitleHighlighted from '../components/TitleHighlighted';
import Colors from '../constants/Colors';

import IMAGEN_AITANA from "../assets/aitana.jpg"
import IMAGEN_DADDY_YANKEE from "../assets/dy.jpg"
import IMAGEN_ESTOPA from "../assets/estopa.jpg"
import IMAGEN_CTANGANA from "../assets/ctangana.jpg"
import ContentBox from '../components/ContentBox';
import Buscador from '../components/Buscador';

export default function HomePage() {
    return (
        <Box maxW={"100%"} overflow={"hidden"}>
            <NavigationBar/>
            
            <ContentBox>
                <Buscador/>
                <TitleHighlighted
                    text={"Categorías"}
                />
                {/*<MyCalendar/>*/}
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
                    <Flex mt={"0px"} py={{base: "16px", md: "26px"}}>
                        <TitleHighlighted
                            text={"Próximos eventos"}
                            highlightColor={Colors.primary.pink + '55'}
                        />
                    </Flex>
            </ContentBox>
        </Box>
    )
}