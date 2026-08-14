'use client'

import React from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    HStack,
    Heading,
    Input,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { FiMail, FiSend } from 'react-icons/fi'
import { useForm, ValidationError } from '@formspree/react'
import { PageTransition } from '@/components/home/motion/page-transition'
import { Logo } from '@/components/data/logo'
import {Section} from "@/app/(home)/kontakt/components/section";

const Contact: NextPage = () => {
    const [state, handleSubmit] = useForm('mzzvzkvp')
    const formErrorsLength = state.errors?.getFormErrors()?.length ?? 0

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleSubmit(e)
        if (state.succeeded) {
            e.currentTarget.reset()
        }
    }

    return (
        <Section
            minH="90vh"
            display="flex"
            alignItems="center"
            mx="auto"
            pt={{ base: '120px', md: '140px' }}
            pb={{ base: '80px', md: '100px' }}
        >

            <PageTransition width="100%">
                <VStack gap={8} align="center" mx="auto" w="full" maxW="container.md">
                    {/* Naslov i Opis */}
                    <Box textAlign="center">
                        <Heading
                            fontSize={{ base: '3xl', md: '4xl' }}
                            fontWeight="900"
                            color="white"
                            mb={3}
                            letterSpacing="-0.02em"
                        >
                            Kontaktirajte nas
                        </Heading>
                        <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.400" maxW="500px" mx="auto">
                            Imate pitanja ili želite da viralizujete vaš sadržaj? Pošaljite nam
                            poruku putem forme ispod.
                        </Text>
                    </Box>

                    {/* Kontakt Forma */}
                    <Card.Root
                        w="full"
                        maxW="580px"
                        bg="gray.900"
                        color="white"
                        border="2px solid"
                        borderColor="white/15"
                        borderRadius="2xl"
                        p={{ base: 6, md: 8 }}
                        boxShadow="0 20px 60px rgba(0,0,0,0.5)"
                        transition="all 0.3s ease"
                        _hover={{ borderColor: 'red.500/30' }}
                    >
                        <Card.Header
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p={0}
                            mb={6}
                        >
                            <Logo
                                onClick={() => {}}
                                _hover={{ cursor: 'pointer' }}
                                width={{ base: '140px', md: '200px' }}
                            />
                        </Card.Header>

                        <Card.Body p={0}>
                            <form onSubmit={handleFormSubmit}>
                                <VStack gap={4} align="stretch">
                                    <VStack gap={2} align="stretch">
                                        <Input
                                            name="name"
                                            placeholder="Vaše ime"
                                            required
                                            bg="white/5"
                                            border="1px solid"
                                            borderColor="white/10"
                                            borderRadius="xl"
                                            color="white"
                                            h="50px"
                                            fontSize="sm"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ borderColor: 'red.500/50' }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                bg: 'white/10',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                            }}
                                        />
                                        <ValidationError
                                            prefix="Name"
                                            field="name"
                                            errors={state.errors}
                                        />
                                    </VStack>

                                    <VStack gap={2} align="stretch">
                                        <Input
                                            name="email"
                                            type="email"
                                            placeholder="Vaša email adresa"
                                            required
                                            bg="white/5"
                                            border="1px solid"
                                            borderColor="white/10"
                                            borderRadius="xl"
                                            color="white"
                                            h="50px"
                                            fontSize="sm"
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ borderColor: 'red.500/50' }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                bg: 'white/10',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                            }}
                                        />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </VStack>

                                    <VStack gap={2} align="stretch">
                                        <Textarea
                                            name="message"
                                            placeholder="Napišite vašu poruku..."
                                            required
                                            rows={5}
                                            bg="white/5"
                                            border="1px solid"
                                            borderColor="white/10"
                                            borderRadius="xl"
                                            color="white"
                                            fontSize="sm"
                                            p={4}
                                            _placeholder={{ color: 'gray.500' }}
                                            _hover={{ borderColor: 'red.500/50' }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                bg: 'white/10',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                            }}
                                        />
                                        <ValidationError
                                            prefix="Message"
                                            field="message"
                                            errors={state.errors}
                                        />
                                    </VStack>

                                    <Button
                                        type="submit"
                                        loading={state.submitting}
                                        loadingText="Slanje..."
                                        disabled={state.submitting}
                                        bg="red.500"
                                        color="white"
                                        border="none"
                                        w="full"
                                        h="52px"
                                        mt={2}
                                        borderRadius="xl"
                                        fontWeight="800"
                                        fontSize="md"
                                        _hover={{
                                            bg: 'red.600',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 20px rgba(239, 68, 68, 0.35)',
                                        }}
                                        _active={{ transform: 'translateY(0)' }}
                                        transition="all 0.2s"
                                    >
                                        <FiSend size={18} style={{ marginRight: '8px' }} />
                                        Pošalji Poruku
                                    </Button>

                                    {state.succeeded && (
                                        <Alert.Root
                                            status="success"
                                            borderRadius="xl"
                                            bg="green.500/10"
                                            border="1px solid"
                                            borderColor="green.500/30"
                                            p={4}
                                            mt={2}
                                        >
                                            <Alert.Indicator color="green.400" />
                                            <Alert.Title fontSize="sm" fontWeight="700" color="green.300">
                                                Vaša poruka je uspešno poslata! Javiti ćemo vam se ubrzo.
                                            </Alert.Title>
                                        </Alert.Root>
                                    )}

                                    {formErrorsLength > 0 && (
                                        <Alert.Root
                                            status="error"
                                            borderRadius="xl"
                                            bg="red.500/10"
                                            border="1px solid"
                                            borderColor="red.500/30"
                                            p={4}
                                            mt={2}
                                        >
                                            <Alert.Indicator color="red.400" />
                                            <Alert.Title fontSize="sm" fontWeight="700" color="red.300">
                                                Došlo je do greške pri slanju. Pokušajte ponovo.
                                            </Alert.Title>
                                        </Alert.Root>
                                    )}
                                </VStack>
                            </form>
                        </Card.Body>
                    </Card.Root>

                    {/* Direktni email kontakt */}
                    <Box textAlign="center" pt={4}>
                        <Text fontSize="sm" color="gray.400" fontWeight="600" mb={3}>
                            Ili nas kontaktirajte direktno putem email-a:
                        </Text>
                        <NextLink href="mailto:kontakt@clipify.rs" style={{ textDecoration: 'none' }}>
                            <HStack
                                gap={3}
                                display="inline-flex"
                                px={5}
                                py={3}
                                borderRadius="full"
                                bg="white/5"
                                border="1px solid"
                                borderColor="white/10"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'white/10',
                                    borderColor: 'red.500/40',
                                    transform: 'translateY(-1px)',
                                }}
                            >
                                <FiMail size={18} style={{ color: '#EF4444' }} />
                                <Text fontSize="sm" color="white" fontWeight="700">
                                    kontakt@clipify.rs
                                </Text>
                            </HStack>
                        </NextLink>
                    </Box>
                </VStack>
            </PageTransition>
        </Section>
    )
}

export default Contact