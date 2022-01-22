//Libraries
import { useState, useEffect } from 'react';
import { Box, Image, Text, Button, useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

//Images & Icons
import MetamaskLogo from "../../assets/metamask_logo.webp"
import {BsFillCheckCircleFill} from "react-icons/bs"

//Contstants
import Colors from '../../constants/Colors';

export default function MetamaskButton({...props}) {
    const [userAddress, setUserAddress] = useState(" ");
    const toast = useToast()

    useEffect(() => {
        console.log("componentDidMount")

        getCurrentUserAddress();
        startUserAddressChangedListener();
    }, []);

    async function connectMetamaskWallet(){
        if(isMobileDevice()){
            if(isMetamaskInstalled()){
                await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                    setUserAddress(accounts[0]);
                    toast({
                        title: 'Connected with Metamask',
                        description: "You are now conected with the wallet address " + accounts,
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                });
            } else {
                window.open("https://metamask.app.link/dapp/tickb.it")
            }
        } else {
            await window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                setUserAddress(accounts[0]);
                toast({
                    title: 'Connected with Metamask',
                    description: "You are now conected with the wallet address " + accounts,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            });
        }
    }

    function getCurrentUserAddress() {
        if(isMetamaskInstalled()){
            window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
                console.log("current account: " + accounts[0])
                setUserAddress(accounts[0]);
            });
        }
    }

    function startUserAddressChangedListener() {
        if(isMetamaskInstalled()){
            window.ethereum.on('accountsChanged', function (accounts) {
                //Acount changed
                if(accounts[0] == null){
                    toast({
                        title: 'Disconnected from Metamask',
                        description: "Please, connect again with Metamask.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                } else {
                    toast({
                        title: 'Account changed',
                        description: "You have changed your account to " + accounts[0],
                        status: 'info',
                        duration: 9000,
                        isClosable: true,
                    })
                }
                setUserAddress(accounts[0]);
            });
        }
    }

    function isMobileDevice() {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    function isMetamaskInstalled() {
        return typeof window.ethereum !== 'undefined'
    }

    return(
        <Button
            as="button"
            pl={"12px"}
            pr={"14px"}
            pt={"8px"}
            pb={"8px"}
            borderRadius={"6px"}
            borderWidth={"1px"}
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            _hover={{ bg: '#ebedf0' }}
            _active={{
                bg: '#dddfe2',
                borderColor: '#bec3c9',
            }}
            bg="white"
            /*_focus={{
                boxShadow:
                  '0 0 1px 3px rgba(64, 153, 255, 0.6), 0 1px 1px rgba(0, 0, 0, .15)',
            }}*/
            onClick={() => !userAddress ? connectMetamaskWallet() : null}
            overflow={"hidden"}
        >
            {!userAddress ?
                <Box d="flex" alignItems={"center"} justifyContent={"center"}>
                    <Image h="24px" pr="12px" src={MetamaskLogo}/>
                    <Text fontFamily={"Montserrat"} fontSize={"sm"} color={Colors.text.title} fontWeight={"semibold"}>Conectar con Metamask</Text>
                </Box>
            :
                <Box d="flex" alignItems={"center"} justifyContent={"center"}>
                    <Image h="24px" pr="12px" src={MetamaskLogo}/>
                    <Text fontFamily={"Montserrat"} fontSize={"sm"} color={Colors.text.title} fontWeight={"semibold"} mr={"16px"}>{userAddress.length > 10 ? userAddress.substring(0, 5) + "..." + userAddress.substring(userAddress.length - 4, userAddress.length) : userAddress}</Text>
                    <BsFillCheckCircleFill color={"#60d16b"}/>
                </Box>
            }
        </Button>
    )
}