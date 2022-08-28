//Libraries
import { Flex } from '@chakra-ui/react';

/**
*   Este componente marca el area de ancho de la web
*/

export default function ContentBox({...props}) {
    return (
        <Flex flex={1} justifyContent={"center"} bg={props.bg ?? props.backgroundColor ?? "transparent"}>
            <Flex flex={1} direction={"column"} maxW={props.maxW ?? props.maxWidth ?? "1280px"} px={{base: "10px", md: "16px"}} {...props} bg={props.innerBg ?? props.innerBackgroundColor ?? "transparent"}>
                {props.children}
            </Flex>
        </Flex>
    );
};
