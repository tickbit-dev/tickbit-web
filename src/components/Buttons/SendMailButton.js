import * as React from "react";
import { ChakraProvider, useToast, Button, Box, Flex, Text, Center } from '@chakra-ui/react';
import Colors from "../../constants/Colors";
import { IoIosCheckmarkCircle, IoMdPaperPlane, IoIosCloseCircle } from "react-icons/io";

const ENDPOINT = 'https://tickbit.netlify.app/.netlify/functions/send-email';

export default function SendMailButton({...props}) {
    const toast = useToast()
    const toastIdRef = React.useRef()

    function _handleSendMessage(){
        toastIdRef.current = toast({
            duration: 9000,
            render: () => (
                <Flex 
                    p={"16px"}
                    bg={"white"}
                    borderBottomLeftRadius={"16px"}
                    borderTopRightRadius={"16px"}
                    borderWidth={"1px"}
                    borderColor={Colors.primary.skin}
                    direction={"row"}
                    alignItems={"center"}
                >
                    <IoMdPaperPlane color={Colors.primary.brown}/>
                    <Text color={"black"} fontFamily={"NOW-REGULAR"} ml={"16px"}>{"Enviando el mensaje..."}</Text>
                </Flex>
            )
        })
        fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify({name: props.name, email: props.email, message: props.message, phone: props.phone, subject: props.subject})
        }).then(response =>{
            console.log(response)
            if(response.status == 200){
                toast.close(toastIdRef.current);
                toastIdRef.current = toast({
                    duration: 3000,
                    render: () => (
                        <Flex 
                            p={"16px"}
                            bg={"white"}
                            borderBottomLeftRadius={"16px"}
                            borderTopRightRadius={"16px"}
                            borderWidth={"1px"}
                            borderColor={Colors.primary.skin}
                            direction={"row"}
                            alignItems={"center"}
                        >
                            <IoIosCheckmarkCircle color={Colors.primary.brown}/>
                            <Text color={"black"} fontFamily={"NOW-REGULAR"} ml={"16px"}>{"Mensaje enviado!"}</Text>
                        </Flex>
                    )
                })
            } else{
                toast.close(toastIdRef.current);
                toastIdRef.current = toast({
                    duration: 3000,
                    render: () => (
                        <Flex 
                            p={"16px"}
                            bg={"white"}
                            borderBottomLeftRadius={"16px"}
                            borderTopRightRadius={"16px"}
                            borderWidth={"1px"}
                            borderColor={Colors.primary.skin}
                            direction={"row"}
                            alignItems={"center"}
                        >
                            <IoIosCloseCircle color={Colors.primary.brown}/>
                            <Text color={"black"} fontFamily={"NOW-REGULAR"} ml={"16px"}>{"No se ha podido enviar el mensaje"}</Text>
                        </Flex>
                    )
                })
            }
        });
    }

    return (
        <Center as={"button"} h={"50px"} w={"full"} bg={"black"} borderRadius={"10px"} mt={"26px"} _hover={{bg: "#262626", transform: "scale(1.01)"}} style={{webkitTapHighlightColor: "transparent"}} onClick={() => _handleSendMessage()} transition="all .6s ease">
            <Text color={"white"} fontFamily={"Montserrat"} fontWeight={600}>Enviar mensaje</Text>
        </Center>
    )
};