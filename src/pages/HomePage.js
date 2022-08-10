//Libraries
import { Box, Flex, Text } from '@chakra-ui/react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import MyCalendar from '../components/MyCalendar';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import TicketCard from '../components/TicketCard';
import TitleHighlighted from '../components/TitleHighlighted';
import Colors from '../constants/Colors';

import IMAGEN_AITANA from "../assets/aitana.jpg"
import IMAGEN_DADDY_YANKEE from "../assets/dy.jpg"
import IMAGEN_ESTOPA from "../assets/estopa.jpg"
import IMAGEN_CTANGANA from "../assets/ctangana.jpg"
import ContentBox from '../components/Utils/ContentBox';
import Buscador from '../components/Buscador';
import Categorias from '../components/Categorias2';
import Portada from '../components/Portada';
import Footer from '../components/Footer';
import ProximosEventos from '../components/ProximosEventos';
import DestacadosEventos from '../components/DestacadosEventos';


export default function HomePage() {
    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [frontPageEvent, setFrontPageEvent] = useState({});

    /*async function readCurrentCampaigns() {
        const WEEK_DAY = new Date().getDay() > 0 ? new Date().getDay() - 1 : 6;
        const NOW_DATE = moment(new Date()).subtract(WEEK_DAY, 'days').format('YYYY-MM-DD');

        const provider = new ethers.providers.JsonRpcProvider(RPC_URL_PROCIVER)
        const contract = new ethers.Contract(contractAddress, Tickbit.abi, provider)
    
        const data = await contract.getCurrentCampaigns(moment(NOW_DATE).unix());
        const item_data = await Promise.all(data);

        let itemsArray = [];

        for (let item of item_data) {
            itemsArray.push(
                newCampaign(
                    item[0], item[1].toNumber(), item[2].toNumber(), item[3].toNumber(), item[4], item[5], item[6], item[7]
                )
            );
        }

        return itemsArray;
    }

    async function getData(){
        var event = null;

        const items_list = await readCurrentCampaigns();

        for (let item of items_list) {
            if(item.idType == 1){
                event = await readEventbyId(item.eventId, false);
            }
        }

        setCampaigns(items_list);
        setFrontPageEvent(event)
        setIsLoaded(true)
    }

    useEffect(() => {
        getData();
        //readCurrentCampaigns()
    }, []);*/
    
    return (
        <Box maxW={"100%"} overflow={"hidden"}>
           <NavigationBar/>
            
            <ContentBox>
                
                <Buscador/>

                <Portada 
                    //src={'https://c8.alamy.com/zoomses/9/984bb3c4eae3444e9d3433d1d59470c7/2eg06b6.jpg'}
                    image={"https://www.baccredomatic.com/sites/default/files/2022-02/GT-MOMENTOS-BANNER-BAD-BUNNY-CONCIERTO-070222_0.jpg"}
                    eventId={1}
                />

                {/*<TitleHighlighted
                    text={"Categorías"}
                />*/}
                {/*<Text fontWeight={"bold"} fontFamily={"Montserrat"} mb={"16px"} color={"black"}>Categorías</Text>*/}

                {/*<Categorias/>*/}
                {/*<Categorias/>*/}

                <Flex direction={'row'} mb={'20px'} mt={"20px"}  justifyContent={'space-between'} > 
                    <TitleHighlighted
                        text={"Eventos destacados"}
                        highlightColor={Colors.primary.skyblue + '55'}
                        mb={'20px'}
                    />
                    <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events/featured')}>Ver más</Text>
                </Flex> 

                <DestacadosEventos/>

                 <Flex direction={'row'} mb={'20px'} mt={"20px"} justifyContent={'space-between'} > 
                    <TitleHighlighted
                        text={"Próximos eventos"}
                        highlightColor={Colors.primary.pink + '55'}
                        mb={'20px'}
                    />
                    <Text fontWeight={'bold'} textDecoration={'underline'}  mb={'auto'} mt={'auto'} cursor={'pointer'} onClick={() => navigate('/events')}>Ver más</Text>
                </Flex> 

                <ProximosEventos/>

            </ContentBox>

            <Footer/>
        </Box>
    )
}