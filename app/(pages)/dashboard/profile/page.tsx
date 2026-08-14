'use client';

import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';

import BalanceCard from './components/BalanceCard';
import ChangePasswordCard from './components/ChangePasswordCard';
import EditPaymentInfoCard from './components/EditPaymentInfoCard';
import { useAuth } from "@/app/lib/providers/AuthProvider";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

const Profile: NextPage = () => {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return (
            <Center minH="100vh" bg="black">
                <Spinner size="xl" color="red.500" />
            </Center>
        )
    }

    return (
        <Box
            minH="100vh"
            bg="black"
            color="white"
            py={{ base: 10, md: 16 }}
            px={{ base: 4, md: 8 }}
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="-10%"
                left="-10%"
                w="500px"
                h="500px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(239, 68, 68, 0.08), transparent 70%)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="-10%"
                w="600px"
                h="600px"
                borderRadius="full"
                backgroundImage="radial-gradient(circle, rgba(114, 137, 218, 0.06), transparent 70%)"
                pointerEvents="none"
            />

            <Container maxW="6xl" position="relative" zIndex={1}>
                <MotionVStack
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    gap={4}
                    mb={{ base: 10, md: 14 }}
                    textAlign="center"
                >
                    <Badge
                        bg="red.500"
                        color="white"
                        px={4}
                        py={1}
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="900"
                        textTransform="uppercase"
                        letterSpacing="wider"
                    >
                        NAŠ KORISNIK
                    </Badge>

                    <Heading
                        fontSize={{ base: '32px', md: '48px', lg: '56px' }}
                        fontWeight="900"
                        letterSpacing="-0.03em"
                        lineHeight="1.1"
                    >
                        Korisnički{' '}
                        <Box
                            as="span"
                            color="white"
                            backgroundImage="linear-gradient(to right, rgba(252, 165, 165, 0.9), rgba(252, 165, 165, 0.2))"
                            borderLeft="6px solid"
                            borderColor="red.500"
                            pl={3}
                            ml={1}
                        >
                            Profil
                        </Box>
                    </Heading>

                    <Text color="gray.400" fontSize={{ base: 'md', md: 'xl' }} maxW="xl">
                        Upravljaj svojim informacijama, isplatama i podešavanjima naloga.
                    </Text>
                </MotionVStack>

                <VStack gap={8} w="full">
                    {/* Basic Info & Discord Link Card */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        w="full"
                    >
                        <Card.Root
                            bg="gray.900"
                            color="white"
                            border="2px solid"
                            borderColor="white/15"
                            borderRadius="2xl"
                            p={{ base: 6, md: 8 }}
                            boxShadow="0 20px 60px rgba(0,0,0,0.4)"
                            transition="all 0.3s ease"
                            _hover={{ borderColor: 'white/30' }}
                        >
                            <Card.Header
                                p={0}
                                mb={6}
                                display="flex"
                                flexDirection={{ base: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems={{ base: 'flex-start', sm: 'center' }}
                                gap={4}
                            >
                                <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900">
                                    Osnovne Informacije
                                </Heading>

                                {!profile?.discordUsername ? (
                                    <Button
                                        onClick={() => {}}
                                        bg="#7289da"
                                        color="white"
                                        border="none"
                                        borderRadius="full"
                                        px={6}
                                        py={5}
                                        fontWeight="700"
                                        fontSize="sm"
                                        _hover={{
                                            bg: '#5b6eae',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 8px 20px rgba(114, 137, 218, 0.3)',
                                        }}
                                        transition="all 0.25s ease"
                                    >
                                        <FaDiscord size={18} style={{ marginRight: '8px' }} />
                                        Poveži Discord
                                    </Button>
                                ) : (
                                    <Badge
                                        bg="#7289da/20"
                                        color="#7289da"
                                        border="1px solid"
                                        borderColor="#7289da/40"
                                        px={4}
                                        py={1.5}
                                        borderRadius="full"
                                        fontWeight="700"
                                        fontSize="xs"
                                    >
                                        Discord Povezan
                                    </Badge>
                                )}
                            </Card.Header>

                            <Card.Body p={0}>
                                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                                    <Flex
                                        align="center"
                                        gap={4}
                                        p={4}
                                        borderRadius="xl"
                                        bg="white/5"
                                        border="1px solid"
                                        borderColor="white/10"
                                    >
                                        <Flex
                                            w={12}
                                            h={12}
                                            borderRadius="xl"
                                            bg="white/10"
                                            align="center"
                                            justify="center"
                                            color="white"
                                        >
                                            <FaEnvelope size={20} />
                                        </Flex>
                                        <Box>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="700"
                                                color="gray.400"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Email Adresa
                                            </Text>
                                            <Text fontWeight="800" fontSize="md" color="white">
                                                {user?.email}
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Flex
                                        align="center"
                                        gap={4}
                                        p={4}
                                        borderRadius="xl"
                                        bg="white/5"
                                        border="1px solid"
                                        borderColor="white/10"
                                    >
                                        <Flex
                                            w={12}
                                            h={12}
                                            borderRadius="xl"
                                            bg="#7289da/20"
                                            align="center"
                                            justify="center"
                                            color="#7289da"
                                        >
                                            <FaDiscord size={22} />
                                        </Flex>
                                        <Box>
                                            <Text
                                                fontSize="xs"
                                                fontWeight="700"
                                                color="gray.400"
                                                textTransform="uppercase"
                                                letterSpacing="wider"
                                            >
                                                Discord Korisnik
                                            </Text>
                                            <Text
                                                fontWeight="800"
                                                fontSize="md"
                                                color={profile?.discordUsername ? '#7289da' : 'red.400'}
                                            >
                                                {profile?.discordUsername || 'Nije povezan'}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </SimpleGrid>
                            </Card.Body>
                        </Card.Root>
                    </MotionBox>

                    {/* Payment Info & Password Change Row */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        w="full"
                    >
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} w="full">
                            {user?.id && (
                                <EditPaymentInfoCard
                                    discordUsername={profile?.discordUsername || user.id}
                                    userInfo={profile}
                                />
                            )}
                            <ChangePasswordCard user={profile} />
                        </SimpleGrid>
                    </MotionBox>

                    {/* Balance / Isplata Section */}
                    {user?.id && (
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            w="full"
                        >
                            <BalanceCard
                                balance={profile?.balance ?? 0}
                                uid={user.id}
                                payoutRequested={profile?.payoutRequested}
                            />
                        </MotionBox>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default Profile;