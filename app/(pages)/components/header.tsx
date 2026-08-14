'use client'

import React, { useState, useSyncExternalStore, useMemo } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    HStack,
    IconButton,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import {
    FiBriefcase,
    FiUser,
    FiShield,
    FiLogOut,
    FiLogIn,
    FiMenu,
    FiX,
} from 'react-icons/fi'
import { useAuth } from '@/app/lib/providers/AuthProvider'
import { createClient } from '@/app/lib/supabase/client'

const emptySubscribe = () => () => {}
function useHasMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}

export const Header: React.FC = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const mounted = useHasMounted()
    const { user, isAdmin, loading } = useAuth()

    const supabase = useMemo(() => createClient(), [])

    const handleLogout = async () => {
        setIsLoggingOut(true)
        await supabase.auth.signOut()
        setMobileMenuOpen(false)
        router.replace('/login')
        router.refresh()
    }

    const navLinks = [
        { label: 'Kampanje', href: '/dashboard/campaigns', icon: FiBriefcase },
        { label: 'Nalozi', href: '/dashboard/accounts', icon: FiUser },
    ]

    if (isAdmin) {
        navLinks.push({ label: 'Admin', href: '/admin', icon: FiShield })
    }

    const isActive = (path: string) => pathname === path

    return (
        <Box
            position="fixed"
            bottom={{ base: '16px', md: '24px' }}
            left="50%"
            transform="translateX(-50%)"
            zIndex="1000"
            w={{ base: 'calc(100% - 32px)', sm: 'auto' }}
            maxW="90vw"
        >
            {/* Floating Mobile Pop-up Menu */}
            {mounted && mobileMenuOpen && (
                <Box
                    display={{ base: 'block', md: 'none' }}
                    mb={3}
                    p={4}
                    bg="black/90"
                    backdropFilter="blur(20px)"
                    border="1px solid"
                    borderColor="white/15"
                    borderRadius="2xl"
                    boxShadow="0 20px 40px rgba(0,0,0,0.8)"
                >
                    <VStack gap={3} align="stretch">
                        {navLinks.map((link) => {
                            const IconComp = link.icon
                            const active = isActive(link.href)
                            return (
                                <NextLink
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Flex
                                        align="center"
                                        gap={3}
                                        p={3}
                                        borderRadius="xl"
                                        bg={active ? 'red.500/15' : 'transparent'}
                                        border="1px solid"
                                        borderColor={active ? 'red.500/40' : 'transparent'}
                                        color={active ? 'white' : 'gray.400'}
                                    >
                                        <IconComp size={18} />
                                        <Text fontWeight="700" fontSize="sm">
                                            {link.label}
                                        </Text>
                                    </Flex>
                                </NextLink>
                            )
                        })}

                        <Box borderTop="1px solid" borderColor="white/10" pt={2}>
                            {!mounted || loading ? (
                                <Center py={2}>
                                    <Spinner size="sm" color="red.500" />
                                </Center>
                            ) : user ? (
                                <VStack gap={2} w="full">
                                    <NextLink
                                        href="/dashboard/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        style={{ textDecoration: 'none', width: '100%' }}
                                    >
                                        <Button w="full" bg="white/10" color="white" borderRadius="xl">
                                            Moj Profil
                                        </Button>
                                    </NextLink>

                                    <Button
                                        w="full"
                                        onClick={handleLogout}
                                        loading={isLoggingOut}
                                        bg="red.500/10"
                                        color="red.400"
                                        border="1px solid"
                                        borderColor="red.500/30"
                                        borderRadius="xl"
                                    >
                                        <FiLogOut style={{ marginRight: '8px' }} /> Odjavi se
                                    </Button>
                                </VStack>
                            ) : (
                                <NextLink
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{ textDecoration: 'none', width: '100%' }}
                                >
                                    <Button w="full" bg="red.500" color="white" borderRadius="xl">
                                        <FiLogIn style={{ marginRight: '8px' }} /> Prijavi Se
                                    </Button>
                                </NextLink>
                            )}
                        </Box>
                    </VStack>
                </Box>
            )}

            {/* Main Floating Dock Container */}
            <Flex
                align="center"
                justify="space-between"
                gap={{ base: 3, md: 6 }}
                px={{ base: 4, md: 6 }}
                py={3}
                bg="black/85"
                backdropFilter="blur(16px)"
                border="1px solid"
                borderColor="white/15"
                borderRadius="full"
                boxShadow="0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(239, 68, 68, 0.1)"
            >
                {/* Logo */}
                <NextLink href="/" style={{ textDecoration: 'none' }}>
                    <HStack gap={1.5} cursor="pointer" pr={{ base: 0, md: 2 }}>
                        <Text
                            fontSize="lg"
                            fontWeight="900"
                            letterSpacing="-0.03em"
                            color="white"
                        >
                            Clipify
                        </Text>
                        <Box w="6px" h="6px" borderRadius="full" bg="red.500" />
                    </HStack>
                </NextLink>

                {/* Separator */}
                <Box h="20px" w="1px" bg="white/15" display={{ base: 'none', md: 'block' }} />

                {/* Desktop Navigation Links */}
                <HStack gap={2} display={{ base: 'none', md: 'flex' }}>
                    {navLinks.map((link) => {
                        const active = isActive(link.href)
                        return (
                            <NextLink
                                key={link.href}
                                href={link.href}
                                style={{ textDecoration: 'none' }}
                            >
                                <HStack
                                    gap={2}
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    bg={active ? 'white/10' : 'transparent'}
                                    border="1px solid"
                                    borderColor={active ? 'white/20' : 'transparent'}
                                    transition="all 0.25s ease"
                                    _hover={{
                                        bg: 'white/10',
                                        transform: 'translateY(-1px)',
                                    }}
                                >
                                    <Text
                                        fontSize="sm"
                                        fontWeight={active ? '800' : '600'}
                                        color={active ? 'white' : 'gray.400'}
                                    >
                                        {link.label}
                                    </Text>

                                    {link.label === 'Admin' && (
                                        <Badge
                                            bg="red.500/20"
                                            color="red.400"
                                            border="1px solid"
                                            borderColor="red.500/40"
                                            fontSize="2xs"
                                            px={1.5}
                                            py={0.5}
                                            borderRadius="md"
                                        >
                                            ADMIN
                                        </Badge>
                                    )}
                                </HStack>
                            </NextLink>
                        )
                    })}
                </HStack>

                {/* Separator */}
                <Box h="20px" w="1px" bg="white/15" display={{ base: 'none', md: 'block' }} />

                {/* Desktop Actions */}
                <HStack gap={2} display={{ base: 'none', md: 'flex' }} minW="120px" justify="center">
                    {!mounted || loading ? (
                        <Spinner size="sm" color="red.500" />
                    ) : user ? (
                        <>
                            <NextLink href="/dashboard/profile" style={{ textDecoration: 'none' }}>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    color="gray.300"
                                    borderRadius="full"
                                    px={4}
                                    fontWeight="700"
                                    _hover={{ color: 'white', bg: 'white/10' }}
                                >
                                    Moj Profil
                                </Button>
                            </NextLink>

                            <IconButton
                                aria-label="Odjavi se"
                                onClick={handleLogout}
                                loading={isLoggingOut}
                                size="sm"
                                bg="red.500/10"
                                color="red.400"
                                border="1px solid"
                                borderColor="red.500/30"
                                borderRadius="full"
                                _hover={{ bg: 'red.500', color: 'white' }}
                                transition="all 0.2s"
                            >
                                <FiLogOut size={14} />
                            </IconButton>
                        </>
                    ) : (
                        <NextLink href="/login" style={{ textDecoration: 'none' }}>
                            <Button
                                size="sm"
                                bg="red.500"
                                color="white"
                                borderRadius="full"
                                px={5}
                                fontWeight="800"
                                _hover={{
                                    bg: 'red.600',
                                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                                }}
                            >
                                Prijavi Se
                            </Button>
                        </NextLink>
                    )}
                </HStack>

                {/* Mobile Toggle Button */}
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    aria-label="Toggle Menu"
                    variant="ghost"
                    color="white"
                    size="sm"
                    borderRadius="full"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                </IconButton>
            </Flex>
        </Box>
    )
}

export default Header