'use client'

import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { useEffect, useState } from 'react'

import { PageTransition } from '#components/home-page/motion/page-transition'
import siteConfig from '#data/config'

import { useAuth } from '../../providers/authProvider'
import { login } from './actions'

const MotionBox = motion(Box)

const Login: NextPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/dashboard/profile')
    }
  }, [user, router])

  if (authLoading) {
    return (
      <Center minH="100vh" bg="white">
        <Spinner size="xl" color="red.500" thickness="4px" />
      </Center>
    )
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)

      await login(formData)
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT')) {
        return
      }
      setError('Pogrešan email ili lozinka. Pokušajte ponovo.')
      setLoading(false)
    }
  }

  return (
    <Flex
      minH="100vh"
      direction="column"
      bg="white"
      sx={{
        backgroundImage: `radial-gradient(rgba(0,0,0,0.06) 2px, transparent 2px)`,
        backgroundSize: '22px 22px',
        backgroundAttachment: 'fixed',
      }}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 12 }}
      position="relative"
    >
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(239, 68, 68, 0.06), transparent 70%)"
        pointerEvents="none"
      />

      <Flex flex="1" align="center" justify="center">
        <PageTransition>
          <VStack
            spacing={{ base: 6, md: 8, lg: 9 }}
            align="stretch"
            maxW="900px"
            minW={{ base: 'auto', md: '400px' }}
            w="full"
          >
            <VStack spacing={{ base: 2, md: 3, lg: 3 }} align="start">
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
                  mb={4}
                >
                  PRISTUP NALOGU
                </Badge>

                <Heading
                  fontSize={{ base: '3xl', md: '4xl', lg: '4xl' }}
                  fontWeight="900"
                  color="gray.900"
                  letterSpacing="-0.02em"
                  mb={{ base: 2, md: 2, lg: 3 }}
                >
                  Dobrodošao nazad
                </Heading>
                <Text
                  color="gray.600"
                  fontSize={{ base: 'md', md: 'lg', lg: 'lg' }}
                  fontWeight="500"
                >
                  Uloguj se da nastaviš zaradu
                </Text>
              </Box>
            </VStack>

            <Box as="form" onSubmit={handleLogin}>
              <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="stretch">
                <VStack spacing={{ base: 2, md: 3, lg: 3 }} align="stretch">
                  <Text
                    fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                    fontWeight="700"
                    color="gray.900"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Email adresa
                  </Text>
                  <Input
                    color="gray.800"
                    type="email"
                    placeholder="tvoj@email.com"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    bg="gray.200"
                    border="2px"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'red.300' }}
                    _focus={{
                      borderColor: 'red.500',
                      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                      bg: 'white',
                    }}
                    borderRadius="xl"
                    height={{ base: '52px', md: '56px', lg: '58px' }}
                    fontSize={{ base: 'md', md: 'md', lg: 'md' }}
                    transition="all 0.2s"
                  />
                </VStack>

                <VStack spacing={{ base: 2, md: 3, lg: 3 }} align="stretch">
                  <Text
                    fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                    fontWeight="700"
                    color="gray.900"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Lozinka
                  </Text>
                  <InputGroup size="lg">
                    <Input
                      color="gray.800"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      size="lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      bg="gray.200"
                      border="2px"
                      borderColor="gray.200"
                      _hover={{ borderColor: 'red.300' }}
                      _focus={{
                        borderColor: 'red.500',
                        boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
                        bg: 'white',
                      }}
                      borderRadius="xl"
                      height={{ base: '52px', md: '56px', lg: '58px' }}
                      fontSize={{ base: 'md', md: 'md', lg: 'md' }}
                      transition="all 0.2s"
                      pr="3.5rem"
                    />
                    <InputRightElement
                      height={{ base: '52px', md: '56px', lg: '58px' }}
                    >
                      <IconButton
                        aria-label={
                          showPassword ? 'Sakrij lozinku' : 'Prikaži lozinku'
                        }
                        icon={<Icon as={showPassword ? FiEyeOff : FiEye} />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size={{ base: 'sm', md: 'md', lg: 'md' }}
                        color="gray.500"
                        _hover={{ color: 'red.500', bg: 'transparent' }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </VStack>

                {error && (
                  <Alert
                    status="error"
                    borderRadius="xl"
                    bg="red.100"
                    borderWidth="2px"
                    borderColor="red.400"
                    py={{ base: 3, lg: 4 }}
                    color="red.800"
                    boxShadow="lg"
                  >
                    <AlertIcon
                      boxSize={{ base: 5, lg: 6 }}
                      color="red.600"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: 'sm', lg: 'md' }}
                      fontWeight="700"
                      color="red.800"
                    >
                      {error}
                    </Text>
                  </Alert>
                )}

                {success && (
                  <Alert
                    status="success"
                    borderRadius="xl"
                    bg="green.100"
                    borderWidth="2px"
                    borderColor="green.400"
                    py={{ base: 3, lg: 4 }}
                    color="green.800"
                    boxShadow="lg"
                  >
                    <AlertIcon
                      boxSize={{ base: 5, lg: 6 }}
                      color="green.600"
                      flexShrink={0}
                    />
                    <Text
                      fontSize={{ base: 'sm', lg: 'md' }}
                      fontWeight="700"
                      color="green.800"
                    >
                      {success}
                    </Text>
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="lg"
                  w="full"
                  bg="black"
                  color="white"
                  _hover={{
                    bg: 'red.500',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(239, 68, 68, 0.4)',
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  height={{ base: '52px', md: '56px', lg: '58px' }}
                  fontSize={{ base: 'md', md: 'md', lg: 'lg' }}
                  fontWeight="800"
                  borderRadius="xl"
                  transition="all 0.2s"
                  isLoading={loading}
                  loadingText="Prijavljivanje..."
                  boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                  mt={2}
                >
                  Uloguj se
                </Button>
              </VStack>
            </Box>

            <HStack
              spacing={{ base: 2, md: 2 }}
              justify="center"
              pt={{ base: 2, md: 4 }}
            >
              <Text
                fontSize={{ base: 'md', md: 'sm', lg: 'md' }}
                color="gray.600"
                fontWeight="500"
              >
                Nemaš nalog?
              </Text>
              <NextLink href="/signup" passHref>
                <Text
                  fontSize={{ base: 'md', md: 'sm', lg: 'md' }}
                  fontWeight="800"
                  color="red.500"
                  cursor="pointer"
                  _hover={{
                    color: 'red.600',
                    textDecoration: 'underline',
                  }}
                >
                  Registracija
                </Text>
              </NextLink>
            </HStack>
          </VStack>
        </PageTransition>
      </Flex>
    </Flex>
  )
}

export default Login
