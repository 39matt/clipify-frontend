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

    // Derive current wallet address during render
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
            border="2px solid"
            borderColor="white/15"
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            boxShadow="0 20px 60px rgba(0,0,0,0.4)"
            transition="all 0.3s ease"
            _hover={{ borderColor: 'red.500/30' }}
        >
            <Card.Header p={0} mb={6}>
                <Heading
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="900"
                    display="flex"
                    alignItems="center"
                    gap={3}
                >
                    <Box color="red.500">
                        <FaCreditCard size={22} />
                    </Box>
                    Informacije o Isplati
                </Heading>
            </Card.Header>

            <Card.Body p={0}>
                <form onSubmit={handleSubmit}>
                    <VStack gap={5} align="stretch">
                        {error && (
                            <Alert.Root
                                status="error"
                                borderRadius="xl"
                                bg="red.500/10"
                                border="1px solid"
                                borderColor="red.500/30"
                                p={4}
                            >
                                <Alert.Indicator color="red.500" />
                                <Alert.Title fontSize="sm" fontWeight="700" color="red.400">
                                    {error}
                                </Alert.Title>
                            </Alert.Root>
                        )}

                        {success && (
                            <Alert.Root
                                status="success"
                                borderRadius="xl"
                                bg="green.500/10"
                                border="1px solid"
                                borderColor="green.500/30"
                                p={4}
                            >
                                <Alert.Indicator color="green.500" />
                                <Alert.Title fontSize="sm" fontWeight="700" color="green.400">
                                    {success}
                                </Alert.Title>
                            </Alert.Root>
                        )}

                        <VStack gap={2} align="stretch">
                            <Text
                                fontSize="xs"
                                fontWeight="700"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Način Isplate
                            </Text>
                            <NativeSelect.Root size="md">
                                <NativeSelect.Field
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="xl"
                                    color="white"
                                    h="50px"
                                    fontSize="sm"
                                    fontWeight="600"
                                    _hover={{ borderColor: 'red.500/50' }}
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

                        <VStack gap={2} align="stretch">
                            <Text
                                fontSize="xs"
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
                                    borderRadius="xl"
                                    color="white"
                                    h="50px"
                                    fontSize="sm"
                                    fontFamily="mono"
                                    _hover={{ borderColor: 'red.500/50' }}
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
                            bg="red.500"
                            color="white"
                            border="none"
                            w="full"
                            h="50px"
                            mt={2}
                            borderRadius="xl"
                            fontWeight="800"
                            fontSize="sm"
                            _hover={{
                                bg: 'red.600',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)',
                            }}
                            _active={{ transform: 'translateY(0)' }}
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