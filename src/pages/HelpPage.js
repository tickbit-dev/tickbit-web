//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Heading, AccordionPanel, AccordionIcon, AccordionButton, AccordionItem, Accordion, Image } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import HelpImage from '../assets/help.png';

//Constants
import Colors from '../constants/Colors';
import { Link } from 'react-router-dom';

export default function HelpPage({...props}) {

    const [state, setState] = useState();
   
    async function changeNetwork(){
		const data = [{
            chainId: '0x13881',
            chainName: 'Mumbai Testnet',
            nativeCurrency:
                {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                },
            rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
            blockExplorerUrls: ['https://polygonscan.com/'],
        }]

		const tx = await window.ethereum.request({method: 'wallet_addEthereumChain', params: data}).catch()
		const tx2 = await window.ethereum.request({method: 'wallet_switchEthereumChain', params:[{ chainId: '0x13881' }]}).catch()
	}

    useEffect(() => {
    }, []);

    return (
        <Box>
            
            <ContentBox>
                <NavigationBar/>
                <Flex direction={{base:'column', lg:'row'}} mt={10} p={4} >
                    <Flex direction={'column'} w={'100%'} p={4} mt={'auto'} mb={'auto'}>
                        <Heading fontFamily={"Montserrat"} >Centro de ayuda</Heading>
                        <Text color={Colors.text.subtitle} fontFamily={"Montserrat"} mt={5}>Todo lo que necesitas saber sobre nuestra plataforma</Text>
                    </Flex>
                    <Image src={HelpImage} alt='Metamask image' h={'300px'} w={'600p'}  mt={'auto'} mb={'auto'} objectFit={'contain'}/>
                </Flex>

                <Flex direction={{base:'column', lg:'row'}} p={4} mt={10}  alignItems={'center'} w={'100%'} justifyContent={'space-between'}>
                    <Flex direction={'column'} flex={0.3} p={4}>
                        <Text fontFamily={"Montserrat"} color={'#623FCF'} fontWeight={'bold'}>Soporte</Text>
                        <Heading  fontFamily={"Montserrat"} mt={4}>FAQs</Heading>
                        <Text color={Colors.text.subtitle} fontFamily={"Montserrat"} mt={5} textAlign={'justify'}> Preguntas frequentes que pueden surgir a la hora de usar nuestra plataforma. 
                            No puedes encontrar lo que estas bucando? Por favor coméntanos tus dudas en nuestra sección de Contacto.
                        </Text>
                    </Flex>
                    <Flex direction={'column'} h={300}  p={4} mt={10} flex={0.7} ml={{base:0, lg:5}}>
                        <Accordion allowToggle >
                            <AccordionItem >
                                <h2>
                                <AccordionButton _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'bold'} fontFamily={"Montserrat"} fontSize={'lg'}>Qué es Metamask?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                <Text fontFamily={"Montserrat"} textAlign={'justify'}>
                                   MetaMask es un plugin para el navegador que sirve como wallet de activos crypto, y se instala como cualquier otro plugin normal. 
                                   Una vez instalado, permite a los usuarios almacenar diferentes tipos de criptomonedas y tokens, permitiéndoles realizar transacciones a cualquier otra dirección.
                                </Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem >
                                <h2>
                                <AccordionButton _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'bold'} fontFamily={"Montserrat"} fontSize={'lg'}>Cómo instalar Metamask?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontFamily={"Montserrat"} textAlign={'justify'} >
                                        MetaMask está disponible en navegadores web,&nbsp;  
                                        <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202')}>IOS&nbsp;</Text>  
                                        y <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://play.google.com/store/apps/details?id=io.metamask&hl=es&gl=US')}>Android</Text>  
                                        . Puede instalar la extensión MetaMask en <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es')}>Chrome</Text>
                                        , <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://addons.mozilla.org/es/android/addon/ether-metamask/')}>Firefox</Text>
                                        , <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es')}>Brave&nbsp;</Text>
                                        y <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm')}>Edge</Text>.
                                    </Text>
                                

                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                <AccordionButton  _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'bold'} fontFamily={"Montserrat"} fontSize={'lg'}>Cómo configuro Metamask para realizar compras en Tickbit?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontFamily={"Montserrat"} textAlign={'justify'}>
                                        Actualmente la web está integrada en la red de pruebas Polygon Mumbai, para poder realizar compras se necesita disponer de 
                                        una billetera previamente creada en Metamask y configurar la red de pruebas de Polygon Mumbai. Para configurar la red automáticamente en tu Metamask haz
                                        click <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => changeNetwork() }>aquí</Text>.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                <AccordionButton  _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'bold'} fontFamily={"Montserrat"} fontSize={'lg'}>Con que moneda se realizan los pagos?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text  fontFamily={"Montserrat"} textAlign={'justify'}>
                                        Actualmente los pagos dentro de la plataforma se realizan con MATIC, el token nativo de la red de pruebas Polygon Mumbai. Por lo tanto deberás de
                                        disponer en tu billetera Metamask de suficientes tokens MATIC cómo para realizar el pago del precio de la entrada y las comisiones de la red de Polygon Mumbai.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                <AccordionButton  _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}>
                                    <Box flex='1' textAlign='left'>
                                        <Text fontWeight={'bold'} fontFamily={"Montserrat"} fontSize={'lg'}>Cómo puedo hacer un seguimiento de mis transacciones o compras?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text  fontFamily={"Montserrat"} textAlign={'justify'}>
                                        Puedes ver todos los movimientos realizados desde tu billetera conectada a nuestra web introduciendo tu dirección en:
                                        <Text as={'span'} fontFamily={"Montserrat"} transition={'all .6s ease'} color={'gray.400'}  cursor={'pointer'} fontWeight={500} onClick={() => window.open('https://mumbai.polygonscan.com/')}>&nbsp;https://mumbai.polygonscan.com</Text>.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Flex>
                </Flex>
            </ContentBox>
            {/*<Footer/>*/}
        </Box>
    );
};
