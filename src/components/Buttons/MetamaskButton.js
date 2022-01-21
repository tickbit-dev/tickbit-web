import { Box, Image, Text } from '@chakra-ui/react';

import MetamaskLogo from "../../assets/metamask_logo.webp"

const BORDER_RADIUS = "6px";

export default function MetamaskButton({...props}) {
    return(
        <Box
            d="flex"
            as="button"
            pl={"12px"}
            pr={"14px"}
            pt={"8px"}
            pb={"8px"}
            borderRadius={BORDER_RADIUS}
            borderWidth={"1px"}
            alignItems={"center"}
            justifyContent={"center"}
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            _hover={{ bg: '#ebedf0' }}
            _active={{
                bg: '#dddfe2',
                borderColor: '#bec3c9',
            }}
            _focus={{
                boxShadow:
                  '0 0 1px 3px rgba(64, 153, 255, 0.6), 0 1px 1px rgba(0, 0, 0, .15)',
            }}
            overflow={"hidden"}
        >
            <Image h="24px" pr="12px" src={MetamaskLogo}/>
            <Text fontSize={"sm"} fontWeight={"medium"}>Conecta con Metamask</Text>
        </Box>
    )
}