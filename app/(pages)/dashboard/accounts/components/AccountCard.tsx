'use client';

import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Dialog,
    Flex,
    Heading,
    IconButton,
    Icon,
    Portal,
    Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    FiInstagram,
    FiYoutube,
    FiCheckCircle,
    FiClock,
    FiTrash2,
    FiShield,
    FiAlertTriangle,
} from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

const MotionCard = motion.create(Card.Root);

interface AccountCardProps {
    account: IAccount;
    index?: number;
    onDelete?: () => void;
    onVerify?: () => void;
    isVerifying?: boolean;
}

const platformStyles: Record<
    string,
    { icon: React.ElementType; color: string; bg: string }
> = {
    Instagram: { icon: FiInstagram, color: 'pink.400', bg: 'pink.500/10' },
    TikTok: { icon: SiTiktok, color: 'gray.100', bg: 'white/10' },
    YouTube: { icon: FiYoutube, color: 'red.400', bg: 'red.500/10' },
};

const AccountCard = ({
                         account,
                         index = 0,
                         onDelete,
                         onVerify,
                         isVerifying = false,
                     }: AccountCardProps) => {
    const style = platformStyles[account.platform] ?? {
        icon: FiCheckCircle,
        color: 'green.400',
        bg: 'green.500/10',
    };
    const isVerified = Boolean(account.verifiedAt);

    return (
        <MotionCard
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            bg="gray.900/80"
            backdropFilter="blur(8px)"
            color="white"
            border="1px solid"
            borderColor={isVerified ? 'white/10' : 'orange.500/30'}
            borderRadius="xl"
            p={{ base: 4, md: 5 }}
            _hover={{ borderColor: isVerified ? 'white/20' : 'orange.500/50' }}
            transitionProperty="border-color"
            transitionDuration="0.2s"
        >
            <Flex justify="space-between" align="flex-start" gap={3}>
                <Flex align="center" gap={3} minW={0}>
                    <Center
                        w={10}
                        h={10}
                        borderRadius="lg"
                        bg={style.bg}
                        flexShrink={0}
                    >
                        <Icon color={style.color} boxSize={5}>
                            <style.icon />
                        </Icon>
                    </Center>
                    <Box minW={0}>
                        <Heading fontSize="sm" fontWeight="800" truncate>
                            @{account.username}
                        </Heading>
                        <Text fontSize="xs" color="gray.400">
                            {account.platform}
                        </Text>
                    </Box>
                </Flex>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <IconButton
                            aria-label="Obriši nalog"
                            size="xs"
                            color="gray.500"
                            borderRadius="full"
                            _hover={{ color: 'red.400', bg: 'red.500/10' }}
                        >
                            <FiTrash2 />
                        </IconButton>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content
                                bg="gray.900"
                                color="white"
                                border="1px solid"
                                borderColor="white/10"
                                borderRadius="xl"
                            >
                                <Dialog.Header>
                                    <Dialog.Title fontWeight="800" fontSize="md">
                                        <Flex align="center" gap={2}>
                                            <Icon color="red.400" boxSize={5}>
                                                <FiAlertTriangle />
                                            </Icon>
                                            Potvrdite brisanje
                                        </Flex>
                                    </Dialog.Title>
                                </Dialog.Header>
                                <Dialog.CloseTrigger />
                                <Dialog.Body>
                                    <Text fontSize="sm" color="gray.300">
                                        Da li ste sigurni da želite da obrišete nalog{' '}
                                        <Text as="span" fontWeight="700" color="white">
                                            @{account.username}
                                        </Text>{' '}
                                        ({account.platform})?
                                    </Text>
                                    <Text fontSize="xs" color="gray.400" mt={2}>
                                        Ova akcija je trajna i ne može se poništiti.
                                    </Text>
                                </Dialog.Body>
                                <Dialog.Footer gap={2}>
                                    <Button
                                        colorPalette="red"
                                        borderRadius="full"
                                        size="sm"
                                        onClick={onDelete}
                                    >
                                        Obriši
                                    </Button>
                                    <Dialog.Trigger>
                                        <Button
                                            borderRadius="full"
                                            size="sm"
                                        >
                                            Otkaži
                                        </Button>
                                    </Dialog.Trigger>
                                </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Flex>

            <Flex mt={4} align="center" justify="space-between">
                <Badge
                    size="sm"
                    borderRadius="full"
                    px={2.5}
                    py={1}
                    fontSize="10px"
                    fontWeight="700"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    bg={isVerified ? 'green.500/15' : 'orange.500/15'}
                    color={isVerified ? 'green.400' : 'orange.400'}
                >
                    <Icon boxSize={3}>
                        {isVerified ? <FiCheckCircle /> : <FiClock />}
                    </Icon>
                    {isVerified ? 'Verifikovan' : 'Čeka verifikaciju'}
                </Badge>

                {isVerified && account.verifiedAt && (
                    <Text fontSize="10px" color="gray.500">
                        {new Date(account.verifiedAt).toLocaleDateString('sr-RS')}
                    </Text>
                )}
            </Flex>

            {!isVerified && (
                <Box
                    mt={4}
                    p={3}
                    bg="white/5"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="white/10"
                >
                    <Text fontSize="10px" color="gray.400" mb={1}>
                        Unesite ovaj kod u opis profila:
                    </Text>
                    <Flex align="center" justify="space-between" gap={2}>
                        <Heading
                            size="sm"
                            color="orange.300"
                            fontFamily="mono"
                            letterSpacing="0.5px"
                            truncate
                        >
                            {account.verificationCode}
                        </Heading>
                    </Flex>

                    <Button
                        mt={3}
                        w="full"
                        size="xs"
                        colorPalette="green"
                        borderRadius="full"
                        fontWeight="700"
                        onClick={onVerify}
                        loading={isVerifying}
                    >
                        <FiShield style={{ marginRight: '6px' }} />
                        Verifikuj Nalog
                    </Button>
                </Box>
            )}
        </MotionCard>
    );
};

export default AccountCard;