'use client';

import { Center, Heading, Text, VStack, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Center minH="100vh" bg="black" color="white" p={4}>
            <VStack gap={4} textAlign="center">
                <Heading fontSize="4xl" fontWeight="800">
                    404
                </Heading>
                <Text fontSize="md" color="gray.400">
                    Stranica koju tražite ne postoji.
                </Text>
                <Button asChild size="sm" bg="white" color="black" _hover={{ bg: 'gray.200' }}>
                    <Link href="/dashboard/profile">Nazad na Dashboard</Link>
                </Button>
            </VStack>
        </Center>
    );
}