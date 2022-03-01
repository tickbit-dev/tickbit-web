import { useState, useEffect } from 'react';
import { Box, Flex, Text, Button,Heading, Center, Image, useBreakpointValue,Select } from '@chakra-ui/react';
import Portada from '../components/Portada';
import Colors from '../constants/Colors';

  

  
export default function Asientoscard({...props}) {


    const [num_entradas, setnum_entradas] = useState('');
    
    useEffect(() => console.log(num_entradas), [num_entradas]);
    return (
        <Flex h={{base:220,md:220, lg:150}}  mt={2.5} mb={2.5}  backgroundColor={Colors.secondary.gray} rounded={20} _hover={{ backgroundColor: "#e1e3ed"}}direction={{base:"column", md:"row"}} >
            <Flex  margin={"auto"}  flex={{base:0.4,md:0.4}}>
                <Flex  display={"column"}  ml={5} mt={{base:5,md:0}} >
                    <Text  fontFamily={'Montserrat'} fontWeight={'bold'}  fontSize={"xl"} textAlign={"left"} >{props.zona}</Text>
                    <Text  fontFamily={'Montserrat'}  fontSize={"xl"} textAlign={"left"} textOverflow={"elipsis"} >Jueves, 9 jun 2022, 18:00-0:00</Text>
            </Flex>
            </Flex>
            <Flex flex={{base:0.3,md:0.2}}>
                <Select  onChange={(e) => setnum_entradas((e.target.value))} variant='outline' placeholder='nº' w={20} margin={"auto"} backgroundColor={"white"} _focus={{ boxShadow:"0 0 0px 0px " + Colors.primary.white + ", 0 0px 0px " + Colors.primary.white,}} >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    
                </Select>
            </Flex>
            <Flex paddingTop={{base:0,md:7}}  flex={{base:0.3,md:0.3}} marginTop={"auto"} marginBottom={{base:2,md:"auto"}} direction={"column"} >
                     <Flex   as={"button"}  margin={"auto"}  height='50px' width='100px' borderRadius={20}  backgroundColor='black' color='white' _hover={{backgroundColor: "#333333"}}>
                        <Text margin={"auto"}  color={"white"} fontWeight={"bold"} fontFamily={"Montserrat"} fontSize={14}>Comprar</Text>
                    </Flex>     
                    <Text margin={"auto"}  color={"black"} fontWeight={"bold"} fontFamily={"Montserrat"} mt={2} fontSize={14}>78€/entrada</Text>        
            </Flex>
             
                
        </Flex>
        
        );
    };
   {/*     const handleSelect=(e)=>{
        console.log("Hola");
        setnum_entradas((e.target.value));
        console.log(num_entradas);
      }

   */}     