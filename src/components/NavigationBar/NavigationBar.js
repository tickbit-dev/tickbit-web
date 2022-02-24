//Libraries
import { Box, Flex, Text, Image, IconButton, Button, Stack, Collapse, Icon, Link, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, AddIcon } from '@chakra-ui/icons';
import { useLocation } from "react-router-dom";

import Logo from "../../assets/logo.webp"
import MetamaskButton from '../Buttons/MetamaskButton';
import Colors from '../../constants/Colors';

import ContentBox from '../Utils/ContentBox'

export default function NavigationBar({...props}) {

    const { isOpen, onToggle } = useDisclosure();
    let location = useLocation();

    return (
        <ContentBox>
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                align={'center'}
                pt={"16px"}
                pb={"16px"}
            >
                <Flex
                    flex={{ base: undefined, md: 'auto' }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        borderWidth={"1px"}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }} alignItems={"center"}>
                    <Box d="flex" alignItems={"center"} as="button" onClick={() => window.open("/","_self")} style={{webkitTapHighlightColor: "transparent"}}>
                      <Image w={{base: "28px", md: "30px"}} ml={{base: "16px", md: "0px"}} src={Logo}/>
                      <Text fontFamily={"Montserrat"} fontWeight={800} color={Colors.text.title} ml="10px" display={{ base: 'none', md: 'flex' }}>Tickbit</Text>
                    </Box>

                    <Flex display={{base: 'none', md: 'flex'}} h={"30px"} w={"1px"} bg={Colors.secondary.grayHover} ml={"30px"} mr={"30px"}/>

                    <Flex display={{ base: 'none', md: 'flex' }} alignItems={"center"}>
                        <DesktopNav location={location}/>
                    </Flex>
                </Flex>

                <Stack
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >
                    <MetamaskButton/>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </ContentBox>
    )
}

function DesktopNav({...props}) {
    const linkColor = useColorModeValue('gray.400', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={6}>
        {NAV_ITEMS.map((navItem) => (
          <Flex key={navItem.label} alignItems="center">
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  fontFamily={"Montserrat"}
                  href={navItem.href ?? '#'}
                  fontSize={'sm'}
				          fontWeight={"medium"}
                  color={linkColor}
				          borderRadius={"5px"}
                  transition={'all .6s ease'}
                  _hover={{
                    textDecoration: 'none',
                    color: "black",
                  }}
                  _focus={{boxShadow:'0 0 0px 0px rgba(0, 0, 0, 0)'}}
                  style={{webkitTapHighlightColor: "transparent"}}
                >
                    <Box d={"flex"} flexDirection={"column"} alignItems={"center"} px={"10px"}>
                      <Text fontWeight={props.location.pathname == navItem.href ? "bold" : "none"} color={props.location.pathname == navItem.href ? "black" : "none"} mt={props.location.pathname == navItem.href ? "4px" : "0px"}>{navItem.label}</Text>
                      {props.location.pathname == navItem.href ? <Box w={"16px"} h={"2px"} bg={"black"} mt={"4px"}></Box> : null}
                    </Box>
                </Link>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Flex>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
			        fontFamily={"Montserrat"} 
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={"semibold"}>
              {label}
            </Text>
            <Text fontFamily={"Montserrat"} fontWeight={"medium"} fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
		  	fontFamily={"Montserrat"} 
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  const NAV_ITEMS = [
    {
        label: 'Inicio',
        href: '/',
    },
    {
        label: 'Contacto',
        href: '/contact',
    },
    {
        label: 'Sobre nosotros',
        href: '/about',
    },
  ];