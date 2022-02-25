//Libraries
import { useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import CookiesBar from './components/CookiesBar';
import Cookies from 'js-cookie';
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Routes, Route, BrowserRouter } from "react-router-dom";

//Screens
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';

import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import HelpPage from './pages/HelpPage';



const breakpoints = createBreakpoints({
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
	'2xl': '96em',
	'full': '1280px'
})

const theme = extendTheme({
	breakpoints,
	components: {
		Steps,
	  }, })

function App() {

	useEffect(() => {
		if(Cookies.get("cookies")){
			console.log("Renew cookies")
			Cookies.set("cookies", true, {expires: 9999});
		}
    }, []);


	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage/>} />
					<Route path="/event/:idEvent" element={<EventDetailsPage/>} />
					<Route path="/help" element={<HelpPage/>} />
					<Route path="/contact" element={<ContactPage/>} />
					<Route path="/about" element={<AboutUsPage/>} />
				</Routes>
			</BrowserRouter>
			{!Cookies.get("cookies") ?
				<CookiesBar/>
			: null}
		</ChakraProvider>
	);
}

export default App;
