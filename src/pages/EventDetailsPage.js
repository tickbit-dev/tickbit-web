import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Colors from '../constants/Colors';

export default function EventDetailsPage({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Box maxW={"100%"} overflow={"hidden"}>
            <NavigationBar/>
            <ContentBox>

                <Text>Josep</Text>

            </ContentBox>

            
            {/*
            
                PARA EL FOOTER
            
            ContentBox bg={Colors.secondary.gray}>

                <Flex w={"100%"} h={"300px"} bg={Colors.secondary.gray}>
                    <Text color={"white"}>Josepe fotter</Text>
                </Flex>

            </ContentBox>*/}
        </Box>
    );
};
