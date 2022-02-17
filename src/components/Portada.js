import { Flex, Text, Box} from '@chakra-ui/react';


export default function Portada({...props}) {
    return (
        
        <Box w={'100%'} h={'310px'}  borderRadius={'30px'} style={{backgroundImage: `url(${props.imagen})`}} mb={'30px'}>

        </Box>
        );
    };