'use client'

import React, { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Input,
    NativeSelect,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FaCreditCard } from 'react-icons/fa'
import { IUser } from '@/app/lib/models/User'

interface EditPaymentInfoCardProps {
    discordUsername: string | null
    userInfo: IUser | null
}

const EditPaymentInfoCard: React.FC<EditPaymentInfoCardProps> = ({
                                                                     discordUsername,
                                                                     userInfo,
                                                                 }) => {
    const [userEditedAddress, setUserEditedAddress] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const walletAddress = userEditedAddress ?? userInfo?.walletAddress ?? ''

    const validateWalletAddress = (address: string): boolean => {
        const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/
        return ethereumAddressRegex.test(address)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        if (!validateWalletAddress(walletAddress)) {
            setError('Neispravan format adrese (mora biti validna ERC20/Ethereum adresa)!')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/user/update-wallet-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress, discordUsername }),
            })

            if (!response.ok) {
                setError('Promena adrese nije uspela. Molimo vas pokušajte ponovo!')
                setLoading(false)
                return
            }

            setSuccess('Uspešno izmenjena adresa za isplatu!')
            setUserEditedAddress(null)
        } catch (err: unknown) {
            console.error('Error updating wallet address:', err)
            setError('Promena adrese nije uspela. Molimo vas pokušajte ponovo!')
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

        >
            <Card.Header p={0} mb={4}>
                <Heading
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="800"
                    display="flex"
                    alignItems="center"
                    gap={2}
                >
                    <Box color="red.500">
                        <FaCreditCard size={16} />
                    </Box>
                    Informacije o Isplati
                </Heading>
            </Card.Header>

            <Card.Body p={0}>
                <form onSubmit={handleSubmit}>
                    <VStack gap={3} align="stretch">
                        {error && (
                            <Alert.Root
                                status="error"
                                borderRadius="lg"
                                bg="red.500/10"
                                border="1px solid"
                                borderColor="red.500/30"
                                p={3}
                            >
                                <Alert.Indicator color="red.500" />
                                <Alert.Title fontSize="xs" fontWeight="700" color="red.400">
                                    {error}
                                </Alert.Title>
                            </Alert.Root>
                        )}

                        {success && (
                            <Alert.Root
                                status="success"
                                borderRadius="lg"
                                bg="green.500/10"
                                border="1px solid"
                                borderColor="green.500/30"
                                p={3}
                            >
                                <Alert.Indicator color="green.500" />
                                <Alert.Title fontSize="xs" fontWeight="700" color="green.400">
                                    {success}
                                </Alert.Title>
                            </Alert.Root>
                        )}

                        <VStack gap={1} align="stretch">
                            <Text
                                fontSize="2xs"
                                fontWeight="700"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Način Isplate
                            </Text>
                            <NativeSelect.Root size="sm">
                                <NativeSelect.Field
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="lg"
                                    color="white"
                                    h="38px"
                                    fontSize="sm"
                                    fontWeight="600"
                                    _focus={{
                                        borderColor: 'red.500',
                                        bg: 'gray.900',
                                    }}
                                >
                                    <option value="usdt" style={{ backgroundColor: '#111827', color: '#fff' }}>
                                        USDT (ERC20 / Ethereum)
                                    </option>
                                </NativeSelect.Field>
                                <NativeSelect.Indicator color="gray.400" />
                            </NativeSelect.Root>
                        </VStack>

                        <VStack gap={1} align="stretch">
                            <Text
                                fontSize="2xs"
                                fontWeight="700"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Adresa USDT Novčanika
                            </Text>
                            <Flex align="center" position="relative">
                                <Input
                                    type="text"
                                    placeholder="0x..."
                                    value={walletAddress}
                                    onChange={(e) => setUserEditedAddress(e.target.value)}
                                    required
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="lg"
                                    color="white"
                                    h="38px"
                                    fontSize="sm"
                                    fontFamily="mono"
                                    _focus={{
                                        borderColor: 'red.500',
                                        bg: 'white/10',
                                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                    }}
                                />
                            </Flex>
                        </VStack>

                        <Button
                            type="submit"
                            loading={loading}
                            loadingText="Ažuriranje..."
                            size="sm"
                            bg="red.500"
                            color="white"
                            border="none"
                            w="full"
                            h="38px"
                            mt={1}
                            borderRadius="lg"
                            fontWeight="700"
                            fontSize="sm"
                            _hover={{
                                bg: 'red.600',
                            }}
                            transition="all 0.2s"
                        >
                            Sačuvaj Informacije
                        </Button>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    )
}

export default EditPaymentInfoCard