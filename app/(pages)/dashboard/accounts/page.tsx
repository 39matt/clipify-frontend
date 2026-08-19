'use client';

import {
    Box,
    Button,
    Card,
    Center,
    Container,
    Dialog,
    Flex,
    Heading,
    Icon,
    Input,
    Portal,
    SimpleGrid,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FiPlus, FiShare2 } from 'react-icons/fi';
import { useAuth } from "@/app/lib/providers/AuthProvider";
import { apiFetch } from "@/app/lib/apiClient";
import AccountCard from "@/app/(pages)/dashboard/accounts/components/AccountCard";

const MotionBox = motion.create(Box);

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

const ConnectedAccounts: NextPage = () => {
    const { open: isOpen, onOpen, onClose } = useDisclosure();
    const [accountLink, setAccountLink] = useState('');
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verifyingId, setVerifyingId] = useState<string | null>(null);
    const [cardMessage, setCardMessage] = useState<{ id: string; text: string; isError: boolean } | null>(null);
    const { user } = useAuth();

    const unverifiedCount = accounts.filter((acc) => !acc.verifiedAt).length;

    const instagramAccountLimit = 5;
    const tiktokAccountLimit = 5;
    const youtubeAccountLimit = 5;

    const refetchAccounts = async () => {
        const res = await apiFetch('/users/accounts', { method: 'GET' });
        if (res.ok) {
            const fetchedAccounts = (await res.json()) as IAccount[];
            setAccounts(fetchedAccounts);
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (user) {
            apiFetch('/users/accounts', { method: 'GET' })
                .then(async (response) => {
                    if (response.ok && isMounted) {
                        const fetchedAccounts = (await response.json()) as IAccount[];
                        setAccounts(fetchedAccounts);
                    }
                })
                .catch((error) => console.error('Error fetching accounts:', error));
        }

        return () => {
            isMounted = false;
        };
    }, [user]);

    const resetModalState = () => {
        setAccountLink('');
        setMessage('');
        setIsSubmitting(false);
    };

    const handleOpenModal = () => {
        resetModalState();
        onOpen();
    };

    const handleCloseModal = () => {
        resetModalState();
        onClose();
    };

    const handleAddAccount = async () => {
        try {
            setMessage('');
            setIsSubmitting(true);

            if (accounts.length >= tiktokAccountLimit + instagramAccountLimit + youtubeAccountLimit) {
                setMessage('Maksimalan ukupan broj naloga je dostignut.');
                setIsSubmitting(false);
                return;
            }

            const instagramRegex = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.-]+\/?$/;
            const tiktokRegex = /^https:\/\/(www\.)?tiktok\.com\/@?[a-zA-Z0-9_.-]+\/?$/;
            const youtubeRegex = /^https:\/\/(www\.)?youtube\.com\/@?[a-zA-Z0-9_.-]+\/?$/;

            if (
                !instagramRegex.test(accountLink) &&
                !tiktokRegex.test(accountLink) &&
                !youtubeRegex.test(accountLink)
            ) {
                setMessage('Uneti link nije validan. Molimo unesite ispravan link naloga.');
                setIsSubmitting(false);
                return;
            }

            let username = '';
            let platform = '';

            if (accountLink.includes('tiktok.com')) {
                if (accounts.filter((acc) => acc.platform === 'TikTok').length >= tiktokAccountLimit) {
                    setMessage('Možeš imati maksimalno 5 TikTok naloga.');
                    setIsSubmitting(false);
                    return;
                }
                if (accountLink.includes('@')) {
                    username = accountLink.split('@')[1].replace('/', '');
                } else {
                    const parts = accountLink.split('/');
                    username = parts[parts.length - 1] || parts[parts.length - 2];
                }
                platform = 'TikTok';
            } else if (accountLink.includes('instagram.com')) {
                if (accounts.filter((acc) => acc.platform === 'Instagram').length >= instagramAccountLimit) {
                    setMessage('Možeš imati maksimalno 5 Instagram naloga.');
                    setIsSubmitting(false);
                    return;
                }
                const parts = accountLink.split('/').filter((part) => part !== '');
                username = parts[parts.length - 1];
                platform = 'Instagram';
            } else {
                if (accounts.filter((acc) => acc.platform === 'YouTube').length >= youtubeAccountLimit) {
                    setMessage('Možeš imati maksimalno 5 YouTube naloga.');
                    setIsSubmitting(false);
                    return;
                }
                const parts = accountLink.split('@').filter((part) => part !== '');
                username = parts[parts.length - 1].includes('?')
                    ? parts[parts.length - 1].split('?')[0]
                    : parts[parts.length - 1];
                platform = 'YouTube';
            }

            if (!username || username.trim() === '') {
                setMessage('Nije moguće izdvojiti korisničko ime iz linka.');
                setIsSubmitting(false);
                return;
            }

            const searchRes = await apiFetch('/users/accounts/search', {
                method: 'POST',
                body: JSON.stringify({ platform, username }),
            });

            if (searchRes.ok) {
                const searchData = await searchRes.json();
                if (searchData && Object.keys(searchData).length > 0) {
                    setMessage('Nalog se već koristi.');
                    setIsSubmitting(false);
                    return;
                }
            }

            const response = await apiFetch('/users/accounts', {
                method: 'POST',
                body: JSON.stringify({ platform, username }),
            });

            if (response.ok) {
                await refetchAccounts();
                setMessage('Nalog je uspešno kreiran. Unesite kod u bio i kliknite na verifikaciju na kartici naloga.');
                setTimeout(() => {
                    handleCloseModal();
                }, 1800);
            } else {
                setMessage('Greška prilikom dodavanja naloga.');
            }
        } catch (error) {
            console.error('Greška prilikom dodavanja naloga:', error);
            setMessage('Dodavanje naloga nije uspelo. Pokušajte ponovo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyAccount = async (account: IAccount) => {
        console.log(account)
        if (!account.id) return;

        try {
            setVerifyingId(account.id);
            setCardMessage(null);

            const response = await apiFetch('/users/accounts/verify', {
                method: 'PATCH',
                body: JSON.stringify({
                    accountId: account.id
                }),
            });

            if (response.ok) {
                setCardMessage({ id: account.id, text: 'Nalog je uspešno verifikovan!', isError: false });
                await refetchAccounts();
            } else {
                setCardMessage({ id: account.id, text: 'Kod se ne nalazi u opisu profila. Pokušajte ponovo.', isError: true });
            }
        } catch (error) {
            console.error('Greška prilikom verifikacije naloga:', error);
            setCardMessage({ id: account.id, text: 'Verifikacija nije uspela. Proverite kod u opisu profila.', isError: true });
        } finally {
            setVerifyingId(null);
        }
    };

    const handleDeleteAccount = async (accountId?: string) => {
        console.log(accountId)
        if (!accountId) return;
        try {
            const response = await apiFetch('/users/accounts', {
                method: 'DELETE',
                body: JSON.stringify({ accountId: accountId }),
            });
            if (response.ok) {
                await refetchAccounts();
            }
        } catch (error) {
            console.error('Greška pri brisanju naloga:', error);
        }
    };

    return (
        <>
            <DottedBackgroundGlobal />
            <Box
                className="profile-dotted-bg"
                minH="100vh"
                color="white"
                py={{ base: 6, md: 10 }}
                px={{ base: 4, md: 8 }}
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
                                        <Icon color="green.400" boxSize={5}>
                                            <FiShare2 />
                                        </Icon>
                                    </Center>
                                    <Box>
                                        <Heading fontSize="md" fontWeight="800">
                                            Povezani nalozi
                                        </Heading>
                                        <Text fontSize="xs" color="gray.400">
                                            {unverifiedCount > 0
                                                ? `Imate ${unverifiedCount} nalog(a) koji čekaju verifikaciju`
                                                : 'Upravljajte povezanim profilima na društvenim mrežama'}
                                        </Text>
                                    </Box>
                                </Flex>

                                <Button
                                    onClick={handleOpenModal}
                                    size="sm"
                                    bg="green.500"
                                    color="white"
                                    border="none"
                                    borderRadius="full"
                                    px={4}
                                    fontWeight="700"
                                    fontSize="xs"
                                    _hover={{ bg: 'green.600' }}
                                >
                                    <FiPlus style={{ marginRight: '6px' }} />
                                    Poveži Nalog
                                </Button>
                            </Flex>
                        </Card.Root>
                    </MotionBox>

                    <MotionBox
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        {accounts && accounts.length > 0 ? (
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w="full">
                                {accounts.map((account, index) => (
                                    <Box key={account.id || index}>
                                        <AccountCard
                                            account={account}
                                            index={index}
                                            onDelete={() => handleDeleteAccount(account.id)}
                                            onVerify={() => handleVerifyAccount(account)}
                                            isVerifying={verifyingId === account.id}
                                        />
                                        {cardMessage && cardMessage.id === account.id && (
                                            <Text
                                                mt={2}
                                                fontSize="xs"
                                                color={cardMessage.isError ? 'red.400' : 'green.400'}
                                                fontWeight={cardMessage.isError ? 'normal' : 'bold'}
                                                textAlign="center"
                                            >
                                                {cardMessage.text}
                                            </Text>
                                        )}
                                    </Box>
                                ))}
                            </SimpleGrid>
                        ) : (
                            <Card.Root
                                bg="gray.900/80"
                                backdropFilter="blur(8px)"
                                color="white"
                                border="1px solid"
                                borderColor="white/10"
                                borderRadius="xl"
                                p={10}
                                textAlign="center"
                            >
                                <Center flexDir="column">
                                    <Center
                                        w={14}
                                        h={14}
                                        borderRadius="full"
                                        bg="green.500/10"
                                        color="green.400"
                                        mb={4}
                                    >
                                        <Icon boxSize={6}>
                                            <FiPlus />
                                        </Icon>
                                    </Center>
                                    <Heading size="md" color="white" fontWeight="800">
                                        Nema Povezanih Naloga
                                    </Heading>
                                    <Text fontSize="xs" color="gray.400" mt={2} maxW="sm">
                                        Povežite svoje naloge na društvenim mrežama kako biste započeli praćenje i analitiku.
                                    </Text>
                                    <Button
                                        mt={5}
                                        onClick={handleOpenModal}
                                        size="sm"
                                        bg="green.500"
                                        color="white"
                                        borderRadius="full"
                                        px={5}
                                        fontWeight="700"
                                        fontSize="xs"
                                        _hover={{ bg: 'green.600' }}
                                    >
                                        Dodaj prvi nalog
                                    </Button>
                                </Center>
                            </Card.Root>
                        )}
                    </MotionBox>
                </Container>
            </Box>

            <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleCloseModal()}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content bg="gray.900" color="white" border="1px solid" borderColor="white/10" borderRadius="xl">
                            <Dialog.Header>
                                <Dialog.Title fontWeight="800" fontSize="md">
                                    Dodajte TikTok / Instagram / YouTube nalog
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.CloseTrigger />
                            <Dialog.Body>
                                <Text fontSize="xs" color="gray.400" mb={2}>
                                    Link ka vašem nalogu:
                                </Text>
                                <Input
                                    placeholder="https://tiktok.com/@username"
                                    value={accountLink}
                                    onChange={(e) => setAccountLink(e.target.value)}
                                    bg="black/50"
                                    borderColor="white/10"
                                    borderRadius="lg"
                                    _placeholder={{ color: 'gray.500' }}
                                />

                                {message && (
                                    <Text
                                        mt={4}
                                        fontSize="xs"
                                        color={message.includes('uspešno') ? 'green.400' : 'red.400'}
                                        fontWeight={message.includes('uspešno') ? 'bold' : 'normal'}
                                    >
                                        {message}
                                    </Text>
                                )}
                            </Dialog.Body>
                            <Dialog.Footer gap={2}>
                                <Button
                                    colorPalette="green"
                                    borderRadius="full"
                                    size="sm"
                                    onClick={handleAddAccount}
                                    loading={isSubmitting}
                                >
                                    Dodajte Nalog
                                </Button>
                                <Button
                                    borderRadius="full"
                                    size="sm"
                                    onClick={handleCloseModal}
                                    disabled={isSubmitting}
                                >
                                    Zatvori
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
};

export default ConnectedAccounts;