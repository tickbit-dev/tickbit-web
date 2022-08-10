//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Input, Select, SimpleGrid } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import TicketCard from '../components/TicketCard';

//Constants

export default function EventsListPage({...props}) {

    const [state, setState] = useState();

    useEffect(() => {
    }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox>
                
            <Flex w={'80%'} h={{base:'180x',md:'120px'}} boxShadow={'lg'} rounded={'xl'} ml={'auto'} mr={'auto'} backgroundColor={'#FBFBFC'} p='6' mt={10} alignItems={'center'} direction={{base:'column',md:'row'}}>
                <Input placeholder='Buscar' size='lg' backgroundColor={'white'}w={{base:'100%',md:'70%'}} />
                <Select placeholder='Ordenar por' size='lg' backgroundColor={'white'} w={{base:'100%',md:'30%'}} ml={{base:0, md:5}} mt={{base:5, md:0}}>
                    <option value='fecha'>Fecha</option>
                    <option value='precio'>Precio</option>
                </Select>
            </Flex>
            <SimpleGrid columns={{base:1,sm: 2, md: 3, lg:4}} spacing={10} mt={20} justifyItems={'center'}>
                <TicketCard 
                        
                        titulo={'Hola'}
                        imagen={'https://www.cadenadial.com/wp-content/uploads/2021/11/MELENDI-BLANCO-1-e1638200182474.jpg'}
                        fecha={'10/10/2022'}
                        sitio={'Palau Sant jordi'}
                        url={"/eventos/aitana"}
                    />

<TicketCard 
                       
                        titulo={'Hola'}
                        imagen={'https://www.cadenadial.com/wp-content/uploads/2021/11/MELENDI-BLANCO-1-e1638200182474.jpg'}
                        fecha={'10/10/2022'}
                        sitio={'Palau Sant jordi'}
                        url={"/eventos/aitana"}
                    />

<TicketCard 
                        
                        titulo={'Hola'}
                        imagen={'https://www.cadenadial.com/wp-content/uploads/2021/11/MELENDI-BLANCO-1-e1638200182474.jpg'}
                        fecha={'10/10/2022'}
                        sitio={'Palau Sant jordi'}
                        url={"/eventos/aitana"}
                    />
                                    <TicketCard 
                       
                        titulo={'Hola'}
                        imagen={'https://www.cadenadial.com/wp-content/uploads/2021/11/MELENDI-BLANCO-1-e1638200182474.jpg'}
                        fecha={'10/10/2022'}
                        sitio={'Palau Sant jordi'}
                        url={"/eventos/aitana"}
                    />
                                    <TicketCard 
                       
                        titulo={'Hola'}
                        imagen={'https://www.cadenadial.com/wp-content/uploads/2021/11/MELENDI-BLANCO-1-e1638200182474.jpg'}
                        fecha={'10/10/2022'}
                        sitio={'Palau Sant jordi'}
                        url={"/eventos/aitana"}
                    />
            </SimpleGrid>
            </ContentBox>


            <Box >
                <Footer/>
            </Box>
        </Box>
    );
};
