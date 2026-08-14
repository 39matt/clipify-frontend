'use client';

import React from 'react';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Rocket,
    Users,
    LineChart,
    Calendar,
    ArrowRight,
    Check,
} from 'lucide-react';

const MotionBox = motion.create(Box);

export const StepsSection = () => {
    const steps = [
        {
            number: '1',
            title: 'Pokreni Kampanju',
            description:
                'Reci nam svoje ciljeve - bilo da promovišeš klip, podcast, pesmu, brend ili događaj. Odredi budžet i smernice, a mi se brinemo o svemu ostalom.',
            icon: Rocket,
        },
        {
            number: '2',
            title: 'Kliperi Kreiraju',
            description:
                'Kliperi (video editori) prate naš dokazani sistem kreiranja sadržaja, usklađen sa vizijom tvog brenda - dok im naš tim kroz stalni coaching pomaže da maksimalno povećaju rezultate.',
            icon: Users,
        },
        {
            number: '3',
            title: 'Prati rezultate',
            description:
                'Statistiku možeš pratiti uživo na svojem personalizovanom Dashboardu dok naš AI sistem u realnom vremenu prati preglede i filtrira lažnu aktivnost. Plaćaš samo za prave, organske rezultate.',
            icon: LineChart,
        },
    ];

    return (
        <Box
            id="how-it-works"
            as="section"
            bg="white"
            color="black"
            py={{ base: 20, md: 28 }}
            position="relative"
        >
            <Container maxW="7xl">
                {/* Header */}
                <VStack gap={3} mb={{ base: 16, md: 20 }} textAlign="center">
                    <Text
                        fontSize="sm"
                        letterSpacing="0.15em"
                        textTransform="uppercase"
                        color="gray.500"
                        fontWeight="600"
                    >
                        Kako funkcioniše
                    </Text>

                    <Heading
                        fontWeight="900"
                        letterSpacing="-0.03em"
                        fontSize={{ base: '38px', md: '48px', lg: '56px' }}
                        lineHeight="1.1"
                        px={{ base: 4, md: 0 }}
                    >
                        Postani viralan{' '}
                        <Box as="span" display={{ base: 'block', md: 'none' }} />
                        u
                        <Box
                            as="span"
                            position="relative"
                            zIndex={1}
                            backgroundImage="linear-gradient(to right, rgba(252, 165, 165, 0.9), rgba(252, 165, 165, 0.5), rgba(252, 165, 165, 0.2), transparent)"
                            borderLeft="8px solid"
                            borderColor="red.500"
                            pl="2"
                            ml="1"
                        >
                            3 Koraka
                        </Box>
                    </Heading>

                    <Text
                        color="gray.600"
                        fontSize={{ base: 'md', md: 'xl' }}
                        maxW="2xl"
                        lineHeight="1.6"
                        px={{ base: 4, md: 0 }}
                    >
                        Od ideje do viralnog sadržaja bez puno razmišljanja
                    </Text>
                </VStack>

                {/* Steps Grid */}
                <Grid
                    templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }}
                    gap={{ base: 8, md: 6 }}
                    position="relative"
                    mb={{ base: 16, md: 20 }}
                >
                    {/* Connection Lines - Desktop Only */}
                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        position="absolute"
                        top="80px"
                        left="16.66%"
                        right="16.66%"
                        h="3px"
                        backgroundImage="linear-gradient(to right, var(--chakra-colors-red-500), var(--chakra-colors-red-300), var(--chakra-colors-red-500))"
                        zIndex={0}
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            backgroundImage:
                                'linear-gradient(to right, var(--chakra-colors-red-500), var(--chakra-colors-red-300), var(--chakra-colors-red-500))',
                            filter: 'blur(8px)',
                            opacity: 0.4,
                        }}
                    />

                    {steps.map((step, i) => {
                        const IconComponent = step.icon;
                        return (
                            <MotionBox
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                position="relative"
                                zIndex={1}
                            >
                                <VStack
                                    bg="white"
                                    border="3px solid"
                                    borderColor="gray.200"
                                    borderRadius="2xl"
                                    p={{ base: 6, sm: 8, md: 10 }}
                                    gap={5}
                                    h="100%"
                                    transition="all 0.3s ease"
                                    position="relative"
                                    overflow="hidden"
                                    role="group"
                                    _hover={{
                                        borderColor: 'red.500',
                                        transform: 'translateY(-8px)',
                                        boxShadow: {
                                            base: 'none',
                                            md: '0 20px 40px rgba(239, 68, 68, 0.15)',
                                        },
                                    }}
                                >
                                    {/* Background Gradient Effect */}
                                    <Box
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        right={0}
                                        bottom={0}
                                        backgroundImage="radial-gradient(circle at top right, rgba(239, 68, 68, 0.03), transparent 70%)"
                                        opacity={0}
                                        transition="opacity 0.3s"
                                        _groupHover={{ opacity: 1 }}
                                        pointerEvents="none"
                                    />

                                    {/* Step Number Badge */}
                                    <Flex
                                        w={{ base: '64px', md: '80px' }}
                                        h={{ base: '64px', md: '80px' }}
                                        borderRadius="full"
                                        bg="black"
                                        color="white"
                                        align="center"
                                        justify="center"
                                        fontSize={{ base: '28px', md: '36px' }}
                                        fontWeight="900"
                                        position="relative"
                                        border="4px solid"
                                        borderColor="white"
                                        boxShadow="0 8px 24px rgba(0,0,0,0.12)"
                                        transition="all 0.3s ease"
                                        _groupHover={{
                                            bg: 'red.500',
                                            transform: 'scale(1.1) rotate(5deg)',
                                            boxShadow: {
                                                base: '0 8px 24px rgba(0,0,0,0.12)',
                                                md: '0 12px 32px rgba(239, 68, 68, 0.3)',
                                            },
                                        }}
                                    >
                                        {step.number}

                                        {/* Pulse effect on hover */}
                                        <Box
                                            position="absolute"
                                            inset={-2}
                                            borderRadius="full"
                                            border="2px solid"
                                            borderColor="red.500"
                                            opacity={0}
                                            transition="all 0.3s"
                                            _groupHover={{
                                                opacity: 1,
                                                transform: 'scale(1.2)',
                                            }}
                                        />
                                    </Flex>

                                    {/* Icon */}
                                    <Flex
                                        w={{ base: '48px', md: '56px' }}
                                        h={{ base: '48px', md: '56px' }}
                                        borderRadius="xl"
                                        bg="gray.100"
                                        align="center"
                                        justify="center"
                                        transition="all 0.3s"
                                        _groupHover={{
                                            bg: 'red.50',
                                        }}
                                    >
                                        <IconComponent
                                            size={28}
                                            className="text-gray-700 group-hover:text-red-500 transition-colors duration-300"
                                        />
                                    </Flex>

                                    {/* Content */}
                                    <VStack gap={3} flex="1">
                                        <Heading
                                            fontSize={{ base: 'xl', md: '2xl' }}
                                            fontWeight="800"
                                            textAlign="center"
                                            letterSpacing="-0.02em"
                                        >
                                            {step.title}
                                        </Heading>

                                        <Text
                                            color="gray.600"
                                            fontSize={{ base: 'sm', md: 'lg' }}
                                            textAlign="center"
                                            lineHeight="1.7"
                                        >
                                            {step.description}
                                        </Text>
                                    </VStack>

                                    {/* Step indicator bar */}
                                    <Box
                                        position="absolute"
                                        bottom={0}
                                        left={0}
                                        right={0}
                                        h="4px"
                                        bg="gray.200"
                                        overflow="hidden"
                                    >
                                        <Box
                                            h="100%"
                                            bg="red.500"
                                            w="0%"
                                            transition="width 0.6s ease"
                                            _groupHover={{ w: '100%' }}
                                        />
                                    </Box>
                                </VStack>
                            </MotionBox>
                        );
                    })}
                </Grid>

                {/* CTA Section */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <VStack
                        bg="black"
                        color="white"
                        borderRadius="3xl"
                        p={{ base: 8, md: 14 }}
                        gap={6}
                        position="relative"
                        overflow="hidden"
                    >
                        {/* Background accent */}
                        <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="400px"
                            h="400px"
                            backgroundImage="radial-gradient(circle, rgba(239, 68, 68, 0.15), transparent 70%)"
                            pointerEvents="none"
                        />

                        <Badge
                            bg="red.500"
                            color="white"
                            px={4}
                            py={2}
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            Spreman za početak?
                        </Badge>

                        <Heading
                            fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
                            fontWeight="900"
                            textAlign="center"
                            letterSpacing="-0.02em"
                            maxW="3xl"
                        >
                            Započni svoj rast na društvenim mrežama već danas
                        </Heading>

                        <Text
                            color="gray.400"
                            fontSize={{ base: 'sm', md: 'lg' }}
                            textAlign="center"
                            maxW="2xl"
                        >
                            Pridruži se brendovima koji već koriste našu platformu za organski
                            rast
                        </Text>

                        <HStack gap={4} flexWrap="wrap" justify="center" pt={2} w="full">
                            <Button
                                asChild
                                size={{ base: 'md', md: 'lg' }}
                                bg="white"
                                color="black"
                                px={{ base: 6, md: 10 }}
                                py={{ base: 6, md: 8 }}
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight="700"
                                borderRadius="full"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 32px rgba(255,255,255,0.3)',
                                }}
                                transition="all 0.2s"
                            >
                                <a
                                    href="https://cal.com/petarnovakovic/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Calendar size={20} style={{ marginRight: '8px' }} />
                                    <span>Zakaži Konsultacije</span>
                                </a>
                            </Button>

                            <Button
                                size={{ base: 'md', md: 'lg' }}
                                variant="outline"
                                borderColor="white/30"
                                color="white"
                                px={{ base: 6, md: 10 }}
                                py={{ base: 6, md: 8 }}
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight="700"
                                borderRadius="full"
                                borderWidth="2px"
                                _hover={{
                                    bg: 'white/10',
                                    borderColor: 'white',
                                    transform: 'translateY(-2px)',
                                }}
                                transition="all 0.2s"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#plans')?.scrollIntoView({
                                        behavior: 'smooth',
                                    });
                                }}
                            >
                                <ArrowRight size={20} style={{ marginRight: '8px' }} />
                                <span>Planovi</span>
                            </Button>
                        </HStack>

                        <HStack
                            gap={{ base: 4, md: 8 }}
                            pt={6}
                            color="gray.400"
                            fontSize={{ base: 'xs', md: 'sm' }}
                            flexWrap="wrap"
                            justify="center"
                        >
                            <HStack gap={2}>
                                <Check size={16} className="text-green-400" />
                                <Text>30x Jeftinije od Reklama</Text>
                            </HStack>
                            <HStack gap={2}>
                                <Check size={16} className="text-green-400" />
                                <Text>Setup za 24h</Text>
                            </HStack>
                            <HStack gap={2}>
                                <Check size={16} className="text-green-400" />
                                <Text>Garancija</Text>
                            </HStack>
                        </HStack>
                    </VStack>
                </MotionBox>
            </Container>
        </Box>
    );
};

export default StepsSection;