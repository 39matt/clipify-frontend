'use client';

import React from 'react';
import {
    Badge,
    Box,
    Button,
    Dialog,
    Grid,
    Heading,
    Image,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ExternalLink, X } from 'lucide-react';
import { CaseItem } from './CaseStudiesSection';

type CaseStudyModalProps = {
    isOpen: boolean;
    onClose: () => void;
    data: CaseItem | null;
};

const GlowAnimation = () => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-30deg);
          }
          100% {
            transform: translateX(200%) skewX(-30deg);
          }
        }
      `,
        }}
    />
);

interface StatCardProps {
    label: string;
    value: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => (
    <Box
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
            animation: 'shine 2.5s infinite linear',
            pointerEvents: 'none',
            zIndex: 1,
        }}
    >
        <VStack
            align="start"
            bg="white/10"
            border="1px solid"
            borderColor="white/30"
            borderRadius="xl"
            p={{ base: 3, md: 4 }}
            gap={1}
            boxShadow="0 4px 10px rgba(0,0,0,0.3)"
            position="relative"
            zIndex={2}
        >
            <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.400">
                {label}
            </Text>
            <Heading
                fontSize={{ base: 'md', md: 'lg' }}
                color="white"
                fontWeight="bold"
            >
                {value}
            </Heading>
        </VStack>
    </Box>
);

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  data,
                                                              }) => {
    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(e) => !e.open && onClose()}
            placement="center"
            motionPreset="slide-in-bottom"
        >
            {/*
              Portal + Dialog.Positioner are required.
              Positioner is what actually fixes the dialog to the
              viewport (position: fixed; inset: 0; centered flex).
              Without it the Content renders in normal page flow,
              which is why it was opening "off screen" whenever the
              page was scrolled.
            */}
            <Portal>
                <Dialog.Backdrop bg="black/80" backdropFilter="blur(8px)" />
                <Dialog.Positioner
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={4}
                >
                    <Dialog.Content
                        bg="gray.900"
                        color="white"
                        borderRadius={{ base: 'xl', md: '2xl' }}
                        overflow="hidden"
                        w="full"
                        maxW={{ base: '92vw', md: '800px' }}
                        maxH="85vh"
                        my="auto"
                        mx="auto"
                        position="relative"
                    >
                        {/* Close Button */}
                        <Dialog.CloseTrigger asChild>
                            <Box
                                as="button"
                                aria-label="Close modal"
                                position="absolute"
                                top={{ base: 2, md: 3 }}
                                right={{ base: 2, md: 3 }}
                                zIndex={10}
                                p={2}
                                bg="black/60"
                                color="white"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                _hover={{
                                    bg: 'black/80',
                                    transform: 'scale(1.1)',
                                }}
                                _active={{
                                    bg: 'black/90',
                                }}
                                transition="all 0.2s"
                            >
                                <X size={20} />
                            </Box>
                        </Dialog.CloseTrigger>

                        <Dialog.Body p={0} overflowY="auto">
                            {data && (
                                <Box>
                                    {/* Hero Image Section */}
                                    <Box
                                        h={{ base: '200px', sm: '250px', md: '320px' }}
                                        bg="gray.800"
                                        position="relative"
                                    >
                                        <Image
                                            src={data.image}
                                            alt={data.name}
                                            objectFit="cover"
                                            w="100%"
                                            h="100%"
                                        />
                                        <Box
                                            position="absolute"
                                            inset={0}
                                            backgroundImage="linear-gradient(to top, rgba(0,0,0,0.7), transparent)"
                                        />
                                        <VStack
                                            position="absolute"
                                            bottom={{ base: 3, md: 4 }}
                                            left={{ base: 3, md: 4 }}
                                            align="start"
                                            gap={1}
                                        >
                                            <Heading fontSize={{ base: 'md', md: 'lg' }}>
                                                {data.name}
                                            </Heading>
                                            <Badge
                                                colorPalette="green"
                                                px={2}
                                                py={1}
                                                borderRadius="md"
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                            >
                                                {data.views} pregleda
                                            </Badge>
                                        </VStack>
                                    </Box>

                                    {/* Stats Grid */}
                                    <Grid
                                        templateColumns={{
                                            base: 'repeat(2, 1fr)',
                                            md: 'repeat(4, 1fr)',
                                        }}
                                        gap={{ base: 3, md: 4 }}
                                        p={{ base: 4, md: 6 }}
                                        bg="gray.800"
                                        borderBottom="1px solid"
                                        borderColor="white/20"
                                        boxShadow="inset 0 -2px 8px rgba(0,0,0,0.2)"
                                    >
                                        <GlowAnimation />
                                        <StatCard
                                            label="Ukupno Klipera"
                                            value={data.totalClippers ?? 0}
                                        />
                                        <StatCard
                                            label="Ukupno Video klipova"
                                            value={data.totalVideos ?? 0}
                                        />
                                        <StatCard
                                            label="Trajanje Kampanje"
                                            value={`${data.durationDays ?? 0} dana`}
                                        />
                                        <StatCard label="Ukupno Pregleda" value={data.views} />
                                    </Grid>

                                    {/* Detailed Analysis */}
                                    <Box px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
                                        <Heading fontSize={{ base: 'md', md: 'lg' }} mb={4}>
                                            Detaljna analiza
                                        </Heading>
                                        <Text
                                            color="gray.400"
                                            textAlign="left"
                                            fontSize={{ base: 'sm', md: 'md' }}
                                            lineHeight="1.7"
                                        >
                                            {data.text}
                                        </Text>
                                    </Box>

                                    {/* Top Video Link */}
                                    {data.topVideo?.link && (
                                        <Box
                                            px={{ base: 4, md: 6 }}
                                            pb={{ base: 6, md: 8 }}
                                            pt={{ base: 0, md: 0 }}
                                        >
                                            <Button
                                                asChild
                                                colorPalette="green"
                                                variant="solid"
                                                borderRadius="full"
                                                size={{ base: 'md', md: 'lg' }}
                                                w={{ base: 'full', sm: 'auto' }}
                                                px={{ base: 6, md: 8 }}
                                            >
                                                <a
                                                    href={data.topVideo.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span>Pogledaj najpopularniji klip</span>
                                                    <ExternalLink
                                                        size={18}
                                                        style={{ marginLeft: '8px' }}
                                                    />
                                                </a>
                                            </Button>
                                            <Text
                                                mt={2}
                                                color="gray.400"
                                                fontSize={{ base: 'xs', md: 'sm' }}
                                            >
                                                by {data.topVideo.clipper}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default CaseStudyModal;