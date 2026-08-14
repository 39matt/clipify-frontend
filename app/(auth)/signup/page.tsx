'use client';

import {
    Alert,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Heading,
    IconButton,
    Input,
    InputGroup,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import {useEffect, useState, FormEvent, useSyncExternalStore} from 'react';

import { signup } from './actions';
import siteConfig from '@/components/data/config';
import { PageTransition } from '@/components/home/motion/page-transition';

interface FeatureItem {
    icon: React.ComponentType<{ size?: number }>;
    title: string;
    description: string;
}


const SignUp: NextPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Lozinke se ne podudaraju.');
            return;
        }

        if (password.length < 6) {
            setError('Lozinka mora imati najmanje 6 karaktera.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const result = await signup(formData);

            if (result?.error) {
                setError(result.error);
                setLoading(false);
                return;
            }
        } catch (err: unknown) {
            if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) {
                return;
            }
            setError('Greška pri kreiranju naloga. Pokušaj ponovo.');
            setLoading(false);
        }
    };

    // if (!mounted || authLoading) {
    //     return (
    //         <Center minH="100vh" bg="white">
    //             <Spinner size="xl" color="red.500" borderWidth="4px" />
    //         </Center>
    //     );
    // }

    return (
        <Flex
            minH="100vh"
            direction={{ base: 'column', lg: 'row' }}
            position="relative"
            overflow="hidden"
        >
            {/* Left side - Branding */}
            <Flex
                w={{ base: 'full', lg: '50%' }}
                minH={{ base: '35vh', lg: 'auto' }}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                px={{ base: 8, md: 12, lg: 8, xl: 12 }}
                py={{ base: 6, lg: 0 }}
                pt={{ base: 5, md: 'auto' }}
                position="relative"
                bg="black"
                overflow="hidden"
            >
                <Box
                    position="absolute"
                    top="-20%"
                    left="-20%"
                    w="140%"
                    h="140%"
                    backgroundImage="radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.15), transparent 70%)"
                    animation="pulse 8s ease-in-out infinite"
                    css={{
                        '@keyframes pulse': {
                            '0%, 100%': { transform: 'scale(1)', opacity: 0.6 },
                            '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                        },
                    }}
                />

                <VStack
                    align="center"
                    gap={{ base: 5, lg: 10 }}
                    maxW="600px"
                    w="full"
                    position="relative"
                    zIndex={1}
                    textAlign="center"
                >
                    <VStack gap={{ base: 4, lg: 4 }}>
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
                            PRIDRUŽI SE
                        </Badge>

                        <Heading
                            fontSize={{ base: '4xl', md: '7xl' }}
                            fontWeight="900"
                            color="white"
                            lineHeight="1.05"
                            letterSpacing="-0.03em"
                        >
                            Zarađuj od Svojih klipova
                        </Heading>

                        <Text
                            display={{ base: 'none', lg: 'block' }}
                            fontSize="2xl"
                            color="gray.300"
                            lineHeight="1.4"
                            fontWeight="600"
                            maxW="500px"
                        >
                            Klipuj. Okači. Zaradi.
                        </Text>
                    </VStack>

                    <SimpleGrid
                        columns={3}
                        gap={{ base: 3, lg: 6 }}
                        w="full"
                        maxW="550px"
                    >
                        {[
                            { value: '500k+', label: 'Isplaćeno', icon: '💰' },
                            { value: '700+', label: 'Aktivnih klipera', icon: '👥' },
                            { value: '100M+', label: 'Ukupno pregleda', icon: '📈' },
                        ].map((stat, idx) => (
                            <VStack
                                key={idx}
                                gap={{ base: 1.5, lg: 2 }}
                                p={{ base: 3, lg: 4 }}
                                bg="white/10"
                                borderRadius="xl"
                                borderWidth="2px"
                                borderColor="white/20"
                                transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                                _hover={{
                                    borderColor: 'red.500',
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)',
                                }}
                            >
                                <Text fontSize={{ base: 'xl', lg: '2xl' }}>{stat.icon}</Text>
                                <VStack gap={0.5}>
                                    <Text
                                        fontSize={{ base: 'lg', lg: '2xl' }}
                                        fontWeight="900"
                                        color="white"
                                        letterSpacing="-0.03em"
                                    >
                                        {stat.value}
                                    </Text>
                                    <Text
                                        fontSize={{ base: '2xs', lg: 'xs' }}
                                        color="gray.400"
                                        fontWeight="700"
                                        textTransform="uppercase"
                                        letterSpacing="wider"
                                    >
                                        {stat.label}
                                    </Text>
                                </VStack>
                            </VStack>
                        ))}
                    </SimpleGrid>

                    <VStack
                        gap={3}
                        w="full"
                        align="stretch"
                        display={{ base: 'none', lg: 'flex' }}
                    >
                        {(siteConfig.signup.features as FeatureItem[])
                            .slice(0, 4)
                            .map((feature: FeatureItem, idx: number) => {
                                const IconComp = feature.icon;
                                return (
                                    <Flex
                                        key={idx}
                                        align="center"
                                        justify="flex-start"
                                        gap={3}
                                        p={4}
                                        w="full"
                                        bg="white/10"
                                        borderRadius="lg"
                                        borderWidth="2px"
                                        borderColor="white/20"
                                        transition="all 0.3s ease"
                                        _hover={{
                                            borderColor: 'red.500',
                                            transform: 'translateX(8px)',
                                            bg: 'white/15',
                                        }}
                                    >
                                        <Center
                                            w="44px"
                                            h="44px"
                                            borderRadius="lg"
                                            bg="red.500"
                                            color="white"
                                            flexShrink={0}
                                            boxShadow="0 4px 14px rgba(239, 68, 68, 0.4)"
                                        >
                                            <IconComp size={20} />
                                        </Center>
                                        <VStack align="start" gap={0.5} flex={1}>
                                            <Text
                                                fontWeight="800"
                                                color="white"
                                                fontSize="md"
                                                textAlign="left"
                                            >
                                                {feature.title}
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.400"
                                                lineHeight="1.5"
                                                textAlign="left"
                                                fontWeight="500"
                                            >
                                                {feature.description}
                                            </Text>
                                        </VStack>
                                    </Flex>
                                );
                            })}
                    </VStack>
                </VStack>
            </Flex>

            {/* Right side - Form */}
            <Flex
                w={{ base: 'full', lg: '50%' }}
                minH={{ base: '65vh', lg: 'auto' }}
                flexDirection="column"
                justifyContent="center"
                px={{ base: 6, md: 12, lg: 16 }}
                py={{ base: 6, lg: 0 }}
                bg="white"
                css={{
                    backgroundImage: `radial-gradient(rgba(0,0,0,0.06) 2px, transparent 2px)`,
                    backgroundSize: '22px 22px',
                    backgroundAttachment: 'fixed',
                }}
                position="relative"
                zIndex={1}
                overflow="auto"
            >
                <Box
                    position="absolute"
                    top="-20%"
                    right="-20%"
                    w="500px"
                    h="500px"
                    borderRadius="full"
                    backgroundImage="radial-gradient(circle, rgba(239, 68, 68, 0.04), transparent 70%)"
                    pointerEvents="none"
                />

                <PageTransition>
                    <VStack
                        gap={{ base: 4, lg: 8 }}
                        align="stretch"
                        maxW="440px"
                        mx="auto"
                        w="full"
                        position="relative"
                    >
                        <VStack gap={{ base: 1, lg: 3 }} align="start">
                            <Box>
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
                                    mb={3}
                                >
                                    KREIRAJ NALOG
                                </Badge>

                                <Heading
                                    fontSize={{ base: '2xl', lg: '4xl' }}
                                    fontWeight="900"
                                    color="gray.900"
                                    letterSpacing="-0.02em"
                                    mb={{ base: 1, lg: 2 }}
                                >
                                    Napravi nalog
                                </Heading>
                                <Text
                                    color="gray.600"
                                    fontSize={{ base: 'sm', lg: 'lg' }}
                                    fontWeight="500"
                                >
                                    Popuni podatke i započni svoju zaradu!
                                </Text>
                            </Box>
                        </VStack>

                        <form onSubmit={handleSubmit}>
                            <VStack gap={{ base: 3, lg: 5 }} align="stretch">
                                <VStack gap={{ base: 1, lg: 2 }} align="stretch">
                                    <Text
                                        fontSize="sm"
                                        fontWeight="700"
                                        color="gray.900"
                                        textTransform="uppercase"
                                        letterSpacing="wider"
                                    >
                                        Email adresa
                                    </Text>
                                    <Input
                                        type="email"
                                        placeholder="tvoj@email.com"
                                        size="lg"
                                        color="gray.800"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        bg="gray.200"
                                        border="2px solid"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'red.300' }}
                                        _focus={{
                                            borderColor: 'red.500',
                                            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                                            bg: 'white',
                                        }}
                                        borderRadius="xl"
                                        height={{ base: '48px', lg: '56px' }}
                                        fontSize="md"
                                        transition="all 0.2s"
                                    />
                                </VStack>

                                <VStack gap={{ base: 1, lg: 2 }} align="stretch">
                                    <Text
                                        fontSize="sm"
                                        fontWeight="700"
                                        color="gray.900"
                                        textTransform="uppercase"
                                        letterSpacing="wider"
                                    >
                                        Lozinka
                                    </Text>
                                    <InputGroup
                                        endElement={
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'
                                                }
                                                onClick={() => setShowPassword(!showPassword)}
                                                variant="ghost"
                                                size="sm"
                                                color="gray.500"
                                                _hover={{ color: 'red.500', bg: 'transparent' }}
                                            >
                                                {showPassword ? (
                                                    <FiEyeOff size={18} />
                                                ) : (
                                                    <FiEye size={18} />
                                                )}
                                            </IconButton>
                                        }
                                    >
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            color="gray.800"
                                            size="lg"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            bg="gray.200"
                                            border="2px solid"
                                            borderColor="gray.200"
                                            _hover={{ borderColor: 'red.300' }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                                                bg: 'white',
                                            }}
                                            borderRadius="xl"
                                            height={{ base: '48px', lg: '56px' }}
                                            fontSize="md"
                                            transition="all 0.2s"
                                            pr="3.5rem"
                                        />
                                    </InputGroup>
                                </VStack>

                                <VStack gap={{ base: 1, lg: 2 }} align="stretch">
                                    <Text
                                        fontSize="sm"
                                        fontWeight="700"
                                        color="gray.900"
                                        textTransform="uppercase"
                                        letterSpacing="wider"
                                    >
                                        Potvrdi lozinku
                                    </Text>
                                    <InputGroup
                                        endElement={
                                            <IconButton
                                                aria-label={
                                                    showConfirmPassword
                                                        ? 'Sakrij lozinku'
                                                        : 'Prikaži lozinku'
                                                }
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                variant="ghost"
                                                size="sm"
                                                color="gray.800"
                                                _hover={{ color: 'red.500', bg: 'transparent' }}
                                            >
                                                {showConfirmPassword ? (
                                                    <FiEyeOff size={18} />
                                                ) : (
                                                    <FiEye size={18} />
                                                )}
                                            </IconButton>
                                        }
                                    >
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            color="gray.800"
                                            size="lg"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            bg="gray.200"
                                            border="2px solid"
                                            borderColor="gray.200"
                                            _hover={{ borderColor: 'red.300' }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                                                bg: 'white',
                                            }}
                                            borderRadius="xl"
                                            height={{ base: '48px', lg: '56px' }}
                                            fontSize="md"
                                            transition="all 0.2s"
                                            pr="3.5rem"
                                        />
                                    </InputGroup>
                                </VStack>

                                {error && (
                                    <Alert.Root
                                        status="error"
                                        borderRadius="xl"
                                        bg="red.100"
                                        borderWidth="2px"
                                        borderColor="red.400"
                                        py={{ base: 3, lg: 4 }}
                                        color="red.800"
                                        boxShadow="lg"
                                    >
                                        <Alert.Indicator color="red.600" />
                                        <Alert.Title
                                            fontSize={{ base: 'sm', lg: 'md' }}
                                            fontWeight="700"
                                            color="red.800"
                                        >
                                            {error}
                                        </Alert.Title>
                                    </Alert.Root>
                                )}

                                {success && (
                                    <Alert.Root
                                        status="success"
                                        borderRadius="xl"
                                        bg="green.100"
                                        borderWidth="2px"
                                        borderColor="green.400"
                                        py={{ base: 3, lg: 4 }}
                                        color="green.800"
                                        boxShadow="lg"
                                    >
                                        <Alert.Indicator color="green.600" />
                                        <Alert.Title
                                            fontSize={{ base: 'sm', lg: 'md' }}
                                            fontWeight="700"
                                            color="green.800"
                                        >
                                            {success}
                                        </Alert.Title>
                                    </Alert.Root>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    w="full"
                                    bg="black"
                                    color="white"
                                    border="none"
                                    _hover={{
                                        bg: 'red.500',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 24px rgba(239, 68, 68, 0.4)',
                                    }}
                                    _active={{
                                        transform: 'translateY(0)',
                                    }}
                                    height={{ base: '48px', lg: '56px' }}
                                    fontSize="md"
                                    fontWeight="800"
                                    borderRadius="xl"
                                    transition="all 0.2s"
                                    loading={loading}
                                    loadingText="Kreiranje naloga..."
                                    boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                                    mt={{ base: 1, lg: 2 }}
                                >
                                    Kreiraj nalog
                                </Button>
                            </VStack>
                        </form>

                        <HStack gap={2} justify="center" pt={{ base: 0, lg: 2 }}>
                            <Text
                                fontSize={{ base: 'sm', lg: 'lg' }}
                                color="gray.600"
                                fontWeight="500"
                            >
                                Već imaš nalog?
                            </Text>
                            <NextLink href="/login" style={{ textDecoration: 'none' }}>
                                <Text
                                    as="span"
                                    fontSize={{ base: 'sm', lg: 'lg' }}
                                    fontWeight="800"
                                    color="red.500"
                                    cursor="pointer"
                                    _hover={{
                                        color: 'red.600',
                                        textDecoration: 'underline',
                                    }}
                                    transition="all 0.2s"
                                >
                                    Uloguj se
                                </Text>
                            </NextLink>
                        </HStack>
                    </VStack>
                </PageTransition>
            </Flex>
        </Flex>
    );
};

export default SignUp;