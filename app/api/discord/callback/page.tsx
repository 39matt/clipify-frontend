'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Center, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { createClient } from '@/app/lib/supabase/client';
import {apiFetch} from "@/app/lib/apiClient";

export default function DiscordCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const code = searchParams.get('code');
    const oauthError = searchParams.get('error');

    const initialError = oauthError
        ? 'Povezivanje Discord naloga je otkazano ili odbijeno.'
        : !code
            ? 'Nedostaje autorizacioni kod u URL-u.'
            : null;

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
        initialError ? 'error' : 'loading'
    );
    const [errorMessage, setErrorMessage] = useState(initialError || '');
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (initialError || hasProcessed.current) return;
        hasProcessed.current = true;

        const linkAccount = async () => {
            try {
                const response = await apiFetch('/users/link-discord', {
                    method: 'PATCH',
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Greška prilikom povezivanja naloga.');
                }

                setStatus('success');
                toaster.create({
                    title: 'Uspeh!',
                    description: 'Uspešno ste povezali vaš Discord nalog.',
                    type: 'success',
                    duration: 4000,
                });

                setTimeout(() => {
                    router.push('/dashboard/profile');
                }, 1500);
            } catch (err: unknown) {
                setStatus('error');
                const message = err instanceof Error ? err.message : 'Došlo je do neočekivane greške.';
                setErrorMessage(message);
                toaster.create({
                    title: 'Greška',
                    description: message,
                    type: 'error',
                    duration: 4000,
                });
            }
        };

        linkAccount();
    }, [code, initialError, router]);

    return (
        <Center minH="100vh" bg="black" color="white" p={4}>
            <Card.Root
                maxW="md"
                w="full"
                bg="gray.900"
                borderColor="white/10"
                borderWidth="1px"
                borderRadius="xl"
                p={6}
            >
                <Card.Body p={0}>
                    <VStack gap={4} align="center" textAlign="center">
                        {status === 'loading' && (
                            <>
                                <Spinner size="xl" color="#7289da" />
                                <Heading fontSize="lg" fontWeight="700">
                                    Povezivanje Discord naloga...
                                </Heading>
                                <Text fontSize="sm" color="gray.400">
                                    Molimo vas sačekajte dok obrađujemo vaš zahtev.
                                </Text>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <Heading fontSize="lg" fontWeight="700" color="green.400">
                                    Nalog je uspešno povezan!
                                </Heading>
                                <Text fontSize="sm" color="gray.400">
                                    Preusmeravamo vas nazad na profil...
                                </Text>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <Heading fontSize="lg" fontWeight="700" color="red.400">
                                    Greška pri povezivanju
                                </Heading>
                                <Text fontSize="sm" color="gray.300">
                                    {errorMessage}
                                </Text>
                            </>
                        )}
                    </VStack>
                </Card.Body>
            </Card.Root>
        </Center>
    );
}