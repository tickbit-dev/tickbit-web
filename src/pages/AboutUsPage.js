//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';

//Constants

export default function AboutUsPage({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox>
                <Text>AboutUs</Text>
            </ContentBox>
        </Box>
    );
};
