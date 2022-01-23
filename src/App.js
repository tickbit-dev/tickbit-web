//Libraries
import { ChakraProvider } from '@chakra-ui/react'

//Screens
import HomePage from './pages/HomePage';

function App() {
	return (
		<ChakraProvider>
			<HomePage/>
		</ChakraProvider>
	);
}

export default App;
