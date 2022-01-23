//Libraries
import { ChakraProvider } from '@chakra-ui/react'
import CookiesBar from './components/CookiesBar';
import Cookies from 'js-cookie';

//Screens
import HomePage from './pages/HomePage';

function App() {
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
