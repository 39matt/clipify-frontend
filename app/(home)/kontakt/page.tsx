'use client';

import {
    Alert,
    Card,
    HStack,
    Text,
    Input,
    Textarea,
    Button,
    VStack,
    Heading,
    Box,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import {BackgroundGradient} from "@/components/home/gradients/background-gradient";
import {PageTransition} from "@/components/home/motion/page-transition";
import {Section} from "@/components/home/section";
import {Logo} from "@/components/data/logo";

const Contact: NextPage = () => {
    const [state, handleSubmit] = useForm('mzzvzkvp');
    const formErrorsLength = state.errors?.getFormErrors()?.length ?? 0;

    return (
        <Section
            minH="90vh"
            display="flex"
            alignItems="center"
            mx="auto"
            pt={{ base: '120px', md: '140px' }}
        >
            <BackgroundGradient zIndex="-1" />

            <PageTransition width="100%">
                <VStack gap={8} align="center" mx="auto" w="full" maxW="container.md">
                    {/* Heading and Description */}
                    <Box textAlign="center">
                        <Heading size="lg" mb={4}>
                            Kontaktirajte nas
                        </Heading>
                        <Text fontSize="md" color="gray.500">
                            Imate pitanja ili želite da viralizujete vaš sadržaj? Pošaljite nam
                            poruku putem forme ispod.
                        </Text>
                    </Box>

                    {/* Contact Form */}
                    <Card.Root
                        flex="1"
                        maxW="600px"
                        w="full"
                        boxShadow="lg"
                        px="10px"
                        py="5px"
                    >
                        <Card.Header
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Logo
                                onClick={() => {}}
                                _hover={{ cursor: 'pointer' }}
                                width={{ base: '150px', md: '240px' }}
                            />
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <VStack gap={4}>
                                    <Input name="name" placeholder="Ime" required />
                                    <ValidationError
                                        prefix="Name"
                                        field="name"
                                        errors={state.errors}
                                    />

                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                    <ValidationError
                                        prefix="Email"
                                        field="email"
                                        errors={state.errors}
                                    />

                                    <Textarea name="message" placeholder="Poruka" required />
                                    <ValidationError
                                        prefix="Message"
                                        field="message"
                                        errors={state.errors}
                                    />

                                    <Button
                                        type="submit"
                                        colorPalette="green"
                                        loading={state.submitting}
                                        w="full"
                                    >
                                        Pošalji
                                    </Button>
                                </VStack>

                                {state.succeeded && (
                                    <Alert.Root status="success" mt={4}>
                                        <Alert.Indicator />
                                        <Alert.Title>Vaša poruka je uspešno poslata!</Alert.Title>
                                    </Alert.Root>
                                )}

                                {formErrorsLength > 0 && (
                                    <Alert.Root status="error" mt={4}>
                                        <Alert.Indicator />
                                        <Alert.Title>
                                            Došlo je do greške. Pokušajte ponovo.
                                        </Alert.Title>
                                    </Alert.Root>
                                )}
                            </form>
                        </Card.Body>
                    </Card.Root>

                    {/* Additional Contact Information */}
                    <Box textAlign="center">
                        <Heading size="md" mb={4}>
                            Ili nas kontaktirajte direktno mejlom:
                        </Heading>
                        <VStack gap={4}>
                            <HStack gap={4}>
                                <FiMail size={24} style={{ color: 'var(--chakra-colors-green-500)' }} />
                                <Link passHref href="mailto:kontakt@clipify.rs">
                                    <Text fontSize="md" color="gray.500">
                                        kontakt@clipify.rs
                                    </Text>
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </PageTransition>
        </Section>
    );
};

export default Contact;