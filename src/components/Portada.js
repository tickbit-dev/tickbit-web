import { Flex, Text, Box , Image} from '@chakra-ui/react';
import Colors from '../constants/Colors';


export default function Portada({...props}) {
    return (
        <Flex as={"button"} w={'100%'} h={'310px'} borderRadius={'30px'} overflow={"hidden"} bg={Colors.secondary.gray} _hover={{base: {transform: 'scale(1.01)'}, md: {transform: 'scale(1.004)'}}} mb={'30px'} transition="all .6s ease" onClick={() => window.open(props.url,"_self")} style={{webkitTapHighlightColor: "transparent"}} {...props}>
            {props.image ? <Image w={"full"} h={"full"} fit={'cover'} src={props.image}/> : null}
        </Flex>
    );
};