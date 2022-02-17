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
import Categorias from '../components/Categorias';

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
                <Categorias></Categorias>
                   
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