'use client';

import React from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Icon,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PhoneIcon, SparklesIcon } from 'lucide-react';
import { GoPeople } from 'react-icons/go';
import Link from "next/link";

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

export const HeroSection = () => {
    return (
        <Box position="relative" minH={{ base: '140vh', md: '100vh' }}>
            <VStack gap={{ base: 2, md: 3 }} mt={{ base: 6, md: 12 }} position="relative" zIndex={2}>
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        w={{ base: 16, md: 24 }}
                        src="logo-header.png"
                        alt="Clipify Logo"
                    />
                </MotionBox>
                <MotionBox
                    display={{ base: 'block', md: 'none' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <HStack
                        mt="4"
                        gap={2}
                        bg="white"
                        px={4}
                        py={2}
                        borderRadius="full"
                        border="2px solid"
                        borderColor="gray.100"
                        boxShadow="0 4px 16px rgba(0,0,0,0.08)"
                    >
                        <Box position="relative">
                            <Box w="8px" h="8px" borderRadius="full" bg="red.500" />
                            <Box
                                asChild
                                position="absolute"
                                top="0"
                                left="0"
                                w="8px"
                                h="8px"
                                borderRadius="full"
                                bg="red.500"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 2, 2],
                                        opacity: [0.8, 0, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </Box>
                        </Box>
                        <Text fontSize="xs" fontWeight="700" color="gray.900">
                            5 aktivnih kampanja
                        </Text>
                    </HStack>
                </MotionBox>
            </VStack>

            <Box position="absolute" inset={0} pointerEvents="none" />

            <Box
                position="absolute"
                top={{ base: '38%', md: '45%' }}
                left="50%"
                transform="translate(-50%, -50%)"
                w="full"
                zIndex={1}
            >
                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    <VStack gap={{ base: 10, md: 8 }} textAlign="center" maxW="5xl" mx="auto">
                        <Box whiteSpace="nowrap">
                            <MotionText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                fontSize={{ base: '36px', sm: '48px', md: '64px', lg: '84px' }}
                                fontWeight="500"
                                fontFamily="var(--font-montserrat)"
                                lineHeight={1.1}
                                color="black"
                                letterSpacing="-0.02em"
                                mb={1}
                            >
                                Otključaj <br />
                            </MotionText>

                            <MotionText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                fontSize={{ base: '42px', sm: '56px', md: '72px', lg: '96px' }}
                                fontWeight="600"
                                fontFamily="var(--font-montserrat)"
                                lineHeight={1.1}
                                letterSpacing="-0.02em"
                                display="inline-block"
                                position="relative"
                            >
                                <Box
                                    as="span"
                                    position="relative"
                                    zIndex={1}
                                    color="black"
                                    px={{ base: 2, md: 4 }}
                                    bgGradient='linear(to-r, rgba(252, 165, 165, 0.9), rgba(252, 165, 165, 0.5), rgba(252, 165, 165, 0.2), rgba(252, 165, 165, 0.0))'
                                    borderLeft="8px"
                                    borderColor="red.500"
                                >
                                    Pun Potencijal
                                </Box>
                            </MotionText>
                            <MotionText
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                fontSize={{ base: '36px', sm: '44px', md: '64px', lg: '84px' }}
                                fontWeight="500"
                                fontFamily="var(--font-montserrat)"
                                lineHeight={1.1}
                                color="black"
                                letterSpacing="-0.02em"
                                mb={{ base: 16, md: 2 }}
                                mt={1}
                            >
                                Tvog Sadržaja
                            </MotionText>
                        </Box>

                        <MotionText
                            display={{ base: 'none', md: 'block' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                            color="gray.600"
                            maxW="3xl"
                            lineHeight={1.7}
                            px={{ base: 2, md: 0 }}
                        >
                            Clipifyy je vodeća performance-based platforma koja pretvara tvoj
                            sadržaj u stotine viralnih kratkih klipova. Poveži se sa mrežom
                            od 600+ pravih kreatora koji šire tvoj brend na svim društvenim
                            mrežama uz
                            <Text as="span" fontWeight="700">
                                {' '}
                                znatno manji trošak od klasičnih reklama.
                            </Text>
                        </MotionText>

                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <HStack gap={4} flexWrap="wrap" justify="center">
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('#kontakt')?.scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                    }}
                                    width={{ base: 'full', md: 'auto' }}
                                    bg="black"
                                    color="white"
                                    px={{ base: 6, md: 10 }}
                                    py={{ base: 6, md: 8 }}
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="600"
                                    borderRadius="full"
                                    _hover={{
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'xl',
                                    }}
                                    transition="all 0.2s"
                                >
                                    <PhoneIcon size={16} style={{ marginRight: '8px' }} />
                                    Zakaži Poziv
                                </Button>
                                <Button
                                    asChild
                                    width={{ base: 'full', md: 'auto' }}
                                    borderColor="black"
                                    bg="white"
                                    color="black"
                                    px={{ base: 6, md: 10 }}
                                    py={{ base: 6, md: 8 }}
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    fontWeight="600"
                                    borderRadius="full"
                                    borderWidth={{ base: '1px', md: '2px' }}
                                    _hover={{
                                        bg: 'black',
                                        color: 'white',
                                        transform: 'translateY(-2px)',
                                    }}
                                    transition="all 0.2s"
                                >
                                    <Link href="/signup">
                                        <GoPeople size={16} style={{ marginRight: '8px' }} />
                                        Zaradi kao kliper
                                    </Link>
                                </Button>
                            </HStack>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.9 },
                                y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            mt={{ base: 0, md: 6 }}
                        >
                            <VStack gap={2}>
                                <Text
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                    color="gray.500"
                                    fontWeight="500"
                                    textTransform="uppercase"
                                    letterSpacing="wider"
                                >
                                    Skroluj
                                </Text>
                                <Box
                                    w="1px"
                                    h={{ base: '40px', md: '50px' }}
                                    bg="gray.300"
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <MotionBox
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        right={0}
                                        h="20px"
                                        bgGradient="linear(to-b, gray.600, transparent)"
                                        animate={{ y: [0, 30, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                </Box>
                            </VStack>
                        </MotionBox>
                    </VStack>
                </Container>
            </Box>

            <Box
                display={{ base: 'block', md: 'none' }}
                position="absolute"
                bottom={{ base: '10vh', md: '15vh' }}
                left="50%"
                transform="translateX(-50%)"
                w="full"
                zIndex={1}
            >
                <Container maxW="7xl" px={{ base: 4, md: 6 }}>
                    <Flex
                        mx="auto"
                        mb="6"
                        w={16}
                        h={16}
                        borderRadius="lg"
                        bg="black"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        align="center"
                        justify="center"
                        flexShrink={0}
                    >
                        <Icon as={SparklesIcon} boxSize="50%" color="white" />
                    </Flex>

                    <MotionText
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                        color="gray.600"
                        maxW="3xl"
                        mx="auto"
                        textAlign="center"
                        lineHeight={1.7}
                        px={{ base: 2, md: 0 }}
                    >
                        Clipify je vodeća performance-based platforma koja pretvara tvoj
                        sadržaj u stotine viralnih kratkih klipova. Poveži se sa mrežom
                        od 600+ pravih kreatora koji šire tvoj brend na svim društvenim
                        mrežama uz
                        <Text as="span" fontWeight="700">
                            {' '}
                            znatno manji trošak od klasičnih reklama.
                        </Text>
                    </MotionText>
                </Container>
            </Box>

            <style jsx>{`
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
            `}</style>
        </Box>
    );
};