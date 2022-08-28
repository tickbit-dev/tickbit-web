import { Flex, Text, Box , Image, Skeleton} from '@chakra-ui/react';
import Colors from '../constants/Colors';

const BORDER_RADIUS = {base: '20px', md: '30px'}

export default function Portada({...props}) {
    return (
        props.eventid != undefined || props.isLoaded == false ?
            <Flex p={{base: "10px", md: "16px"}} mb={'10px'}>
                <Skeleton isLoaded={props.isLoaded} w={'100%'} borderRadius={BORDER_RADIUS} startColor={Colors.secondary.gray} endColor={"#d3d6e6"}>
                    <Flex
                        as={"button"}
                        w={'100%'}
                        h={{base: '200px', md: '310px'}}
                        overflow={"hidden"}
                        borderRadius={BORDER_RADIUS}
                        /*_hover={{
                            base: {transform: 'scale(1.01)'}, 
                            md: {transform: 'scale(1.004)'}
                        }}*/
                        transition="all .6s ease"
                        onClick={() => window.open("/event/" + props.eventid,"_self")}
                        style={{WebkitTapHighlightColor: "transparent"}}
                        {...props}
                    >
                        {props.image ? <Image _hover={{base: {transform: 'scale(1.01)'}, md: {transform: 'scale(1.004)'}}} bg={Colors.secondary.gray} transition="all .6s ease" w={"full"} h={{base: '200px', md: '310px'}} fit={'cover'} src={props.image}/> : null}
                    </Flex>
                </Skeleton>
            </Flex>
        : null
    );
};