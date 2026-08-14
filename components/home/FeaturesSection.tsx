'use client';

import React from 'react';
import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Users,
    Rocket,
    DollarSign,
    ShieldCheck,
    LineChart,
    Layers,
    Check,
    LucideIcon,
} from 'lucide-react';

const MotionBox = motion.create(Box);
const MotionGridItem = motion.create(GridItem);

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
}

const FeatureCard = ({
                         icon: IconComponent,
                         title,
                         description,
                         index,
                     }: FeatureCardProps) => {
    return (
        <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            h="100%"
        >
            <VStack
                role="group"
                align="start"
                gap={0}
                bg="white"
                borderRadius="2xl"
                border="3px solid"
                borderColor="gray.200"
                overflow="hidden"
                transition="all 0.3s ease"
                h="100%"
                position="relative"
                _hover={{
                    transform: { base: 'none', md: 'translateY(-8px)' },
                    borderColor: 'red.500',
                    boxShadow: {
                        base: 'none',
                        md: '0 20px 40px rgba(239, 68, 68, 0.15)',
                    },
                }}
            >
                {/* Background gradient effect on hover */}
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    backgroundImage="radial-gradient(circle at top right, rgba(239, 68, 68, 0.05), transparent 60%)"
                    opacity={0}
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 1 }}
                    pointerEvents="none"
                    zIndex={0}
                />

                {/* Icon Section */}
                <Box
                    w="100%"
                    px={{ base: 5, sm: 6, md: 7 }}
                    pt={{ base: 6, md: 7 }}
                    pb={{ base: 4, md: 5 }}
                    position="relative"
                    zIndex={1}
                >
                    <Flex
                        w={{ base: '64px', md: '72px' }}
                        h={{ base: '64px', md: '72px' }}
                        borderRadius="xl"
                        bg="black"
                        align="center"
                        justify="center"
                        position="relative"
                        transition="all 0.3s ease"
                        _groupHover={{
                            bg: 'red.500',
                            transform: { base: 'none', md: 'rotate(-5deg) scale(1.05)' },
                        }}
                    >
                        <IconComponent size={30} className="text-white" />

                        {/* Glow effect */}
                        <Box
                            position="absolute"
                            inset={-2}
                            borderRadius="xl"
                            bg="red.500"
                            opacity={0}
                            filter="blur(20px)"
                            transition="opacity 0.3s"
                            _groupHover={{ opacity: 0.4 }}
                        />
                    </Flex>
                </Box>

                {/* Content Section */}
                <VStack
                    align="start"
                    gap={4}
                    px={{ base: 5, sm: 6, md: 7 }}
                    pb={{ base: 6, md: 7 }}
                    w="100%"
                    flex="1"
                    position="relative"
                    zIndex={1}
                >
                    <Heading
                        fontSize={{ base: 'lg', md: '2xl' }}
                        lineHeight="1.2"
                        fontWeight="800"
                        letterSpacing="-0.02em"
                        color="black"
                    >
                        {title}
                    </Heading>

                    <Text
                        color="gray.600"
                        fontSize={{ base: 'sm', md: 'lg' }}
                        lineHeight="1.7"
                        flex="1"
                    >
                        {description}
                    </Text>

                    {/* Animated arrow indicator */}
                    <HStack
                        gap={2}
                        color="gray.400"
                        transition="all 0.3s"
                        _groupHover={{
                            color: 'red.500',
                            transform: 'translateX(4px)',
                        }}
                    >
                        <Text
                            fontSize="sm"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="wider"
                        >
                            Verifikovano
                        </Text>
                        <Check size={16} />
                    </HStack>
                </VStack>

                {/* Bottom accent bar */}
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    h="4px"
                    bg="gray.100"
                    overflow="hidden"
                >
                    <Box
                        h="100%"
                        bg="red.500"
                        w="0%"
                        transition="width 0.5s ease"
                        _groupHover={{ w: '100%' }}
                    />
                </Box>
            </VStack>
        </MotionBox>
    );
};

export const FeaturesSection = () => {
    const features = [
        {
            title: 'Kliperi koji razumeju viralnost',
            icon: Users,
            description:
                'Poveži se sa 600+ kreativnih Klipera koji tačno znaju šta funkcioniše na društvenim mrežama.',
        },
        {
            title: 'Tvoj brend ne čeka',
            icon: Rocket,
            description:
                'Naša platforma omogućava da tvoja kampanja krene istog dana, sa velikim brojem klipera spremnih da je ožive.',
        },
        {
            title: 'Garancija',
            icon: DollarSign,
            description:
                'Plaćaš tek kada klip isporuči stvarne preglede i engagement - ti si u Kontroli svojih reklama a ne neki nevidljivi algoritmi.',
        },
        {
            title: 'Autentičnost pregleda',
            icon: ShieldCheck,
            description:
                'Clipify kombinuje AI analitiku i ljudsku proveru kako bi uklonio svaki lažni trag. Svaki pregled je stvaran - naši brojevi su čisti, provereni i pouzdani.',
        },
        {
            title: 'Real-Time Analitika',
            icon: LineChart,
            description:
                'Prati performanse svakog klipa u našem preglednom dashboardu: vidi preglede, engagement i rast - dok se dešava.',
        },
        {
            title: 'Masivna Distribucija',
            icon: Layers,
            description:
                'Clipify optimizuje tvoj sadržaj za TikTok, IG Reels i (uskoro) YT Shorts - automatski prilagođen svakom algoritmu i formatu.',
        },
    ];

    return (
        <Box as="section" bg="gray.200" color="black" py={{ base: 16, md: 24 }}>
            <Container maxW="7xl">
                <Box width={{ base: '90%', md: '75%' }} textAlign="center" mx="auto">
                    <Text
                        fontSize="sm"
                        letterSpacing="0.15em"
                        textTransform="uppercase"
                        color="gray.500"
                        mb={3}
                    >
                        Zašto Clipify
                    </Text>

                    <Heading
                        fontWeight="900"
                        letterSpacing="-0.03em"
                        fontSize={{ base: '28px', md: '36px', lg: '48px' }}
                        mb={{ base: 12, md: 16 }}
                    >
                        Kreiramo mrežu gde kreatori i kliperi uspevaju zajedno.
                    </Heading>
                </Box>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                    gap={6}
                    gridAutoRows="1fr"
                >
                    {features.map((f, i) => (
                        <GridItem key={f.title} h="100%">
                            <FeatureCard
                                icon={f.icon}
                                title={f.title}
                                description={f.description}
                                index={i}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturesSection;