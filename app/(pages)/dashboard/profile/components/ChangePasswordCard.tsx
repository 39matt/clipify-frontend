'use client'

import React, { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    Heading,
    IconButton,
    Input,
    InputGroup,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import { createClient } from '@/app/lib/supabase/client'
import {IUser} from "@/app/lib/models/User";

interface ChangePasswordCardProps {
    user: IUser | null
}

const ChangePasswordCard: React.FC<ChangePasswordCardProps> = ({ user }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const supabase = createClient()

    const validatePasswords = (): boolean => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Popunite sva polja.')
            return false
        }
        if (newPassword.length < 8) {
            setError('Nova šifra mora imati najmanje 8 karaktera.')
            return false
        }
        if (newPassword !== confirmPassword) {
            setError('Šifre se ne poklapaju.')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        if (!validatePasswords()) {
            setLoading(false)
            return
        }

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            })

            if (updateError) {
                throw updateError
            }

            setSuccess('Uspešno promenjena šifra!')
            setCurrentPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } catch (err: unknown) {
            console.error('Error updating password:', err)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Došlo je do greške. Pokušajte ponovo.')
            }
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
                        <FiLock size={22} />
                    </Box>
                    Izmeni Šifru
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
                                Trenutna Šifra
                            </Text>
                            <InputGroup
                                endElement={
                                    <IconButton
                                        aria-label={showCurrent ? 'Sakrij' : 'Prikaži'}
                                        onClick={() => setShowCurrent(!showCurrent)}
                                        variant="ghost"
                                        size="sm"
                                        color="gray.400"
                                        _hover={{ color: 'white', bg: 'transparent' }}
                                    >
                                        {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </IconButton>
                                }
                            >
                                <Input
                                    type={showCurrent ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="xl"
                                    color="white"
                                    h="50px"
                                    fontSize="sm"
                                    _hover={{ borderColor: 'red.500/50' }}
                                    _focus={{
                                        borderColor: 'red.500',
                                        bg: 'white/10',
                                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                    }}
                                />
                            </InputGroup>
                        </VStack>

                        <VStack gap={2} align="stretch">
                            <Text
                                fontSize="xs"
                                fontWeight="700"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Nova Šifra
                            </Text>
                            <InputGroup
                                endElement={
                                    <IconButton
                                        aria-label={showNew ? 'Sakrij' : 'Prikaži'}
                                        onClick={() => setShowNew(!showNew)}
                                        variant="ghost"
                                        size="sm"
                                        color="gray.400"
                                        _hover={{ color: 'white', bg: 'transparent' }}
                                    >
                                        {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </IconButton>
                                }
                            >
                                <Input
                                    type={showNew ? 'text' : 'password'}
                                    placeholder="Najmanje 8 karaktera"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="xl"
                                    color="white"
                                    h="50px"
                                    fontSize="sm"
                                    _hover={{ borderColor: 'red.500/50' }}
                                    _focus={{
                                        borderColor: 'red.500',
                                        bg: 'white/10',
                                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                    }}
                                />
                            </InputGroup>
                        </VStack>

                        <VStack gap={2} align="stretch">
                            <Text
                                fontSize="xs"
                                fontWeight="700"
                                color="gray.400"
                                textTransform="uppercase"
                                letterSpacing="wider"
                            >
                                Potvrdi Novu Šifru
                            </Text>
                            <InputGroup
                                endElement={
                                    <IconButton
                                        aria-label={showConfirm ? 'Sakrij' : 'Prikaži'}
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        variant="ghost"
                                        size="sm"
                                        color="gray.400"
                                        _hover={{ color: 'white', bg: 'transparent' }}
                                    >
                                        {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </IconButton>
                                }
                            >
                                <Input
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Potvrdite novu šifru"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    bg="white/5"
                                    border="1px solid"
                                    borderColor="white/10"
                                    borderRadius="xl"
                                    color="white"
                                    h="50px"
                                    fontSize="sm"
                                    _hover={{ borderColor: 'red.500/50' }}
                                    _focus={{
                                        borderColor: 'red.500',
                                        bg: 'white/10',
                                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.5)',
                                    }}
                                />
                            </InputGroup>
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
                            Sačuvaj Novu Šifru
                        </Button>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    )
}

export default ChangePasswordCard