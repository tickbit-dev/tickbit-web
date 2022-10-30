import { useState, useEffect } from 'react';
import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react';
import Colors from '../constants/Colors';

import { CgSearch } from 'react-icons/cg'
import { MdLocationPin } from 'react-icons/md'
import { FiChevronDown } from 'react-icons/fi'

export default function Buscador({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Flex w={"full"} px={{base: "10px", md: "16px"}}>
            <Flex flex={1} position={"relative"}>
                <Input
                    bg={Colors.secondary.gray}
                    borderWidth={0}
                    h={"50px"}
                    borderTopRightRadius={"30px"} borderBottomRightRadius={"30px"} borderTopLeftRadius={"60px"} borderBottomLeftRadius={"60px"}
                    placeholder={"Busca por conciertos, artistas, eventos..."}
                    pl={{base: "62px", md: "70px"}}
                    zIndex={0}
                    fontFamily={"Montserrat"}
                    onChange={(event) => props.onChange(event, 'TEXT')}
                    fontWeight={500}
                    //_hover={{ bg: Colors.secondary.grayHover, /*transform: 'scale(1.01)'*/ }}
                    transition="all .6s ease"
                    _focus={{base: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}, md: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}}}
                />
                <Flex style={{WebkitTapHighlightColor: "transparent"}} w={"50px"} h={"50px"} position={"absolute"} borderRadius={"full"} bg={"black"} zIndex={2} alignItems={"center"} justifyContent={"center"} transition="all .6s ease">
                    <Flex ml={"-3px"} mt={"1px"}><CgSearch color={"white"} size={"20px"}/></Flex>
                </Flex>
            </Flex>
            {/*<Flex cursor={'pointer'} w={"300px"} h={"50px"} ml={"10px"} display={{base: 'none', md: 'flex'}} borderRadius={"14px"} bg={Colors.secondary.gray} overflow={"hidden"} alignItems="center" position={"relative"}
                //_hover={{ bg: Colors.secondary.grayHover, }}
                transition="all .6s ease"
            >
                <Flex position={"absolute"} left={"14px"}>
                    <MdLocationPin size={"18px"}/>
                </Flex>
                <Select
                    cursor={'pointer'}
                    id='country'
                    placeholder='Cualquier ubicación'
                    borderWidth={0}
                    bg={"transparent"}
                    h={"50px"}
                    w={"full"}
                    onChange={(event) => props.onChange(event, 'CITY')}
                    fontFamily={"Montserrat"}
                    borderRadius={"14px"}
                    fontWeight={500}
                    variant='solid'
                    ml={"24px"}
                    icon={<FiChevronDown color={'#b7bfc9'} size={"17px"}/>}
                    iconColor={'#b7bfc9'}
                    iconSize={"17px"}
                >
                    <option value={1}>Barcelona</option>
                    <option value={2}>Madrid</option>
                </Select>
            </Flex>
            <Button 
                w={"50px"}
                h={"50px"}
                style={{WebkitTapHighlightColor: "transparent"}}
                _pressed={{bg: Colors.secondary.grayHover}}
                overflow="hidden"
                ml={"10px"}
                bg={Colors.secondary.gray}
                borderRadius={"14px"}
                display={{base: 'fled', md: 'none'}}
                alignItems={"center"}
                justifyContent={"center"}
                _focus={{boxShadow: "0 0 0px 0px" + Colors.secondary.grayHover}}
            >
                <Flex mt={"5px"} ml={"-1px"}><FiChevronDown size={"22px"}/></Flex>
            </Button>*/}
        </Flex>
    );
};
