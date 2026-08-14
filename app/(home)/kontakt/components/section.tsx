'use client'

import React from 'react'
import {
    chakra,
    Container,
    Heading,
    Box,
    VStack,
    type HTMLChakraProps,
    type StackProps,
} from '@chakra-ui/react'

export interface SectionProps extends HTMLChakraProps<'div'> {
    children: React.ReactNode
    innerWidth?: string | number
}

export const Section: React.FC<SectionProps> = (props) => {
    const { children, innerWidth = 'container.lg', ...rest } = props

    return (
        <chakra.div w="full" py={{ base: 12, md: 20 }} {...rest}>
            <Container maxW={innerWidth} height="full">
                {children}
            </Container>
        </chakra.div>
    )
}

export interface SectionTitleProps extends Omit<StackProps, 'title'> {
    title: React.ReactNode
    description?: React.ReactNode
    align?: 'left' | 'center'
}

export const SectionTitle: React.FC<SectionTitleProps> = (props) => {
    const { title, description, align = 'center', ...rest } = props

    return (
        <VStack
            pt={{ base: 12, md: 20 }}
            alignItems={align === 'left' ? 'flex-start' : 'center'}
            gap={4}
            w="full"
            {...rest}
        >
            <Heading
                as="h2"
                fontSize={{ base: '2xl', md: '4xl' }}
                fontWeight="900"
                letterSpacing="-0.02em"
                textAlign={align}
                color="white"
            >
                {title}
            </Heading>
            {description && (
                <Box
                    fontSize={{ base: 'sm', md: 'md' }}
                    color="gray.400"
                    textAlign={align}
                    maxW="2xl"
                >
                    {description}
                </Box>
            )}
        </VStack>
    )
}