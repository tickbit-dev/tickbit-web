//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';

//Constants

export default function ContactPage({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Box>
            <NavigationBar
                
            />
            <ContentBox>
                <Text>Contact</Text>
            </ContentBox>
            <Footer/>
        </Box>
    );
};
