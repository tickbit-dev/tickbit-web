//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Heading, Input, Stack, Spacer, Textarea, Center, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import Colors from '../constants/Colors';

//Images and Icons
import { FiUser, FiPhone, FiMessageSquare, FiTwitter } from "react-icons/fi"
import { IoMailOpenOutline } from "react-icons/io5"
import { HiOutlineMailOpen } from "react-icons/hi"
import { FaRegUser } from "react-icons/fa"
import { BiBookmark } from "react-icons/bi"
import { BsInstagram } from "react-icons/bs"
import SendMailButton from '../components/Buttons/SendMailButton';

//Constants

export default function ContactPage({...props}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const SUBJECTS = [
        {
            title: 'Soporte de incidencias',
            color: Colors.primary.skyblue
        },
        {
            title: 'Ayuda',
            color: Colors.primary.pink
        },
        {
            title: 'Negocios',
            color: Colors.primary.blue
        },
        {
            title: 'Otros',
            color: Colors.primary.purple
        },
    ];

    const SOCIAL = [
        {
            text: '@tickb.it',
            icon: <Flex mt={"6px"}><BsInstagram color={Colors.primary.pink} size={"54px"}/></Flex>,
            link: 'https://www.instagram.com/tickb.it/'
        },
        {
            text: '@tickb_it',
            icon: <FiTwitter color={Colors.primary.skyblue} size={"60px"}/>,
            link: 'https://twitter.com/tickb_it/'
        },
        {
            text: 'contact@tickb.it',
            icon: <HiOutlineMailOpen color={Colors.primary.purple + "CC"} size={"60px"}/>,
            link: 'mailto:contact@tickb.it'
        }
    ];



    return (
        <Box>
            <NavigationBar/>
            <ContentBox>
                <Flex direction={{base: "column", md: "row"}} pt={{base: "6px", md: "16px"}} pb={"32px"}>
                    <Flex direction={"column"} flex={1} justifyContent={"center"} pr={{base: "0px", md: "60px"}}>
                        <Heading fontFamily={"Montserrat"}>Contáctanos</Heading>
                        <Text fontFamily={"Montserrat"} fontWeight={500} mt={"16px"}>Puedes contactarnos a través del formulario o puedes hacerlo a través de:</Text>
                        <Stack spacing={{base: "16px", md: "16px"}} py={"16px"} px={{base: "6px", md: "0px"}} mt={"16px"} mb={{base: "16px", md: "0px"}}>
                            <Stack direction={"row"} spacing={{base: "16px", md: "16px"}}>
                                <SocialBox text={SOCIAL[0].text} icon={SOCIAL[0].icon} link={SOCIAL[0].link}/>
                                <SocialBox text={SOCIAL[1].text} icon={SOCIAL[1].icon} link={SOCIAL[1].link}/>
                            </Stack>
                            <Stack direction={"row"} spacing={{base: "16px", md: "16px"}}>
                                <SocialBox text={SOCIAL[2].text} icon={SOCIAL[2].icon} link={SOCIAL[2].link}/>
                            </Stack>
                        </Stack>
                    </Flex>
                    <Box flex={1.5} p={"16px"} borderRadius={"16px"} borderWidth={"1px"} borderColor={Colors.secondary.gray}>
                        <Stack spacing={"16px"}>
                            <Stack direction={"row"} spacing={"16px"}>
                                <Flex flex={1} direction={"column"}>
                                    <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                        <FaRegUser/>
                                        <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Nombre <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                    </Flex>
                                    <TextInput
                                        placeholder={"Peter Parker"}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Flex>
                                <Flex flex={1} direction={"column"} display={{base: 'none', md: 'flex'}}>
                                    <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                        <HiOutlineMailOpen size={"18px"}/>
                                        <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Mail <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                    </Flex>
                                    <TextInput
                                        placeholder={"peter@avengers.com"}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Flex>
                            </Stack>
                            <Flex flex={1} direction={"column"} display={{base: 'flex', md: 'none'}}>
                                <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                    <HiOutlineMailOpen size={"16px"}/>
                                    <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Mail <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                </Flex>
                                <TextInput
                                    placeholder={"peter@avengers.com"}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Flex>
                            <Stack direction={"row"} spacing={"16px"}>
                                <Flex flex={1} direction={"column"}>
                                    <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                        <FiPhone/>
                                        <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Teléfono</Text>
                                    </Flex>
                                    <TextInput
                                        placeholder={"+34 646464646"}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </Flex>
                            </Stack>
                            <Flex direction={"column"}>
                                <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                    <BiBookmark/>
                                    <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Asunto</Text>
                                </Flex>
                                <Wrap alignItems={'start'} w={"full"}>
                                    {SUBJECTS.map((item) => (
                                        <WrapItem>
                                            <SubjectBox
                                                text={item.title}
                                                color={item.color}
                                                addSubject={(new_subject) => setSubject(subject + new_subject)}
                                                quitSubject={(old_subject) => setSubject(subject.replace(old_subject,""))}
                                            />
                                        </WrapItem>
                                    ))}
                                </Wrap>
                            </Flex>
                            <Flex direction={"column"}>
                                <Flex alignItems={"center"} mb={"10px"} px={"6px"}>
                                    <FiMessageSquare/>
                                    <Text fontFamily={"Montserrat"} fontWeight={500} ml={"10px"}>Mensaje <Text as={"span"} color={"gray.400"}>*</Text></Text>
                                </Flex>
                                <TextInput
                                    textArea={true}
                                    placeholder={"Escribe aquí tu mensaje..."}
                                    onChange={(event) => setMessage(event.target.value)}
                                />
                            </Flex>
                        </Stack>
                        <SendMailButton
                            name={name}
                            email={email}
                            phone={phone}
                            subject={subject == "" ? "Sin asunto" : subject.substring(2, subject.length)}
                            message={message}
                        />
                        <Center mt={"10px"}>
                            <Text fontFamily={"Montserrat"} color={"gray.400"} fontSize={"13px"} fontWeight={500}>Los campos marcados con * son obligatorios</Text>
                        </Center>
                    </Box>
                </Flex>
            </ContentBox>
            <Footer/>
        </Box>
    );
};

