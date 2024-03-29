//Libraries
import { useEffect, useState } from 'react';
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
import MyTicketsPage from './pages/MyTicketsPage';
import EventsListPage from './pages/EventsListPage';
import Data from './data/Data';



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
	const [isOwner, setIsOwner] = useState('');
	const [isConnected, setIsConnected] = useState(null);
	const [currentAccount, setCurrentAccount] = useState('');

	useEffect(() => {
		if(Cookies.get("cookies")){
			//console.log("Renewed cookies")
			Cookies.set("cookies", true, {expires: 9999, sameSite: 'None', secure: true});
		}
    }, []);

	function checkIsMetamaskInstalled() {
        return typeof window.ethereum !== 'undefined'
    }

	function checkConnection() {
		if(checkIsMetamaskInstalled()){
			window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
		}
  	}
  
	function handleAccountsChanged(accounts) {
		if (accounts.length === 0) {
			setIsConnected(false)
			setCurrentAccount('')
		} else {
			console.log("Conectado")
			setIsConnected(true)
			console.log("[0]", accounts[0])
			console.log("Data.ownerAddress", Data.ownerAddress)
			if(String(accounts[0]).toLowerCase() == String(Data.ownerAddress).toLowerCase()){
				setIsOwner(true)
			}
			setCurrentAccount(accounts[0])
		}
	}

	useEffect(() => {
		checkConnection();
	}, []);


	return (
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage/>} />
					<Route path="/event/:eventId" element={<EventDetailsPage/>} />
					<Route path="/help" element={<HelpPage/>} />
					<Route path="/contact" element={<ContactPage/>} />
					<Route path="/about" element={<AboutUsPage/>} />
					<Route path="/tickets" isOwner={isOwner} currentAccount={currentAccount} element={<MyTicketsPage/>} />
					<Route path="/events" element={<EventsListPage/>} />
				</Routes>
			</BrowserRouter>
			{!Cookies.get("cookies") ?
				<CookiesBar/>
			: null}
		</ChakraProvider>
	);
}

export default App;
