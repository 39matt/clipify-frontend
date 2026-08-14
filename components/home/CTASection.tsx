'use client';

import React from 'react';
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    MessageSquare,
    Clock,
    ArrowRight,
    Check,
    Calendar,
    Mail,
} from 'lucide-react';
import { FaDiscord, FaInstagram } from 'react-icons/fa';

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

export const CTASection = () => {
    return (
        <Box
            id="kontakt"
            as="section"
            py={{ base: 20, md: 28 }}
            bg="blackAlpha.900"
            color="white"
            position="relative"
            overflow="hidden"
        >
            {/* Subtle background accents */}
            <Box
                position="absolute"
                top="20%"
                left="-10%"
                w="600px"
                h="600px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(255, 255, 255, 0.02), transparent 70%)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="-10%"
                w="500px"
                h="500px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(255, 255, 255, 0.02), transparent 70%)"
                pointerEvents="none"
            />

            <Container maxW="7xl" position="relative" zIndex={1}>
                <MotionVStack
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    gap={6}
                    textAlign="center"
                    mb={16}
                >
                    <HStack
                        bg="white/5"
                        border="1px solid"
                        borderColor="white/20"
                        borderRadius="full"
                        px={5}
                        py={2}
                        fontSize="sm"
                        color="white"
                        gap={2}
                    >
                        <MessageSquare size={16} />
                        <Text fontWeight="600">Stupite u kontakt</Text>
                    </HStack>

                    <Heading
                        fontSize={{ base: '36px', md: '52px' }}
                        fontWeight="900"
                        lineHeight="1.05"
                        letterSpacing="-0.03em"
                        color="white"
                    >
                        ZAPOČNI SVOJ PUT
                        <Box as="br" display={{ base: 'block', md: 'none' }} />
                        <Box
                            fontSize={{ base: '42px', md: '52px' }}
                            as="span"
                            position="relative"
                            zIndex={1}
                            color="white"
                            pl="2"
                            ml="2"
                            backgroundImage="linear-gradient(to right, rgba(252, 165, 165, 0.9), rgba(252, 165, 165, 0.5), rgba(252, 165, 165, 0.2), transparent)"
                            borderLeft="8px solid"
                            borderColor="red.500"
                        >
                            VIRALNOSTI
                        </Box>
                    </Heading>

                    <Text
                        color="gray.400"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        lineHeight={1.5}
                        display={{ base: 'none', md: 'block' }}
                    >
                        Spremni da pojačate engagement i prodaju na društvenim mrežama kroz
                        strateški organski{' '}
                        <Box as="br" display={{ base: 'none', md: 'block' }} /> marketing i
                        profesionalne usluge klipovanja kontenta? Zakažite besplatan poziv
                        <Box as="br" display={{ base: 'none', md: 'block' }} /> kako bi videli
                        da li možemo ostvariti prave rezultate za vaš brend.
                    </Text>

                    <Text
                        color="gray.400"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        lineHeight={1.5}
                        display={{ base: 'block', md: 'none' }}
                    >
                        Spremni da pojačate engagement? Zakažite besplatan poziv kako bi
                        videli da li možemo ostvariti prave rezultate za vaš brend.
                    </Text>

                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        rowGap={12}
                        columnGap={{ base: 0, sm: 8 }}
                        pt={4}
                        justifyItems="center"
                        color="gray.300"
                        fontSize="md"
                        fontWeight="medium"
                    >
                        <HStack gap={2}>
                            <Clock size={20} />
                            <Text>Odgovor u roku od 24h</Text>
                        </HStack>

                        <HStack gap={2}>
                            <ArrowRight size={20} />
                            <Text>Besplatne konsultacije</Text>
                        </HStack>

                        <HStack gap={2} justify="center">
                            <Check size={20} />
                            <Text>Veruju nam 100+ brendova</Text>
                        </HStack>
                    </SimpleGrid>
                </MotionVStack>

                {/* --- Schedule a Meeting Card --- */}
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    mb={{ base: 12, md: 16 }}
                >
                    <Box
                        bg="gray.900"
                        color="white"
                        border="3px solid"
                        borderColor="white"
                        borderRadius="2xl"
                        textAlign="center"
                        p={{ base: 8, md: 14 }}
                        boxShadow="0 20px 60px rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        transition="all 0.3s ease"
                        _hover={{
                            boxShadow: {
                                base: '0 20px 60px rgba(255, 255, 255, 0.15)',
                                md: '0 30px 80px rgba(255, 255, 255, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                            },
                            borderColor: 'gray.100',
                        }}
                        position="relative"
                        overflow="hidden"
                    >
                        {/* Subtle glow effect */}
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            backgroundImage="radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 60%)"
                            pointerEvents="none"
                        />

                        <VStack gap={5} position="relative" zIndex={1}>
                            <Flex
                                w={{ base: '60px', md: '72px' }}
                                h={{ base: '60px', md: '72px' }}
                                borderRadius="xl"
                                bg="white"
                                align="center"
                                justify="center"
                            >
                                <Calendar size={36} className="text-black" />
                            </Flex>
                            <Heading
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight="900"
                                color="white"
                            >
                                Zakažite Besplatan Poziv
                            </Heading>
                            <Text
                                color="gray.400"
                                maxW="2xl"
                                mx="auto"
                                fontSize={{ base: 'sm', md: 'md' }}
                                lineHeight="1.7"
                            >
                                Rezervišite 30-minutni besplatan poziv za više informacija{' '}
                                <Box as="br" display={{ base: 'none', md: 'block' }} />
                                kako bismo videli da li{' '}
                                <Box as="br" display={{ base: 'block', md: 'none' }} />
                                možemo da vam pomognemo
                            </Text>
                            <Button
                                asChild
                                size={{ base: 'md', md: 'lg' }}
                                mt={4}
                                px={{ base: 6, md: 10 }}
                                py={{ base: 6, md: 7 }}
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight="700"
                                borderRadius="full"
                                bg="white"
                                color="black"
                                _hover={{
                                    bg: 'gray.100',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.4)',
                                }}
                                transition="all 0.25s ease"
                            >
                                <a
                                    href="https://cal.com/petarnovakovic/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Calendar size={20} style={{ marginRight: '8px' }} />
                                    <span>Zakaži konsultacije</span>
                                </a>
                            </Button>
                        </VStack>
                    </Box>
                </MotionBox>

                {/* --- LOWER GRID --- */}
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={{ base: 8, md: 10 }}
                    mb={{ base: 16, md: 20 }}
                >
                    {/* LEFT: Contact */}
                    <MotionBox
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Box
                            bg="gray.900"
                            color="white"
                            border="2px solid"
                            borderColor="white/20"
                            borderRadius="2xl"
                            p={{ base: 6, md: 10 }}
                            boxShadow="0 20px 60px rgba(0,0,0,0.3)"
                            transition="all 0.3s ease"
                            _hover={{
                                borderColor: 'white/30',
                                boxShadow: {
                                    base: '0 20px 60px rgba(0,0,0,0.3)',
                                    md: '0 30px 80px rgba(0,0,0,0.4)',
                                },
                            }}
                            h="100%"
                        >
                            <HStack gap={2} mb="8">
                                <Mail size={24} className="my-auto text-white" />
                                <Heading
                                    fontSize={{ base: 'md', md: 'lg' }}
                                    my="auto"
                                    fontWeight="900"
                                >
                                    Direktan kontakt
                                </Heading>
                            </HStack>

                            <VStack align="start" gap={8}>
                                {[
                                    {
                                        icon: Mail,
                                        label: 'Email',
                                        value: 'kontakt@clipify.rs',
                                        href: 'mailto:kontakt@clipify.rs',
                                    },
                                    {
                                        icon: FaInstagram,
                                        label: 'Instagram',
                                        value: 'Pošalji nam poruku u DM',
                                        href: 'https://www.instagram.com/clipify.rs/',
                                    },
                                    {
                                        icon: Clock,
                                        label: 'Vreme odgovora',
                                        value: 'U roku od 24 sata',
                                    },
                                ].map((item) => {
                                    const IconComp = item.icon;
                                    return (
                                        <HStack key={item.label} gap={4} align="flex-start">
                                            <Flex
                                                w={12}
                                                h={12}
                                                borderRadius="lg"
                                                bg="white"
                                                border="1px solid"
                                                borderColor="white/20"
                                                align="center"
                                                justify="center"
                                                flexShrink={0}
                                            >
                                                <IconComp size={20} className="text-black" />
                                            </Flex>
                                            <Box>
                                                <Text
                                                    color="gray.500"
                                                    fontSize="sm"
                                                    fontWeight="600"
                                                    textTransform="uppercase"
                                                    letterSpacing="wide"
                                                >
                                                    {item.label}
                                                </Text>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        style={{
                                                            fontWeight: 700,
                                                            color: 'white',
                                                            textDecoration: 'none',
                                                        }}
                                                        className="text-md md:text-lg hover:underline transition-colors duration-200"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <Text
                                                        fontWeight="700"
                                                        fontSize={{ base: 'md', md: 'lg' }}
                                                        color="white"
                                                    >
                                                        {item.value}
                                                    </Text>
                                                )}
                                            </Box>
                                        </HStack>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </MotionBox>

                    {/* RIGHT: Steps */}
                    <MotionBox
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Box
                            bg="gray.900"
                            color="white"
                            border="2px solid"
                            borderColor="white/20"
                            borderRadius="2xl"
                            p={{ base: 6, md: 10 }}
                            boxShadow="0 20px 60px rgba(0,0,0,0.3)"
                            transition="all 0.3s ease"
                            _hover={{
                                borderColor: 'white/30',
                                boxShadow: {
                                    base: '0 20px 60px rgba(0,0,0,0.3)',
                                    md: '0 30px 80px rgba(0,0,0,0.4)',
                                },
                            }}
                            h="100%"
                        >
                            <Heading fontSize={{ base: 'md', md: 'lg' }} mb={8} fontWeight="900">
                                Šta{' '}
                                <Box as="span" fontWeight="900" color="white">
                                    Dalje?
                                </Box>
                            </Heading>

                            <VStack align="start" gap={6}>
                                {[
                                    {
                                        num: '1',
                                        title: 'Besplatna konsultacija',
                                        desc: 'Analiziramo vaše ciljeve i publiku.',
                                    },
                                    {
                                        num: '2',
                                        title: 'Razvoj strategije',
                                        desc: 'Kreiramo vaš prilagođeni plan kampanje.',
                                    },
                                    {
                                        num: '3',
                                        title: 'Pokretanje kampanje',
                                        desc: 'Naša mreža klipera počinje sa radom.',
                                    },
                                    {
                                        num: '4',
                                        title: 'Praćenje rezultata',
                                        desc: 'Merimo i pratimo performanse.',
                                    },
                                ].map((step) => (
                                    <HStack key={step.num} align="flex-start" gap={4}>
                                        <Flex
                                            bg="white"
                                            color="black"
                                            w={10}
                                            h={10}
                                            align="center"
                                            justify="center"
                                            borderRadius="lg"
                                            fontWeight="900"
                                            fontSize="lg"
                                            flexShrink={0}
                                        >
                                            {step.num}
                                        </Flex>
                                        <Box>
                                            <Text
                                                fontWeight="700"
                                                color="white"
                                                fontSize={{ base: 'md', md: 'lg' }}
                                                mb={1}
                                            >
                                                {step.title}
                                            </Text>
                                            <Text
                                                color="gray.400"
                                                fontSize={{ base: 'sm', md: 'md' }}
                                                lineHeight="1.6"
                                            >
                                                {step.desc}
                                            </Text>
                                        </Box>
                                    </HStack>
                                ))}
                            </VStack>
                        </Box>
                    </MotionBox>
                </Grid>

                {/* Discord CTA */}
                <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Box
                        mx="auto"
                        w={{ base: '100%', md: '55%' }}
                        bg="gray.900"
                        color="white"
                        border="2px solid"
                        borderColor="white/20"
                        borderRadius="2xl"
                        textAlign="center"
                        p={{ base: 8, md: 12 }}
                        boxShadow="0 20px 60px rgba(0,0,0,0.3)"
                        transition="all 0.3s ease"
                        _hover={{
                            borderColor: '#7289da',
                            boxShadow: {
                                base: '0 20px 60px rgba(0,0,0,0.3)',
                                md: '0 30px 80px rgba(114, 137, 218, 0.2)',
                            },
                        }}
                        position="relative"
                        overflow="hidden"
                    >
                        <VStack gap={6} position="relative" zIndex={1}>
                            <Flex
                                w={{ base: '60px', md: '72px' }}
                                h={{ base: '60px', md: '72px' }}
                                borderRadius="xl"
                                bg="#7289da"
                                align="center"
                                justify="center"
                            >
                                <FaDiscord size={40} className="text-white" />
                            </Flex>

                            <Heading
                                fontSize={{ base: 'xl', md: '3xl' }}
                                fontWeight="900"
                                lineHeight="short"
                            >
                                Želiš da postaneš kliper?
                            </Heading>

                            <Text
                                color="gray.400"
                                fontSize={{ base: 'md', md: 'lg' }}
                                maxW="2xl"
                            >
                                Počni da zarađuješ kreirajući viralne klipove za top brendove i
                                kreatore.
                            </Text>

                            <Button
                                asChild
                                variant="solid"
                                border="none"
                                size={{ base: 'md', md: 'lg' }}
                                bg="#7289da"
                                color="white"
                                borderRadius="full"
                                px={{ base: 6, md: 10 }}
                                py={{ base: 6, md: 7 }}
                                fontWeight="700"
                                fontSize={{ base: 'md', md: 'lg' }}
                                _hover={{
                                    bg: '#5b6eae',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(114, 137, 218, 0.3)',
                                }}
                                transition="all 0.25s ease"
                            >
                                <a
                                    href="https://discord.com/invite/clipifyrs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaDiscord size={22} style={{ marginRight: '8px' }} />
                                    <span>Pridružite se našem Discordu</span>
                                </a>
                            </Button>
                        </VStack>
                    </Box>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default CTASection;