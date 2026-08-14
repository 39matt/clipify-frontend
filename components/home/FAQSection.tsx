'use client';

import React from 'react';
import {
    AccordionRoot,
    AccordionItem,
    AccordionItemTrigger,
    AccordionItemContent,
    AccordionItemContext,
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

interface FaqColumnProps {
    title: string;
    items: { q: string; a: string }[];
    ctaButtonText: string;
    ctaButtonLink: string;
    accentColor: string;
}

const FaqColumn: React.FC<FaqColumnProps> = ({
                                                 title,
                                                 items,
                                                 ctaButtonText,
                                                 ctaButtonLink,
                                                 accentColor,
                                             }) => {
    const isDiscord = ctaButtonText.includes('Discord');

    return (
        <Box>
            {/* Title with left accent line */}
            <Heading
                fontSize={{ base: 'xl', md: '3xl' }}
                mb={8}
                color="white"
                fontWeight="900"
                letterSpacing="-0.02em"
                position="relative"
                pl={4}
                _before={{
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '70%',
                    bg: accentColor,
                    borderRadius: 'full',
                }}
            >
                {title}
            </Heading>

            {/* Accordion list */}
            <AccordionRoot
                collapsible
                defaultValue={[]}
                display="flex"
                flexDirection="column"
                gap={4}
            >
                {items.map((faq, i) => (
                    <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        border="2px solid"
                        borderColor="white/20"
                        borderRadius="xl"
                        overflow="hidden"
                        bg="white/5"
                        transition="all 0.3s ease"
                        _hover={{
                            borderColor: accentColor,
                            bg: 'white/10',
                            transform: { base: 'none', md: 'translateX(4px)' },
                        }}
                    >
                        <AccordionItemTrigger
                            p={{ base: 4, md: 6 }}
                            justifyContent="space-between"
                            alignItems="center"
                            _hover={{ bg: 'white/10' }}
                            cursor="pointer"
                        >
                            <Heading
                                fontSize={{ base: 'xs', md: 'sm' }}
                                color="white"
                                fontWeight="700"
                                letterSpacing="-0.01em"
                                textAlign="left"
                                pr={4}
                            >
                                {faq.q}
                            </Heading>

                            {/* Custom + Badge that rotates to 45deg (+) -> (x) when expanded */}
                            <AccordionItemContext>
                                {(context) => (
                                    <Flex
                                        w="32px"
                                        h="32px"
                                        borderRadius="md"
                                        bg={context.open ? accentColor : 'white/20'}
                                        align="center"
                                        justify="center"
                                        flexShrink={0}
                                        transition="all 0.3s ease"
                                    >
                                        <Box
                                            as="span"
                                            fontSize="xl"
                                            lineHeight="1"
                                            color="white"
                                            fontWeight="bold"
                                            transform={
                                                context.open ? 'rotate(45deg)' : 'rotate(0deg)'
                                            }
                                            transition="transform 0.3s ease"
                                        >
                                            +
                                        </Box>
                                    </Flex>
                                )}
                            </AccordionItemContext>
                        </AccordionItemTrigger>

                        <AccordionItemContent
                            px={{ base: 4, md: 6 }}
                            pb={{ base: 4, md: 6 }}
                            pt={2}
                            color="gray.300"
                            fontSize={{ base: 'sm', md: 'md' }}
                            lineHeight="1.8"
                        >
                            {faq.a}
                        </AccordionItemContent>
                    </AccordionItem>
                ))}
            </AccordionRoot>

            {/* Column CTA Button */}
            <Flex justify="center" mt={10}>
                <Button
                    asChild
                    variant="solid"
                    border="none"
                    size={{ base: 'md', md: 'lg' }}
                    w={{ base: 'full', md: '85%' }}
                    bg="white"
                    color="black"
                    borderRadius="full"
                    px={{ base: 6, md: 10 }}
                    py={{ base: 6, md: 8 }}
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="700"
                    boxShadow="0px 8px 24px rgba(255,255,255,0.15)"
                    _hover={{
                        bg: accentColor,
                        color: 'white',
                        transform: 'translateY(-4px)',
                        boxShadow: `0px 12px 32px ${
                            accentColor === 'red.500'
                                ? 'rgba(239, 68, 68, 0.4)'
                                : 'rgba(114, 137, 218, 0.4)'
                        }`,
                    }}
                    transition="all 0.3s ease"
                >
                    <a
                        href={ctaButtonLink}
                        target={isDiscord ? '_blank' : undefined}
                        rel={isDiscord ? 'noopener noreferrer' : undefined}
                        onClick={(e) => {
                            if (ctaButtonLink.startsWith('#')) {
                                e.preventDefault();
                                document.querySelector(ctaButtonLink)?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }
                        }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {isDiscord ? (
                            <FaDiscord size={22} style={{ marginRight: '8px' }} />
                        ) : (
                            <Calendar size={20} style={{ marginRight: '8px' }} />
                        )}
                        <span>{ctaButtonText}</span>
                    </a>
                </Button>
            </Flex>
        </Box>
    );
};

export const FAQSection = () => {
    const clipperFaqs = [
        {
            q: 'Kako mogu postati Kliper?',
            a: 'Pridruži se našoj Discord zajednici gde možeš dobiti pristup novim kampanjama. Nakon povezivanja Discord naloga sa sajtom i povezivanja društvenih mreža, možeš da klipuješ odmah.',
        },
        {
            q: 'Kako funkcioniše plaćanje?',
            a: 'Zarađuješ po svojim performansama - za stvarne preglede i engagement. Isplate se vrše na kraju kampanje putem crypta.',
        },
        {
            q: 'Da li mogu učestvovati u više kampanja odjednom?',
            a: 'Da, moguće je pridružiti se svim dostupnim kampanjama i raditi paralelno na više njih.',
        },
    ];

    const creatorFaqs = [
        {
            q: 'Šta mi je potrebno da bih započeo?',
            a: 'Sve što nam je potrebno je vaš sadržaj i jasna vizija vašeg brenda. Nakon toga, naš tim se bavi kompletnim procesom podešavanja kampanje.',
        },
        {
            q: 'Šta treba da radim tokom kampanje?',
            a: 'Nije potreban nikakav dodatni posao sa vaše strane. Mi upravljamo svime - od izgradnje kampanje do kompletnog upravljanja kliperima (video-editorima).',
        },
        {
            q: 'Šta mogu da očekujem?',
            a: 'Brendirane stranice prilagođene vašim ciljevima, milione organskih pregleda, vaš Dashboard sa svim analitičkim podacima, 24/7 podršku našeg tima i rast društvenih mreža sa novim potencijalnim klijentima.',
        },
    ];

    return (
        <Flex
            id="faq"
            align="center"
            minH="80vh"
            as="section"
            bg="gray.900"
            color="white"
            py={{ base: 20, md: 28 }}
            position="relative"
            overflow="hidden"
        >
            {/* Background accents */}
            <Box
                position="absolute"
                top="20%"
                left="-10%"
                w="500px"
                h="500px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(114, 137, 218, 0.06), transparent 70%)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="20%"
                right="-10%"
                w="500px"
                h="500px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(239, 68, 68, 0.08), transparent 70%)"
                pointerEvents="none"
            />

            <Container maxW="7xl" position="relative" zIndex={1}>
                <MotionVStack
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    gap={4}
                    mb={{ base: 12, md: 20 }}
                    textAlign="center"
                >
                    <Text
                        fontSize="sm"
                        letterSpacing="0.15em"
                        textTransform="uppercase"
                        color="gray.500"
                        fontWeight="600"
                    >
                        FAQ
                    </Text>
                    <Heading
                        fontWeight="900"
                        letterSpacing="-0.03em"
                        fontSize={{ base: '32px', md: '48px', lg: '56px' }}
                        color="white"
                        lineHeight="1.1"
                    >
                        Česta{' '}
                        <Box as="span" position="relative" zIndex={1}>
                            Pitanja
                        </Box>
                    </Heading>
                    <Text
                        color="gray.400"
                        fontSize={{ base: 'md', md: 'xl' }}
                        maxW="2xl"
                        lineHeight="1.6"
                        px={{ base: 4, md: 0 }}
                    >
                        Sve što treba da znaš - bilo da kreiraš sadržaj ili klipuješ ga.
                    </Text>
                </MotionVStack>

                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                    gap={{ base: 10, md: 12 }}
                    alignItems="start"
                >
                    <MotionBox
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <FaqColumn
                            title="Za Klipere"
                            items={clipperFaqs}
                            ctaButtonText="Pridruži se našem Discordu"
                            ctaButtonLink="https://discord.com/invite/clipifyrs"
                            accentColor="#7289da"
                        />
                    </MotionBox>

                    <MotionBox
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <FaqColumn
                            title="Za Kreatore"
                            items={creatorFaqs}
                            ctaButtonText="Zakažite poziv"
                            ctaButtonLink="#kontakt"
                            accentColor="red.500"
                        />
                    </MotionBox>
                </Grid>
            </Container>
        </Flex>
    );
};

export default FAQSection;