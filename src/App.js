//Libraries
import { ChakraProvider } from '@chakra-ui/react'

//Screens
import HomeScreen from './screens/HomeScreen';

function App() {
	return (
		<ChakraProvider>
			<HomeScreen/>
		</ChakraProvider>
	);
}

export default App;
