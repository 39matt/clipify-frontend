'use client'
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';

const MarqueeSection = () => {
    const words = [
        'Strimerima',
        'Kontent Kreatorima',
        'Brendovima',
        'Aplikacijama',
        'Podcastima',
        'Umetnicima',
        'Coachevima',
        'Youtuberima',
    ];

    return (
        <Box
            bg="black"
            color="white"
            py={{ base: 8, md: 10 }}
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="600px"
                h="300px"
                backgroundImage="radial-gradient(circle, rgba(239, 68, 68, 0.1), transparent 70%)"
                pointerEvents="none"
            />

            <Container maxW="7xl" position="relative" zIndex={1}>
                <Flex justify="center" mb={{ base: 6, md: 8 }}>
                    <Box position="relative">
                        <Box
                            position="absolute"
                            top="-3px"
                            left="-3px"
                            w="30px"
                            h="30px"
                            borderTop="3px solid"
                            borderLeft="3px solid"
                            borderColor="red.500"
                        />
                        <Box
                            position="absolute"
                            top="-3px"
                            right="-3px"
                            w="30px"
                            h="30px"
                            borderTop="3px solid"
                            borderRight="3px solid"
                            borderColor="red.500"
                        />
                        <Box
                            position="absolute"
                            bottom="-3px"
                            left="-3px"
                            w="30px"
                            h="30px"
                            borderBottom="3px solid"
                            borderLeft="3px solid"
                            borderColor="red.500"
                        />
                        <Box
                            position="absolute"
                            bottom="-3px"
                            right="-3px"
                            w="30px"
                            h="30px"
                            borderBottom="3px solid"
                            borderRight="3px solid"
                            borderColor="red.500"
                        />

                        <Box
                            position="absolute"
                            inset={0}
                            border="2px dashed"
                            borderColor="white/30"
                            pointerEvents="none"
                        />

                        <Box
                            bg="black"
                            px={{ base: 4, sm: 8, md: 12 }}
                            py={{ base: 3, md: 3.5 }}
                            position="relative"
                        >
                            <Heading
                                fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }}
                                fontWeight="900"
                                letterSpacing="-0.02em"
                                textAlign="center"
                                color="white"
                            >
                                Saradjujemo sa
                            </Heading>
                        </Box>
                    </Box>
                </Flex>

                <Box position="relative" overflow="hidden">
                    <Flex
                        gap={12}
                        animation="scroll 35s linear infinite"
                        w="max-content"
                        align="center"
                    >
                        {[...words, ...words, ...words].map((word, i) => (
                            <Text
                                key={i}
                                fontSize={{ base: 'xl', md: '2xl' }}
                                fontWeight="700"
                                color="red.500"
                                textShadow="0 0 8px rgba(239, 68, 68, 0.5), 0 0 16px rgba(239, 68, 68, 0.4)"
                                whiteSpace="nowrap"
                                transition="all 0.3s ease"
                                _hover={{
                                    textShadow:
                                        '0 0 12px rgba(239, 68, 68, 0.8), 0 0 24px rgba(239, 68, 68, 0.6)',
                                    transform: 'scale(1.05)',
                                }}
                            >
                                {word}
                            </Text>
                        ))}
                    </Flex>


                </Box>
            </Container>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.333%);
                    }
                }
            `}</style>
        </Box>
    );
};

export default MarqueeSection;