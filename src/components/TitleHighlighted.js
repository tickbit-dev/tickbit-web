import { Text, useBreakpointValue, Heading } from '@chakra-ui/react';
import Colors from '../constants/Colors';

export default function TitleHighlighted({...props}) {
    return(
        <Heading fontSize={{ base: '3xl', md: '3xl', lg: '3xl' }}>
            <Text
                as={'span'}
                position={'relative'}
                fontFamily={"Montserrat"}
                color={Colors.text.title}
                _after={{
                    content: "''",
                    //width: '100%',
                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                    position: 'absolute',
                    bottom: 0.5,
                    left: "-4px",
                    right: "-4px",
                    bg: props.highlightColor ?? Colors.primary.skyblue + "55",
                    zIndex: -1,
                }}
                ml={"4px"}
            >
                {props.text ?? 'Título destacado'}
            </Text>
            {/*{' '}
            <Text color={'blue.400'} as={'span'}>
                Design Projects
            </Text>{' '}*/}
        </Heading>
    )
}