'use client';

import React, { useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Container,
    Grid,
    Heading,
    HStack,
    Image,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

const MotionBox = motion.create(Box);

export type CaseItem = {
    id: string;
    name: string;
    views: string;
    text: string;
    image: string;
    totalClippers?: number;
    totalVideos?: number;
    durationDays?: number;
    topVideo?: {
        views: string;
        clipper: string;
        link: string;
    };
};

const cases: CaseItem[] = [
    {
        id: 'trajko',
        name: 'Trajko',
        views: '100M',
        image:
            'https://firebasestorage.googleapis.com/v0/b/botina-44e95.firebasestorage.app/o/trajko2.jpg?alt=media&token=0a3856fd-cb1f-473a-b61b-41f7c62dc181',
        totalClippers: 50,
        totalVideos: 1000,
        durationDays: 30,
        topVideo: {
            views: '570K',
            clipper: 'kliper_1311',
            link: 'https://www.instagram.com/p/DUq_kBnj_kz/',
        },
        text: 'Tokom kampanje za Trajka fokusirali smo se na organski rast kroz našu mrežu klipera. Umesto otvaranja novih profila, Trajkov sadržaj je strateški ubacen na već postojeće kliperske i streamerske profile koji imaju izgrađenu publiku. Kliperi su svakodnevno izbacivali najbolje momente i zabavne isečke iz njegovih kick strimova koje najbolje prolaze u njegovoj niši.',
    },
    {
        id: 'cjuree',
        name: 'Cjuree',
        views: '10M',
        image:
            'https://firebasestorage.googleapis.com/v0/b/botina-44e95.firebasestorage.app/o/cjuree.jpeg?alt=media&token=0cc34f5b-8216-4e79-aca0-22fd6beadf20',
        totalClippers: 15,
        totalVideos: 320,
        durationDays: 30,
        topVideo: {
            views: '370K',
            clipper: 'cjuree.clipping',
            link: 'https://www.tiktok.com/@cjuree.clipping/video/7568402808077045004',
        },
        text:
            'Tokom kampanje za Cjureta fokusirali smo se na organski rast kroz našu mrežu klipera. Otvarali su nove profile i svakodnevno pravili sadržaj koji najbolje prolazi u biznis niši - lifestyle edits, ragebait formate i isečke iz podcasta.\n\n' +
            'Svi klipovi su optimizovani za publiku koja prati biznis, prodaju, mindset i motivacione kreatore. Na ovaj način je Cjureov brend prirodno plasiran tačno onoj publici koja najviše konvertuje, uz stabilan organski rast i visok engagement tokom cele kampanje.',
    },
    {
        id: 'aleksic',
        name: 'AleksicMoto',
        views: '3M',
        image:
            'https://firebasestorage.googleapis.com/v0/b/botina-44e95.firebasestorage.app/o/aleksic.jpg?alt=media&token=d573b72a-2798-4892-a14b-7e684193d15d',
        totalClippers: 15,
        totalVideos: 95,
        durationDays: 14,
        topVideo: {
            views: '300K',
            clipper: 'kliper1311',
            link: 'https://www.tiktok.com/@kliper1311/video/7538504023171665208',
        },
        text: 'Tokom kampanje za Aleksića fokusirali smo se na organski rast kroz našu mrežu klipera. Umesto otvaranja novih profila, Aleksićev sadržaj je strateški ubacen na već postojeće kliperske i streamerske profile koji imaju izgrađenu publiku. Kliperi su svakodnevno izbacivali najbolje momente i zabavne isečke iz njegovih videa koje najbolje prolaze u njegovoj niši.',
    },
];

interface CaseCardProps {
    item: CaseItem;
    onSelect: (item: CaseItem) => void;
}

const CaseStudyCard = ({ item, onSelect }: CaseCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <MotionBox
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            bg="white"
            borderRadius="3xl"
            overflow="hidden"
            border="3px solid"
            borderColor={isHovered ? 'red.500' : 'gray.200'}
            boxShadow={
                isHovered
                    ? '0 32px 64px rgba(239, 68, 68, 0.25), 0 0 80px rgba(239, 68, 68, 0.15)'
                    : '0 20px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)'
            }
            cursor="pointer"
            onClick={() => onSelect(item)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            position="relative"
            _hover={{
                transform: { base: 'none', md: 'translateY(-12px) scale(1.02)' },
            }}
        >
            {/* Image Section */}
            <Box
                position="relative"
                h={{ base: '280px', sm: '320px', md: '380px' }}
                bg="gray.900"
                overflow="hidden"
            >
                <Image
                    src={item.image}
                    alt={item.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    filter={isHovered ? 'brightness(1)' : 'brightness(0.9)'}
                    transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
                    transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s"
                />
                <Box
                    position="absolute"
                    inset={0}
                    backgroundImage="linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))"
                />

                {/* Floating badge */}
                <Badge
                    position="absolute"
                    top={6}
                    right={6}
                    bg="red.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="900"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    opacity={isHovered ? 1 : 0}
                    transform={isHovered ? 'translateY(0)' : 'translateY(-10px)'}
                    transition="all 0.3s"
                >
                    POGLEDAJ
                </Badge>

                {/* Content Overlay */}
                <VStack
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={{ base: 4, sm: 6, md: 7 }}
                    gap={3}
                    align="start"
                >
                    <Heading
                        fontSize={{ base: '2xl', md: '3xl' }}
                        color="white"
                        letterSpacing="-0.02em"
                        fontWeight="900"
                        textShadow="0 4px 16px rgba(0,0,0,0.4)"
                        transition="transform 0.3s"
                        transform={isHovered ? 'translateX(8px)' : 'translateX(0)'}
                    >
                        {item.name}
                    </Heading>

                    <HStack
                        bg={isHovered ? 'red.500' : 'white/20'}
                        backdropFilter="blur(12px)"
                        color="white"
                        borderRadius="full"
                        px={{ base: 4, md: 6 }}
                        py={{ base: 2, md: 3.5 }}
                        gap="2"
                        border="1px solid"
                        borderColor={isHovered ? 'red.600' : 'white/30'}
                        transition="all 0.3s"
                    >
                        <Text
                            fontSize={{ base: 'xl', md: '3xl' }}
                            fontWeight="900"
                            lineHeight="1"
                            letterSpacing="-0.02em"
                        >
                            {item.views}
                        </Text>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="700"
                            opacity={0.95}
                        >
                            pregleda
                        </Text>
                    </HStack>
                </VStack>
            </Box>

            {/* CTA Section */}
            <Box p={{ base: 4, sm: 5, md: 6 }}>
                <Button
                    w="100%"
                    size={{ base: 'md', md: 'lg' }}
                    bg={isHovered ? 'red.500' : 'black'}
                    color="white"
                    fontWeight="700"
                    borderRadius="xl"
                    _hover={{
                        bg: isHovered ? 'red.600' : 'gray.800',
                    }}
                    transition="all 0.3s"
                >
                    <span>Pogledaj Projekat</span>
                    <Box
                        as={ChevronRight}
                        ml={2}
                        transition="transform 0.3s"
                        transform={isHovered ? 'translateX(4px)' : 'translateX(0)'}
                    />
                </Button>
            </Box>
        </MotionBox>
    );
};

export const CaseStudiesSection = () => {
    const { open, onOpen, onClose } = useDisclosure();
    const [active, setActive] = useState<CaseItem | null>(null);

    const openCase = (c: CaseItem) => {
        setActive(c);
        onOpen();
    };

    return (
        <Box
            id="case-studies"
            py={{ base: 16, md: 24 }}
            position="relative"
            bg="gray.200"
            backgroundImage="radial-gradient(circle at 50% 0%, rgba(0,0,0,0.04), transparent 70%)"
        >
            <Container maxW="7xl">
                <Container maxW="7xl" mb={{ base: 12, md: 20 }} px={0}>
                    <Grid
                        templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
                        alignItems="end"
                        gap={{ base: 6, lg: 8 }}
                    >
                        <Box>
                            <Heading
                                as="h2"
                                fontWeight="900"
                                letterSpacing="-0.03em"
                                lineHeight="0.95"
                                fontSize={{ base: '32px', md: '48px', lg: '56px' }}
                                color="black"
                            >
                                Ko je sa nama
                            </Heading>

                            <Heading
                                as="h2"
                                fontWeight="900"
                                letterSpacing="-0.03em"
                                lineHeight="0.95"
                                fontSize={{ base: '40px', md: '56px', lg: '64px' }}
                                backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-400), var(--chakra-colors-gray-600))"
                                backgroundClip="text"
                                mt={{ base: 2, md: 3 }}
                            >
                                Otišao viralno
                            </Heading>
                        </Box>

                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent={{ base: 'flex-start', lg: 'flex-end' }}
                        >
                            <Text
                                color="gray.700"
                                fontSize={{ base: 'md', md: 'xl' }}
                                textAlign={{ base: 'left', lg: 'right' }}
                                maxW={{ base: 'full', lg: 'sm' }}
                                lineHeight="1.6"
                            >
                                Istraži rezultate koje smo <br /> ostvarili za klijente.
                            </Text>
                        </Box>
                    </Grid>
                </Container>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                    gap={{ base: 6, md: 8 }}
                >
                    {cases.map((item) => (
                        <CaseStudyCard key={item.id} item={item} onSelect={openCase} />
                    ))}
                </Grid>
            </Container>

            {active && (
                <CaseStudyModal isOpen={open} onClose={onClose} data={active} />
            )}
        </Box>
    );
};

export default CaseStudiesSection;
