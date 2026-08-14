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
import { ArrowRight } from 'lucide-react';

const MotionBox = motion.create(Box);

export const PricingSection = () => {
    const plans = [
        {
            name: 'Povećaj Prodaju',
            tag: 'PRODAJA',
            features: [
                'Kampanja optimizovana za rast prodaje',
                'Pristup našem Dashboard-u',
                'Nedeljni izvestaji + 24/7 support',
                'Organski rast engagementa',
                'Garancija Rezultata',
            ],
        },
        {
            name: 'Povećaj Vidljivost',
            tag: 'VIRALNOST',
            features: [
                'Kampanja fokusirana na rast pregleda',
                'Pristup našem Dashboard-u',
                'Nedeljni izvestaji + 24/7 support',
                'Organski rast engagementa',
                'Garancija Rezultata',
            ],
            highlight: true,
        },
        {
            name: 'Paket po želji',
            tag: 'CUSTOM',
            features: ['Sve po Dogovoru'],
            enterprise: true,
        },
    ];

    return (
        <Flex
            id="plans"
            as="section"
            minH="110vh"
            bg="transparent"
            color="black"
            align="center"
            justify="center"
            py={12}
            px={4}
            position="relative"
            overflow="hidden"
        >
            <Container maxW="7xl" h="full">
                <VStack gap={{ base: 12, md: 24 }} h="full" justify="center">
                    {/* Header */}
                    <VStack gap={3}>
                        <Heading
                            fontSize={{ base: '32px', sm: '48px', md: '72px' }}
                            fontWeight="900"
                            letterSpacing="-0.04em"
                            lineHeight="1"
                            textAlign="center"
                        >
                            Fleksibilni
                            <Box
                                as="span"
                                position="relative"
                                zIndex={1}
                                color="black"
                                pl="2"
                                ml="2"
                                backgroundImage="linear-gradient(to right, rgba(252, 165, 165, 0.9), rgba(252, 165, 165, 0.5), rgba(252, 165, 165, 0.2), transparent)"
                                borderLeft="8px solid"
                                borderColor="red.500"
                            >
                                Planovi
                            </Box>
                        </Heading>
                        <Text
                            fontSize={{ base: '14px', md: '20px' }}
                            color="gray.600"
                            fontWeight="500"
                        >
                            Za svaku vrstu kontenta
                        </Text>
                    </VStack>

                    {/* Pricing Cards */}
                    <Grid
                        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                        gap={6}
                        w="full"
                        maxW="6xl"
                    >
                        {plans.map((plan, idx) => {
                            // Basic Plan Style
                            if (idx === 0) {
                                return (
                                    <MotionBox
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    >
                                        <VStack
                                            backgroundImage="linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)"
                                            border="2px solid"
                                            borderColor="gray.200"
                                            borderRadius="2xl"
                                            p={{ base: 5, md: 6 }}
                                            gap={4}
                                            h="full"
                                            position="relative"
                                            transition="all 0.3s"
                                            color="gray.700"
                                            overflow="hidden"
                                            _hover={{
                                                transform: { base: 'none', md: 'translateY(-4px)' },
                                                borderColor: 'gray.300',
                                                boxShadow: {
                                                    base: 'none',
                                                    md: '0 10px 30px rgba(0,0,0,0.05)',
                                                },
                                            }}
                                            _before={{
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundImage:
                                                    'radial-gradient(circle at top right, rgba(0,0,0,0.02), transparent 60%)',
                                                pointerEvents: 'none',
                                            }}
                                        >
                                            <Badge
                                                backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-100), var(--chakra-colors-gray-200))"
                                                color="gray.600"
                                                px={4}
                                                py={1}
                                                borderRadius="full"
                                                fontSize="xs"
                                                fontWeight="900"
                                                letterSpacing="widest"
                                                border="1px solid"
                                                borderColor="gray.200"
                                            >
                                                {plan.tag}
                                            </Badge>

                                            <Heading
                                                fontSize={{ base: '2xl', md: '3xl' }}
                                                fontWeight="900"
                                                textAlign="center"
                                                lineHeight="1.1"
                                                letterSpacing="-0.02em"
                                                backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-700), var(--chakra-colors-gray-500))"
                                                backgroundClip="text"
                                            >
                                                {plan.name}
                                            </Heading>

                                            <VStack gap={2} flex="1" w="full">
                                                {plan.features.map((feature, i) => (
                                                    <HStack
                                                        key={i}
                                                        gap={2}
                                                        w="full"
                                                        p={2}
                                                        borderRadius="lg"
                                                        bg="white"
                                                        border="1px solid"
                                                        borderColor="gray.100"
                                                    >
                                                        <Box
                                                            w={4}
                                                            h={4}
                                                            borderRadius="full"
                                                            backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-300), var(--chakra-colors-gray-400))"
                                                            flexShrink={0}
                                                        />
                                                        <Text
                                                            fontSize={{ base: 'xs', md: 'sm' }}
                                                            fontWeight="700"
                                                            truncate
                                                        >
                                                            {feature}
                                                        </Text>
                                                    </HStack>
                                                ))}
                                            </VStack>

                                            <VStack gap={3} w="full">
                                                <Heading
                                                    fontSize={{ base: 'md', md: 'lg' }}
                                                    fontWeight="900"
                                                    letterSpacing="-0.02em"
                                                    color="gray.700"
                                                >
                                                    Kontaktiraj nas za cenu
                                                </Heading>
                                                <Button
                                                    asChild
                                                    w="full"
                                                    size={{ base: 'md', md: 'lg' }}
                                                    backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-200), var(--chakra-colors-gray-300))"
                                                    color="gray.700"
                                                    borderRadius="xl"
                                                    fontWeight="800"
                                                    border="1px solid"
                                                    borderColor="gray.200"
                                                    _hover={{
                                                        transform: 'scale(1.05)',
                                                        backgroundImage:
                                                            'linear-gradient(to right, var(--chakra-colors-gray-300), var(--chakra-colors-gray-400))',
                                                    }}
                                                    transition="all 0.2s"
                                                >
                                                    <a
                                                        href="https://cal.com/petarnovakovic/"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Zakaži Konsultacije
                                                    </a>
                                                </Button>
                                            </VStack>
                                        </VStack>
                                    </MotionBox>
                                );
                            }

                            // Pro Plan Style (Highlighted)
                            if (plan.highlight) {
                                return (
                                    <MotionBox
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    >
                                        <Box position="relative">
                                            <VStack
                                                backgroundImage="linear-gradient(135deg, #000000, #1a1a1a, #0a0a0a)"
                                                border="3px solid"
                                                borderColor="red.500"
                                                borderRadius="2xl"
                                                p={{ base: 5, md: 6 }}
                                                gap={4}
                                                h="full"
                                                position="relative"
                                                transition="all 0.3s"
                                                color="white"
                                                overflow="hidden"
                                                _hover={{
                                                    transform: { base: 'none', md: 'translateY(-8px)' },
                                                    boxShadow: {
                                                        base: 'none',
                                                        md: '0 20px 40px rgba(239, 68, 68, 0.4)',
                                                    },
                                                }}
                                                _before={{
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    w: '200px',
                                                    h: '200px',
                                                    backgroundImage:
                                                        'radial-gradient(circle, rgba(239, 68, 68, 0.15), transparent 70%)',
                                                    pointerEvents: 'none',
                                                }}
                                            >
                                                <Badge
                                                    bg="red.500"
                                                    color="white"
                                                    px={3}
                                                    py={1}
                                                    borderRadius="full"
                                                    fontSize="xs"
                                                    fontWeight="900"
                                                    letterSpacing="wider"
                                                >
                                                    {plan.tag}
                                                </Badge>

                                                <Heading
                                                    fontSize={{ base: '2xl', md: '3xl' }}
                                                    fontWeight="900"
                                                    textAlign="center"
                                                    lineHeight="1.1"
                                                    letterSpacing="-0.02em"
                                                >
                                                    {plan.name}
                                                </Heading>

                                                <VStack gap={2} flex="1" w="full">
                                                    {plan.features.map((feature, i) => (
                                                        <HStack
                                                            key={i}
                                                            gap={2}
                                                            w="full"
                                                            p={2}
                                                            borderRadius="lg"
                                                            bg="white/10"
                                                        >
                                                            <Box
                                                                w={4}
                                                                h={4}
                                                                borderRadius="full"
                                                                bg="red.500"
                                                                flexShrink={0}
                                                            />
                                                            <Text
                                                                fontSize={{ base: 'xs', md: 'sm' }}
                                                                fontWeight="600"
                                                                truncate
                                                            >
                                                                {feature}
                                                            </Text>
                                                        </HStack>
                                                    ))}
                                                </VStack>

                                                <VStack gap={3} w="full">
                                                    <Heading
                                                        fontSize={{ base: 'md', md: 'lg' }}
                                                        fontWeight="900"
                                                        letterSpacing="-0.02em"
                                                    >
                                                        Kontaktiraj nas za cenu
                                                    </Heading>
                                                    <Button
                                                        asChild
                                                        w="full"
                                                        size={{ base: 'md', md: 'lg' }}
                                                        bg="red.500"
                                                        color="white"
                                                        borderRadius="xl"
                                                        fontWeight="800"
                                                        border="1px solid"
                                                        borderColor="red.200"
                                                        _hover={{
                                                            transform: 'scale(1.05)',
                                                        }}
                                                        transition="all 0.2s"
                                                    >
                                                        <a
                                                            href="https://cal.com/petarnovakovic/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Zakaži Konsultacije
                                                        </a>
                                                    </Button>
                                                </VStack>
                                            </VStack>

                                            <Box
                                                position="absolute"
                                                top="-3"
                                                right="-3"
                                                bg="red.500"
                                                color="white"
                                                px={4}
                                                py={1}
                                                borderRadius="full"
                                                fontSize="xs"
                                                fontWeight="900"
                                                transform="rotate(12deg)"
                                                zIndex={10}
                                            >
                                                TOP
                                            </Box>
                                        </Box>
                                    </MotionBox>
                                );
                            }

                            // Enterprise / Custom Plan Style
                            return (
                                <MotionBox
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                >
                                    <VStack
                                        backgroundImage="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)"
                                        border="2px solid"
                                        borderColor="gray.700"
                                        borderRadius="2xl"
                                        p={{ base: 5, md: 6 }}
                                        gap={4}
                                        h="full"
                                        position="relative"
                                        transition="all 0.3s"
                                        color="white"
                                        overflow="hidden"
                                        _hover={{
                                            transform: { base: 'none', md: 'translateY(-4px)' },
                                            borderColor: 'gray.500',
                                            boxShadow: {
                                                base: 'none',
                                                md: '0 15px 40px rgba(0,0,0,0.25)',
                                            },
                                        }}
                                        _before={{
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundImage:
                                                'radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent 60%)',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <Badge
                                            backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-700))"
                                            color="white"
                                            px={4}
                                            py={1}
                                            borderRadius="full"
                                            fontSize="xs"
                                            fontWeight="900"
                                            letterSpacing="widest"
                                            border="1px solid"
                                            borderColor="white/30"
                                        >
                                            {plan.tag}
                                        </Badge>

                                        <Heading
                                            fontSize={{ base: '2xl', md: '3xl' }}
                                            fontWeight="900"
                                            textAlign="center"
                                            lineHeight="1.1"
                                            letterSpacing="-0.02em"
                                            backgroundImage="linear-gradient(to right, white, var(--chakra-colors-gray-300))"
                                            backgroundClip="text"
                                        >
                                            {plan.name}
                                        </Heading>

                                        <VStack gap={2} flex="1" w="full">
                                            {plan.features.map((feature, i) => (
                                                <HStack
                                                    key={i}
                                                    gap={2}
                                                    w="full"
                                                    p={2}
                                                    borderRadius="lg"
                                                    bg="white/10"
                                                    border="1px solid"
                                                    borderColor="white/10"
                                                >
                                                    <Box
                                                        w={4}
                                                        h={4}
                                                        borderRadius="full"
                                                        backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-400), var(--chakra-colors-gray-600))"
                                                        flexShrink={0}
                                                    />
                                                    <Text
                                                        fontSize={{ base: 'xs', md: 'sm' }}
                                                        fontWeight="700"
                                                        truncate
                                                    >
                                                        {feature}
                                                    </Text>
                                                </HStack>
                                            ))}
                                        </VStack>

                                        <VStack gap={3} w="full">
                                            <Heading
                                                fontSize={{ base: 'md', md: 'lg' }}
                                                fontWeight="900"
                                                letterSpacing="-0.02em"
                                            >
                                                Kontaktiraj nas za cenu
                                            </Heading>
                                            <Button
                                                asChild
                                                w="full"
                                                size={{ base: 'md', md: 'lg' }}
                                                backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-200), var(--chakra-colors-gray-300))"
                                                color="gray.700"
                                                borderRadius="xl"
                                                fontWeight="800"
                                                border="1px solid"
                                                borderColor="gray.200"
                                                _hover={{
                                                    transform: 'scale(1.05)',
                                                    backgroundImage:
                                                        'linear-gradient(to right, var(--chakra-colors-gray-300), var(--chakra-colors-gray-400))',
                                                }}
                                                transition="all 0.2s"
                                            >
                                                <a
                                                    href="https://cal.com/petarnovakovic/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Zakaži Konsultacije
                                                </a>
                                            </Button>
                                        </VStack>
                                    </VStack>
                                </MotionBox>
                            );
                        })}
                    </Grid>

                    {/* Bottom CTA */}
                    <HStack
                        gap={{ base: 3, md: 4 }}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="xl"
                        p={{ base: 6, md: 8 }}
                        maxW="4xl"
                        w="full"
                        transition="all 0.3s"
                        flexDirection={{ base: 'column', md: 'row' }}
                        _hover={{
                            transform: { base: 'none', md: 'translateY(-8px)' },
                        }}
                    >
                        <Box flex="1">
                            <Text
                                fontSize={{ base: 'lg', md: 'xl' }}
                                fontWeight="800"
                                mb={1}
                                color="black"
                            >
                                Nisi siguran šta ti treba?
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                Besplatna konsultacija - Odgovor za 24h
                            </Text>
                        </Box>
                        <Button
                            size={{ base: 'md', md: 'lg' }}
                            bg="red.500"
                            color="white"
                            borderRadius="xl"
                            fontWeight="800"
                            px={8}
                            _hover={{
                                transform: 'scale(1.05)',
                                bg: 'red.600',
                            }}
                            w={{ base: 'full', md: 'auto' }}
                            flexShrink={0}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#kontakt')?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            <span>Kontakt</span>
                            <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Button>
                    </HStack>
                </VStack>
            </Container>
        </Flex>
    );
};

export default PricingSection;