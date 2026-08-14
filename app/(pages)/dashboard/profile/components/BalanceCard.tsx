'use client'

import React, {useMemo, useState} from 'react'
import {
    Box,
    Button,
    Card,
    Center,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Toaster, toaster } from "@/components/ui/toaster"
import { FaCoins } from 'react-icons/fa'

interface BalanceCardProps {
    balance: number
    uid: string
    payoutRequested?: string
}

const BalanceCard: React.FC<BalanceCardProps> = ({
                                                     balance,
                                                     uid,
                                                     payoutRequested,
                                                 }) => {
    const [loading, setLoading] = useState(false)

    // Disables payout if balance is under $10 OR if last request was made < 24 hours ago
    const hoursSinceLastRequest = useMemo(() => {
        if (!payoutRequested) return Infinity
        const now = new Date().getTime()
        const lastRequest = new Date(payoutRequested).getTime()
        return (now - lastRequest) / (1000 * 60 * 60 * 24)
    }, [payoutRequested])

    const isPayoutDisabled = balance < 10 || hoursSinceLastRequest < 1

    const requestPayout = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/user/request-payout?uid=${uid}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.message || 'Greška pri slanju zahteva')
            }

            toaster.create({
                title: 'Uspeh!',
                description: 'Uspešno poslat zahtev za isplatu!',
                type: 'success',
                duration: 4000,
            })
        } catch (err: unknown) {
            console.error(err)
            toaster.create({
                title: 'Greška',
                description:
                    err instanceof Error
                        ? err.message
                        : 'Nije moguće poslati zahtev za isplatu.',
                type: 'error',
                duration: 4000,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card.Root
            w="full"
            bg="gray.900"
            color="white"
            border="2px solid"
            borderColor="white/15"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            boxShadow="0 20px 60px rgba(0,0,0,0.4)"
            transition="all 0.3s ease"
            _hover={{ borderColor: 'green.500/40' }}
        >
            <Card.Header p={0} mb={6} textAlign="center">
                <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900">
                    Vaš Trenutni Saldo
                </Heading>
            </Card.Header>

            <Card.Body p={0}>
                <VStack gap={6} align="center">
                    <Center
                        w="80px"
                        h="80px"
                        borderRadius="2xl"
                        bg="green.500/10"
                        color="green.400"
                        border="1px solid"
                        borderColor="green.500/30"
                        boxShadow="0 0 30px rgba(34, 197, 94, 0.2)"
                    >
                        <FaCoins size={36} />
                    </Center>

                    <Box textAlign="center">
                        <Text
                            fontSize={{ base: '4xl', md: '6xl' }}
                            fontWeight="900"
                            color="white"
                            letterSpacing="-0.03em"
                            lineHeight="1"
                        >
                            ${balance.toFixed(2)}
                        </Text>
                        <Text
                            fontSize="xs"
                            color="gray.400"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            mt={2}
                        >
                            Dostupno za isplatu
                        </Text>
                    </Box>

                    <Button
                        onClick={requestPayout}
                        disabled={isPayoutDisabled || loading}
                        loading={loading}
                        loadingText="Slanje..."
                        bg="green.500"
                        color="white"
                        border="none"
                        w={{ base: 'full', sm: '75%' }}
                        py={6}
                        borderRadius="xl"
                        fontWeight="800"
                        fontSize="md"
                        _hover={{
                            bg: 'green.600',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 24px rgba(34, 197, 94, 0.3)',
                        }}
                        _active={{ transform: 'translateY(0)' }}
                        transition="all 0.2s"
                    >
                        Zatraži isplatu
                    </Button>
                </VStack>
            </Card.Body>

            <Card.Footer p={0} mt={8}>
                <Text
                    fontSize="xs"
                    fontWeight="500"
                    color="gray.400"
                    textAlign="center"
                    w="full"
                    lineHeight="1.6"
                >
                    Minimalni iznos za isplatu je <strong>$10</strong>.
                    <br />
                    Nakon svake kampanje sabiraju se pregledi validnih videa i dodaju na vaša sredstva.
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default BalanceCard