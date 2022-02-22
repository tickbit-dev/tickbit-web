import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import useWindowDimensions from './Utils/useWindowDimensions';
import Dimensions from '../constants/Dimensions';
import TicketCard from './TicketCard2';
import { BsFileX } from 'react-icons/bs';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

//Imágenes
import IMAGEN_AITANA from "../assets/aitana.jpg"
import IMAGEN_DADDY_YANKEE from "../assets/dy.jpg"
import IMAGEN_ESTOPA from "../assets/estopa.jpg"
import IMAGEN_CTANGANA from "../assets/ctangana.jpg"
import IMAGEN_MELENDI from "../assets/melendi.jpg"

export default function Categorias({...props}) {

	const [state, setState] = useState();
	const { height, width } = useWindowDimensions();

	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		initialSlide: 0,
		swipeToSlide: false,
		responsive: [
		  {
			breakpoint: 1180,
			settings: {
			  slidesToShow: 4,
			  slidesToScroll: 4,
			}
		  },
		  {
			breakpoint: 980,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  //initialSlide: 2
			}
		  },
		  {
			breakpoint: 780,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2
			}
		  },
		  {
			breakpoint: 580,
			settings: {
			  slidesToShow: 1.25,
			  slidesToScroll: 0.875
			}
		  }
		]
	};

	const ALTURA_TICKET = 320;

	return (
		<Box w={{base: width - (Dimensions.general.padding.base * 2) + "px", md: width - (Dimensions.general.padding.md * 2) + "px", 'full': '100%'}}>
        	<Slider {...settings}>
				<Box>
					<TicketCard 
						pl={"5px"} pr={"5px"}
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>				
				</Box>
				<Box>
					<TicketCard 
						pl={"5px"} pr={"5px"}
						titulo={"C Tangana"}
						imagen={IMAGEN_CTANGANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>	
				</Box>
				<Box>
					<TicketCard 
						pl={"5px"} pr={"5px"}
						titulo={"Melendi"}
						imagen={IMAGEN_MELENDI}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>	
				</Box>
				<Box pl={"5px"} pr={"5px"}>
				<TicketCard/>
				</Box>
				<Box pl={"5px"} pr={"5px"}>
				<TicketCard/>
				</Box>
				<Box pl={"5px"} pr={"5px"}>
					<TicketCard/>
				</Box>
				<Box pl={"5px"} pr={"5px"}>
				<TicketCard/>
				</Box>
				<Box pl={"5px"} pr={"5px"}>
				<TicketCard/>
				</Box>
		  	</Slider>
	    </Box>
	);
};
