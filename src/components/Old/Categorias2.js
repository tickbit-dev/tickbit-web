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

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  /*<div
		className={className}
		style={{ ...style, display: "block", background: "red" }}
		onClick={onClick}
	  />*/
	  <Flex
		w={Dimensions.slider.arrow.size + "px"}
		h={Dimensions.slider.arrow.size + "px"}
		bg={"black"}
		borderRadius={"full"}
		boxShadow={"xl"}
		onClick={onClick}
		position={"relative"}
		ml={"-" + Dimensions.slider.arrow.size/2 + "px"}
		alignItems={"center"}
		justifyContent={"center"}
	  >
		  <FiArrowRight color='white' size={"20px"}/>
	  </Flex>
	);
  }
  
  function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
	  /*<div
		className={className}
		style={{ ...style, display: "block", background: "green" }}
		onClick={onClick}
	  />*/
	  <Flex
		w={Dimensions.slider.arrow.size + "px"}
		h={Dimensions.slider.arrow.size + "px"}
		bg={"black"}
		borderRadius={"full"}
		boxShadow={"lg"}
		onClick={onClick}
		ml={Dimensions.slider.arrow.size/2 + "px"}
		alignItems={"center"}
		justifyContent={"center"}
	  >
	  	<FiArrowLeft color='white' size={"20px"}/>
	  </Flex>
	);
}

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
		nextArrow: <Flex direction={"row"} position={"absolute"} top={"25%"} zIndex={1}><SampleNextArrow /></Flex>,
		prevArrow: <Flex direction={"row"} position={"absolute"} top={"25%"} zIndex={1}><SamplePrevArrow /></Flex>,
		responsive: [
		  {
			breakpoint: 1280,
			settings: {
			  slidesToShow: 3,
			  slidesToScroll: 3,
			}
		  },
		  {
			breakpoint: 600,
			settings: {
			  slidesToShow: 2,
			  slidesToScroll: 2,
			  initialSlide: 2
			}
		  },
		  {
			breakpoint: 480,
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1
			}
		  }
		]
	};

	const ALTURA_TICKET = 320;

	return (
		<Flex position={"relative"} w={{base: width - (Dimensions.general.padding.base * 2) + "px", md: width - (Dimensions.general.padding.md * 2) + "px", 'full': 'full'}} h={ALTURA_TICKET + 20 + "px"} direction={"column"} pt={"16px"} bg={"blue"}>
			{/*<Box position={"absolute"} right={0} zIndex={1} w='50px' h={ALTURA_TICKET + 30} bgGradient='linear(to-l, #FFFFFF, transparent)' />
			<Box position={"absolute"} left={0} zIndex={1} w='50px' h={ALTURA_TICKET + 30} bgGradient='linear(to-l, transparent, #FFFFFF)' />*/}
			<Slider {...settings}>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
				<Flex>
					<TicketCard
						titulo={"Aitana"}
						imagen={IMAGEN_AITANA}
						fecha={"7 de marzo - 16 de marzo"}
						sitio={"Barcelona, Palau Sant Jordi"}
						url={"/eventos/aitana"}
					/>
				</Flex>
			</Slider>
		</Flex>
	);
};
