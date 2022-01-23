//Libraries
import { Box, Flex, Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import TitleHighlighted from '../components/TitleHighlighted';
import Colors from '../constants/Colors';

export default function HomePage() {
    return (
        <Box maxW={"100%"} overflow={"hidden"}>
            <NavigationBar/>
            <Flex px={{base: "16px", md: "26px"}} py={{base: "16px", md: "26px"}}>
                <TitleHighlighted
                    text={"Eventos destacados"}
                />
            </Flex>
            <Flex px={{base: "16px", md: "26px"}} py={{base: "16px", md: "26px"}}>
                <TitleHighlighted
                    text={"Próximos eventos"}
                    highlightColor={Colors.primary.pink + '55'}
                />
            </Flex>
        </Box>
    )
}