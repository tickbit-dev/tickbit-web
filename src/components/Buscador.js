import { useState, useEffect } from 'react';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import Colors from '../constants/Colors';

export default function Buscador({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex w={"full"} mt={"30px"} mb={"30px"}>
            <Flex flex={1} position={"relative"}>
                <Input
                    bg={Colors.secondary.gray}
                    borderWidth={0}
                    h={"50px"}
                    borderTopRightRadius={"30px"} borderBottomRightRadius={"30px"} borderTopLeftRadius={"60px"} borderBottomLeftRadius={"60px"}
                    placeholder={"Busca por conciertos, artistas, eventos..."}
                    pl={"70px"}
                    zIndex={1}
                    fontFamily={"Montserrat"}
                />
                <Flex w={"50px"} h={"50px"} position={"absolute"} borderRadius={"full"} bg={"black"} zIndex={2}>

                </Flex>
            </Flex>
            <Flex w={"300px"} ml={"16px"}>
                <Input
                    bg={Colors.secondary.gray}
                    borderWidth={0}
                    borderRadius={"14px"}
                    h={"50px"}
                    value={"Cualquier ubicación"}
                    fontFamily={"Montserrat"}
                />
            </Flex>
        </Flex>
    );
};
