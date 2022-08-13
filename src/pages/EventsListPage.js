//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Input, Select, SimpleGrid } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import TicketCard from '../components/TicketCard2';
import { useLocation } from 'react-router-dom';
import { cutIntervalDate, getEventsListFromBlockchain, getVenueById } from '../utils/funcionesComunes';
import { FiSearch } from 'react-icons/fi';

//Constants

export default function EventsListPage({...props}) {
    const [initialEvents, setInitialEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [staticEvents, setStaticEvents] = useState([]);
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');

    async function getData(){

        const events_list = await getEventsListFromBlockchain(true);
        setEvents(events_list);
        setInitialEvents(events_list);
        setStaticEvents(events_list);
    }

    function applySearchFilter(word, list){
        setSearchValue(word.target.value);
        onChangeTextSearch(word);
        
        if(word.target.value.length == 0){
            setEvents(staticEvents);
            return
        }

        setEvents(list ?? initialEvents);
        
        let newItems = [];

        for(let item of list ?? initialEvents){
            if(item._id == parseInt(word.target.value)){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item.title.toLowerCase().includes(word.target.value.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(item.artist.toLowerCase().includes(word.target.value.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            if(getVenueById(item.idVenue).name.toLowerCase().includes(word.target.value.toLowerCase())){
                if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
            }
            
       
        }

        setEvents(newItems);
    }

    function OrderBy(value){
        if (value == 1){
            events.sort((a, b) => {return a.initialDate - b.initialDate;})
        }

        else if (value == 2){

        }
        
        else if (value == 3){
            
        }
        
        else if (value == 4){
            
        }

    }

    const onChangeTextSearch = (event) => {
        if(event.target.value.length == 0){
          window.history.replaceState({}, '', location.pathname)
          setSearchValue('')
        } else{
          window.history.replaceState({}, undefined, location.pathname + "?search=" + event.target.value.replace(" ", "+"))
          setSearchValue(event.target.value.replace(" ", "+"))
        }
      }
    
    const [state, setState] = useState();

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if(searchValue.length == 0){
          window.history.replaceState({}, '', location.pathname)
        }
      }, []);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox  >
                
                <Flex w={'80%'} h={{base:'180x',md:'120px'}} boxShadow={'lg'} rounded={'xl'} ml={'auto'} mr={'auto'} backgroundColor={'#FBFBFC'} p='6' mt={10} alignItems={'center'} direction={{base:'column',md:'row'}}>
                    <Input placeholder='Buscar' size='lg' backgroundColor={'white'}w={{base:'100%',md:'70%'}} onChange={(e) => applySearchFilter(e,events)}/>
                    <Select placeholder='Ordenar por' size='lg' backgroundColor={'white'} w={{base:'100%',md:'30%'}} ml={{base:0, md:5}} mt={{base:5, md:0}} onChange = {(e) => OrderBy(e.target.value) }>
                        <option value='1'>Fecha</option>
                        <option value='2'>Precio</option>
                    </Select>
                </Flex>
                {events.length == 0 ?
                 <Flex p={4} justifyContent={"center"} w={'100%'} mt={10} >
                    <FiSearch />
                    <Text ml={'10px'} >No se han encontrado resultados para "{searchValue}".</Text>
                </Flex>
                :
                <SimpleGrid w={'95%'} ml={'auto'} mr={'auto'}  columns={{base:1,sm: 2, md: 3, lg:3, xl:4}} spacing={0} spacingY={5} mt={20} justifyItems={'center'}>
                       
                    {events.map((event, index) => (
                            <TicketCard 
                                key={"ticketcard" + index}
                                index={index}
                                titulo={event.title}
                                imagen={event.coverImageUrl}
                                fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                                sitio={getVenueById(event.idVenue).name}
                                url={"/event/" + event._id}
                            />
                            
                        ))}
                       
                </SimpleGrid>
                }
            </ContentBox>


            <Box >
                <Footer/>
            </Box>
        </Box>
    );
};
