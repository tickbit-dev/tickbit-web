//Libraries
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import CookiesBar from './components/CookiesBar';
import Cookies from 'js-cookie';

//Screens
import HomePage from './pages/HomePage';

function App() {

	useEffect(() => {
		if(Cookies.get("cookies")){
			console.log("Renew cookies")
			Cookies.set("cookies", true, {expires: 9999});
		}
    }, []);

	return (
		<ChakraProvider>
			<HomePage/>
			{!Cookies.get("cookies") ?
				<CookiesBar/>
			: null}
		</ChakraProvider>
	);
}

export default App;
