//Libraries
import { useState, useEffect } from 'react';
import { Box, Text, Flex, Input, Select, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';

//Components and Screens
import NavigationBar from '../components/NavigationBar/NavigationBar';
import ContentBox from '../components/Utils/ContentBox';
import Footer from '../components/Footer';
import TicketCard from '../components/TicketCard2';
import { useLocation } from 'react-router-dom';
import { cutIntervalDate, getEventsListFromBlockchain, getVenueById } from '../utils/funcionesComunes';
import { FiSearch } from 'react-icons/fi';
import Colors from '../constants/Colors';

//Constants

export default function EventsListPage({...props}) {
    const [initialEvents, setInitialEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [staticEvents, setStaticEvents] = useState([]);
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [isLoaded, setIsLoaded] = useState(null);

    const [onUpdateColor, setOnUpdateColor] = useState(null);

    async function getData(){
        const events_list = await getEventsListFromBlockchain(true);
        events_list.sort((a, b) => {return a.initialDate - b.initialDate;})
        setEvents(events_list);
        setInitialEvents(events_list);
        setStaticEvents(events_list);
        setIsLoaded(true);
    }

    function applySearchFilter(word, list, category, city){
       var palabra = word.replace('+',' ');
     
        setSearchValue(palabra);
        onChangeTextSearch(palabra);
        
        /*if(word.length == 0){
            setEvents(staticEvents);
            return
        }*/

        let newItems = [];

                for(let item of list){
                    
                    if(item.title.toLowerCase().includes(palabra.toLowerCase())){
                        if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
                    }
                    if(item.artist.toLowerCase().includes(palabra.toLowerCase())){
                        if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
                    }
                    if(getVenueById(item.idVenue).name.toLowerCase().includes(palabra.toLowerCase())){
                        if(!newItems.some(ev => ev._id == item._id)) newItems.push(item);
                    }
                }
 
                /*if(category != '' && city != ''){
                    if(item.idCategory != category || item.idCity != city){
                        newItems.pop();
                    }
                }
                
                 ||
                    else if(category != ''){
                        if(item.idCategory != category){
                            newItems.pop();
                            
                        }
                    }

                   else if(city != ''){
                        if(item.idCity != city){
                            newItems.pop();    
                        }
                    } */
                
       

        setEvents(newItems);
        setOnUpdateColor(Math.floor(Math.random() * 999999999999999999999999999)); //!important
        
    }

   

    const onChangeTextSearch = (event) => {
        if(event.length == 0){
          window.history.replaceState({}, '', location.pathname)
          setSearchValue('')
        } else{
          window.history.replaceState({}, undefined, location.pathname + "?search=" + event.replace(" ", "+"))
          setSearchValue(event.replace(" ", "+"))
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

      useEffect(() => {
        applySearchFilter(searchValue, initialEvents);
    }, [searchValue]);

    return (
        <Box>
            <NavigationBar/>
            <ContentBox  >
                
                <Flex w={'80%'} h={{base:'180x',md:'120px'}} boxShadow={'lg'} rounded={'xl'} ml={'auto'} mr={'auto'} backgroundColor={'#FBFBFC'} p='6' mt={10} alignItems={'center'} direction={{base:'column',md:'row'}}>
                    <Input placeholder='Buscar' size='lg' backgroundColor={'white'}w={'100%'}  _focus={{boxShadow: "0 0 0px 0px" + Colors.secondary.grayHover}} onChange={(e) => {setOnUpdateColor(Math.floor(Math.random() * 999999999999999999999999999)) /*!important*/; setSearchValue(e.target.value)}}/>
                </Flex>
                {events.length == 0 ?
                    <Flex p={4} justifyContent={"center"} w={'100%'} mt={10} >
                        <FiSearch />
                        <Text ml={'10px'} >No se han encontrado resultados.</Text>
                    </Flex>
                :
                    <Wrap justify={{base: 'center', 'full': 'left'}} mt={10}>
                        {events.map((event, index) => (
                            <WrapItem>
                                <TicketCard 
                                    key={"ticketcard" + index}
                                    updateColor={onUpdateColor}
                                    index={index}
                                    titulo={event.title}
                                    imagen={event.coverImageUrl}
                                    fecha={cutIntervalDate(event.initialDate) + ' ' + '-' + ' ' + cutIntervalDate(event.finalDate)}
                                    sitio={getVenueById(event.idVenue).name}
                                    url={"/event/" + event._id}
                                    isLoaded={isLoaded}
                                />
                            </WrapItem>
                        ))}
                    </Wrap>
                }
            </ContentBox>
            <Box >
                <Footer/>
            </Box>
        </Box>
    );
};
