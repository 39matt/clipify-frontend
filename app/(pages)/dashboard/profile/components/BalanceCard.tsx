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
import { toaster } from "@/components/ui/toaster"
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
            border="1px solid"
            borderColor="white/15"
            borderRadius="xl"
            p={{ base: 4, md: 5 }}
            boxShadow="0 10px 30px rgba(0,0,0,0.35)"
            transition="all 0.3s ease"
            _hover={{ borderColor: 'green.500/40' }}
        >
            <Card.Header p={0} mb={4} textAlign="center">
                <Heading fontSize={{ base: 'sm', md: 'md' }} fontWeight="800">
                    Vaš Trenutni Balans
                </Heading>
            </Card.Header>

            <Card.Body p={0}>
                <VStack gap={3} align="center">
                    <Center
                        w="48px"
                        h="48px"
                        borderRadius="xl"
                        bg="green.500/10"
                        color="green.400"
                        border="1px solid"
                        borderColor="green.500/30"
                    >
                        <FaCoins size={20} />
                    </Center>

                    <Box textAlign="center">
                        <Text
                            fontSize={{ base: '2xl', md: '3xl' }}
                            fontWeight="800"
                            color="white"
                            letterSpacing="-0.02em"
                            lineHeight="1"
                        >
                            ${balance.toFixed(2)}
                        </Text>
                        <Text
                            fontSize="2xs"
                            color="gray.400"
                            fontWeight="700"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            mt={1}
                        >
                            Dostupno za isplatu
                        </Text>
                    </Box>

                    <Button
                        onClick={requestPayout}
                        disabled={isPayoutDisabled || loading}
                        loading={loading}
                        loadingText="Slanje..."
                        size="sm"
                        bg="green.500"
                        color="white"
                        border="none"
                        w={{ base: 'full', sm: '75%' }}
                        py={4}
                        borderRadius="lg"
                        fontWeight="700"
                        fontSize="sm"
                        _hover={{
                            bg: 'green.600',
                        }}
                        transition="all 0.2s"
                    >
                        Zatraži isplatu
                    </Button>
                </VStack>
            </Card.Body>

            <Card.Footer p={0} mt={4}>
                <Text
                    fontSize="2xs"
                    fontWeight="500"
                    color="gray.400"
                    textAlign="center"
                    w="full"
                    lineHeight="1.5"
                >
                    Minimalni iznos za isplatu je <strong>$10</strong>.
                    <br />
                    Nakon svake kampanje sabiraju se pregledi validnih videa i dodaju na vaša balans.
                </Text>
            </Card.Footer>
        </Card.Root>
    )
}

export default BalanceCard