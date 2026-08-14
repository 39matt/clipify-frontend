'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';

interface StatItemProps {
    end: number;
    duration?: number;
    format: (n: number) => string;
    label: string;
}

const StatItem = ({ end, duration = 5000, format, label }: StatItemProps) => {
    const [value, setValue] = useState(0);
    const [started, setStarted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !started) {
                        setStarted(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;

        const start = performance.now();
        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(end * eased);
            if (progress < 1) requestAnimationFrame(tick);
        };
        const r = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(r);
    }, [started, duration, end]);

    return (
        <VStack
            ref={containerRef}
            gap={1}
            align="start"
            borderLeft="3px solid"
            borderColor="black"
            pl={4}
        >
            <Heading
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                lineHeight="1"
                color="black"
            >
                {format(value)}
            </Heading>
            <Text color="gray.600" fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}>
                {label}
            </Text>
        </VStack>
    );
};

export const StatsSection = () => {
    const targets = {
        dinara: 2_000_000,
        klipera: 1_250,
        pregleda: 500_000_000,
        kampanja: 40,
    };

    const formatInt = (n: number) => Math.floor(n).toLocaleString('sr-RS');

    const formatCompact = (n: number) => {
        const v = Math.floor(n);
        if (v >= 1_000_000)
            return (v / 1_000_000).toFixed(1).replace('.0', '') + 'M';
        if (v >= 1_000) return (v / 1_000).toFixed(0) + 'K';
        return v.toString();
    };

    return (
        <Box py={{ base: 12, md: 20 }} bg="white">
            <Container maxW="7xl">
                <Grid
                    templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }}
                    gap={{ base: 6, md: 10 }}
                >
                    <GridItem>
                        <StatItem
                            end={targets.dinara}
                            format={(n) => `${formatInt(n)}+`}
                            label="Dinara isplaćeno kliperima"
                        />
                    </GridItem>

                    <GridItem>
                        <StatItem
                            end={targets.klipera}
                            format={(n) => `${formatInt(n)}+`}
                            label="Aktivnih klipera"
                        />
                    </GridItem>

                    <GridItem>
                        <StatItem
                            end={targets.pregleda}
                            format={(n) => `${formatCompact(n)}+`}
                            label="Organskih pregleda"
                        />
                    </GridItem>

                    <GridItem>
                        <StatItem
                            end={targets.kampanja}
                            format={(n) => `${formatInt(n)}`}
                            label="Pokrenutih kampanja"
                        />
                    </GridItem>
                </Grid>
            </Container>
        </Box>
    );
};

export default StatsSection;