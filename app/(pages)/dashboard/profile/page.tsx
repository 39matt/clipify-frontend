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
import { Global } from '@emotion/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';

import BalanceCard from './components/BalanceCard';
import ChangePasswordCard from './components/ChangePasswordCard';
import EditPaymentInfoCard from './components/EditPaymentInfoCard';
import { useAuth } from "@/app/lib/providers/AuthProvider";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

function DottedBackgroundGlobal() {
    return (
        <Global
            styles={`
                .profile-dotted-bg {
                    background-color: #000000;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
                    background-size: 22px 22px;
                    background-attachment: fixed;
                }
            `}
        />
    );
}

const Profile: NextPage = () => {
    const { user, loading } = useAuth();

    const handleLinkDiscord = async () => {
        if (!user?.email) {
            return;
        }

        if (user.discordUsername || user.connected) {
            alert(`Korisnik sa emailom "${user.email}" je već povezao nalog.`);
            return;
        }

        localStorage.setItem('userEmail', user.email);
        const params = new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
            redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
            response_type: 'code',
            scope: 'identify email',
            prompt: 'consent',
        });
        window.location.href = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
    };

    if (loading) {
        return (
            <Center minH="100vh" bg="black">
                <Spinner size="xl" color="red.500" />
            </Center>
        );
    }

    return (
        <>
            <DottedBackgroundGlobal />
            <Box
                className="profile-dotted-bg"
                minH="100vh"
                color="white"
                py={{ base: 6, md: 10 }}
                px={{ base: 4, md: 8 }}
                pb={{ base: 28, md: 12 }}
            >
                <Container maxW="6xl">
                    <MotionBox
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        mb={6}
                    >
                        <Card.Root
                            bg="gray.900/80"
                            backdropFilter="blur(8px)"
                            color="white"
                            border="1px solid"
                            borderColor="white/10"
                            borderRadius="xl"
                            p={{ base: 4, md: 5 }}
                        >
                            <Flex
                                direction={{ base: 'column', sm: 'row' }}
                                justify="space-between"
                                align={{ base: 'flex-start', sm: 'center' }}
                                gap={4}
                            >
                                <Flex align="center" gap={3}>
                                    <Center
                                        w={10}
                                        h={10}
                                        borderRadius="lg"
                                        bg="white/10"
                                        flexShrink={0}
                                    >
                                        <FaEnvelope size={16} />
                                    </Center>
                                    <Box>
                                        <Heading fontSize="md" fontWeight="800">
                                            Profil
                                        </Heading>
                                        <Text fontSize="xs" color="gray.400">
                                            {user?.email}
                                        </Text>
                                    </Box>
                                </Flex>

                                {!user?.discordUsername ? (
                                    <Button
                                        onClick={handleLinkDiscord}
                                        size="sm"
                                        bg="#7289da"
                                        color="white"
                                        border="none"
                                        borderRadius="full"
                                        px={4}
                                        fontWeight="700"
                                        fontSize="xs"
                                        _hover={{ bg: '#7289da' }}
                                    >
                                        <FaDiscord size={14} style={{ marginRight: '6px' }} />
                                        Poveži Discord
                                    </Button>
                                ) : (
                                    <Badge
                                        bg="#7289da/20"
                                        color="#7289da"
                                        border="1px solid"
                                        borderColor="#7289da/40"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        fontWeight="700"
                                        fontSize="2xs"
                                    >
                                        <FaDiscord size={12} style={{ marginRight: '4px', display: 'inline' }} />
                                        {user?.discordUsername}
                                    </Badge>
                                )}
                            </Flex>
                        </Card.Root>
                    </MotionBox>

                    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} alignItems="start">
                        <MotionVStack
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            gap={5}
                            align="stretch"
                        >
                            {user?.id && (
                                <BalanceCard
                                    balance={user?.balance ?? 0}
                                    uid={user.id}
                                    payoutRequested={user?.payoutRequested}
                                />
                            )}
                            {user?.id && (
                                <EditPaymentInfoCard
                                    discordUsername={user.discordUsername || user.id}
                                    user={user}
                                />
                            )}
                        </MotionVStack>

                        <MotionVStack
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            gap={5}
                            align="stretch"
                        >
                            <ChangePasswordCard user={user} />
                        </MotionVStack>
                    </SimpleGrid>
                </Container>
            </Box>
        </>
    );
};

export default Profile;