function SocialBox({...props}) {
    return(
        <Flex flex={1} as="button" direction={"column"} p={"16px"} borderRadius={"16px"} borderWidth={1} onClick={() => window.open(props.link,'_blank')} _hover={{bg: "gray.50", transform: "scale(1.01)"}} style={{WebkitTapHighlightColor: "transparent"}} transition="all .6s ease">
            {props.icon}
            <Text fontFamily={"Montserrat"} fontWeight={800} mt={"16px"}>{props.text}</Text>
        </Flex>
    )
}

function SubjectBox({...props}) {
    const { isOpen, onToggle } = useDisclosure();

    return(
        <Center
            as={"button"}
            role={"group"}
            h={"50px"}
            bg={isOpen ? /*props.color + "CC"*/ "black" : "white"}
            borderRadius={"10px"}
            borderWidth={1}
            px={"16px"}
            transition="all .3s ease"
            style={{WebkitTapHighlightColor: "transparent"}}
            _hover={{transform: "scale(1.02)"}}
            onClick={() => (onToggle(), isOpen ? props.quitSubject(', ' + props.text) : props.addSubject(', ' + props.text))}
        >
            <Text fontWeight={isOpen ? "bold" : 500} color={isOpen ? "white" : "undefined"} fontSize={isOpen ? "15.27px" : "undefined"} _groupHover={{fontWeight: 'bold', fontSize: "15.27px"}}>{props.text}</Text>
        </Center>
    )
}

function TextInput({...props}) {
    return(
        props.textArea ?
            <Textarea
                borderWidth={1}
                h={"100px"}
                borderRadius={"10px"}
                placeholder={props.placeholder}
                zIndex={1}
                fontFamily={"Montserrat"}
                fontWeight={500}
                _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }}
                transition="all .6s ease"
                _focus={{base: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}, md: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}}}
                onChange={(event) => props.onChange(event)}
            />
        :
            <Input
                borderWidth={1}
                h={"50px"}
                borderRadius={"10px"}
                placeholder={props.placeholder}
                zIndex={1}
                fontFamily={"Montserrat"}
                fontWeight={500}
                _hover={{ bg: "gray.50", /*transform: 'scale(1.01)'*/ }}
                transition="all .6s ease"
                _focus={{base: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}, md: {boxShadow: "0 0 0px 0px " + Colors.secondary.grayHover}}}
                onChange={(event) => props.onChange(event)}
            />
    )
}