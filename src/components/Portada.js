import { Flex, Text, Box , Image} from '@chakra-ui/react';


export default function Portada({...props}) {
    return (
        
        <Image w={'100%'} h={'310px'}  borderRadius={'30px'} mb={'30px'} fit={'cover'} {...props}>

        </Image>
        );
    };