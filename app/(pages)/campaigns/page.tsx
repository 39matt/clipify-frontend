'use client';

import {
    Badge,
    Box,
    Card,
    Center,
    Container,
    Flex,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Skeleton,
    Text, Button,
} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiFilter, FiGrid, FiInbox, FiTrendingUp } from 'react-icons/fi';
import {ICampaign} from "@/app/lib/models/campaign";
import CampaignCard from "@/app/(pages)/campaigns/components/CampaignCard";
import {apiFetch} from "@/app/lib/apiClient";

const MotionBox = motion.create(Box);

function DottedBackgroundGlobal() {
    return (
        <Global
            styles={`
        .campaigns-dotted-bg {
          background-color: #000000;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px);
          background-size: 22px 22px;
          background-attachment: fixed;
        }
      `}
        />
    );
}

const normalizeActivity = (activity: string) =>
    activity.trim().replace(/\s+/g, ' ').toLocaleLowerCase();

const Campaigns: NextPage = () => {
    const router = useRouter();
    const [campaignList, setCampaignList] = useState<ICampaign[]>([]);
    const [selectedActivity, setSelectedActivity] = useState('all');
    const [loading, setLoading] = useState(true);

    const availableActivities = Array.from(
        campaignList.reduce((activities, campaign) => {
            const label = campaign.activity.trim().replace(/\s+/g, ' ');
            if (label) activities.set(normalizeActivity(label), label);
            return activities;
        }, new Map<string, string>()),
    ).sort(([, first], [, second]) => first.localeCompare(second));

    const filteredCampaigns =
        selectedActivity === 'all'
            ? campaignList
            : campaignList.filter(
                (campaign) =>
                    normalizeActivity(campaign.activity) === selectedActivity,
            );

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const response = await apiFetch(`/campaigns`, {
                    method: 'GET',

                });

                if (!response.ok) {
                    console.error('Failed to fetch campaigns:', response.statusText);
                    setCampaignList([]);
                    return;
                }

                const campaigns = await response.json();

                if (Array.isArray(campaigns)) {
                    setCampaignList(
                        campaigns
                            .filter((campaign: ICampaign) => campaign.isActive)
                            .sort((a: ICampaign, b: ICampaign) => b.budget - a.budget)
                    );
                } else {
                    console.error('API response is not an array:', campaigns);
                    setCampaignList([]);
                }
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                setCampaignList([]);
            } finally {
                setLoading(false);
            }
        };

        getCampaigns();
    }, []);

    return (
        <>
            <DottedBackgroundGlobal />
            <Box
                className="campaigns-dotted-bg"
                minH="100vh"
                w="full"
                color="white"
                pt={{ base: 6, md: 10 }}
                pb={{ base: 28, md: 16 }}
                px={{ base: 4, md: 8 }}
            >
                <Container maxW="6xl">
                    {/* Header Banner */}
                    <MotionBox
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        mb={8}
                    >
                        <Card.Root
                            bg="gray.900/80"
                            backdropFilter="blur(8px)"
                            color="white"
                            border="1px solid"
                            borderColor="white/10"
                            borderRadius="xl"
                            p={{ base: 5, md: 6 }}
                        >
                            <Flex
                                direction={{ base: 'column', md: 'row' }}
                                justify="space-between"
                                align={{ base: 'flex-start', md: 'center' }}
                                gap={6}
                            >
                                <Flex align="center" gap={4}>
                                    <Center
                                        w={12}
                                        h={12}
                                        borderRadius="xl"
                                        bg="red.500/10"
                                        border="1px solid"
                                        borderColor="red.500/20"
                                        color="red.400"
                                        flexShrink={0}
                                    >
                                        <Icon boxSize={6}>
                                            <FiGrid />
                                        </Icon>
                                    </Center>
                                    <Box>
                                        <HStack gap={2} mb={1}>
                                            <Heading fontSize={{ base: 'lg', md: 'xl' }} fontWeight="800">
                                                Aktivne Kampanje
                                            </Heading>
                                            <Badge
                                                bg="red.500/15"
                                                color="red.400"
                                                border="1px solid"
                                                borderColor="red.500/30"
                                                fontSize="2xs"
                                                fontWeight="700"
                                                px={2}
                                                py={0.5}
                                                borderRadius="full"
                                            >
                                                {filteredCampaigns.length} Uživo
                                            </Badge>
                                        </HStack>
                                        <Text fontSize="xs" color="gray.400" maxW="xl">
                                            Pridružite se aktivnim kampanjama, ispunite uslove za preglede i ostvarite zaradu na osnovu vaših rezultata.
                                        </Text>
                                    </Box>
                                </Flex>

                                <HStack gap={2} bg="black/40" p={1.5} borderRadius="lg" border="1px solid" borderColor="white/5">
                                    <Icon color="red.400" boxSize={4} ml={2}>
                                        <FiTrendingUp />
                                    </Icon>
                                    <Text fontSize="xs" fontWeight="700" color="gray.300" pr={2}>
                                        Automatska Isplata
                                    </Text>
                                </HStack>
                            </Flex>
                        </Card.Root>
                    </MotionBox>

                    {/* Activity Filters */}
                    {!loading && availableActivities.length > 0 && (
                        <MotionBox
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.05 }}
                            mb={8}
                        >
                            <Flex align="center" gap={2} overflowX="auto" pb={2} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                <Center px={3} py={1.5} color="gray.400">
                                    <Icon boxSize={3.5} mr={1.5}>
                                        <FiFilter />
                                    </Icon>
                                    <Text fontSize="xs" fontWeight="700">
                                        Kategorije:
                                    </Text>
                                </Center>

                                <Button
                                    size="sm"
                                    borderRadius="full"
                                    fontSize="xs"
                                    fontWeight="700"
                                    px={4}
                                    bg={selectedActivity === 'all' ? 'red.500' : 'white/5'}
                                    color={selectedActivity === 'all' ? 'white' : 'gray.400'}
                                    border="1px solid"
                                    borderColor={selectedActivity === 'all' ? 'red.500' : 'white/10'}
                                    _hover={{ bg: selectedActivity === 'all' ? 'red.600' : 'white/10' }}
                                    onClick={() => setSelectedActivity('all')}
                                >
                                    Sve Aktivnosti
                                </Button>

                                {availableActivities.map(([activity, label]) => {
                                    const isSelected = selectedActivity === activity;
                                    return (
                                        <Button
                                            key={activity}
                                            size="sm"
                                            borderRadius="full"
                                            fontSize="xs"
                                            fontWeight="700"
                                            px={4}
                                            bg={isSelected ? 'red.500' : 'white/5'}
                                            color={isSelected ? 'white' : 'gray.400'}
                                            border="1px solid"
                                            borderColor={isSelected ? 'red.500' : 'white/10'}
                                            _hover={{ bg: isSelected ? 'red.600' : 'white/10' }}
                                            onClick={() => setSelectedActivity(activity)}
                                        >
                                            {label}
                                        </Button>
                                    );
                                })}
                            </Flex>
                        </MotionBox>
                    )}

                    {/* Grid Content */}
                    {loading ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w="full">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton
                                    key={i}
                                    h="380px"
                                    w="full"
                                    borderRadius="xl"
                                />
                            ))}
                        </SimpleGrid>
                    ) : filteredCampaigns.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w="full">
                            {campaignList.map((campaign, index) => {
                                const isVisible =
                                    selectedActivity === 'all' ||
                                    normalizeActivity(campaign.activity) === selectedActivity;

                                if (!isVisible) return null;

                                return (
                                    <MotionBox
                                        key={campaign.id}
                                        w="full"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.04 }}
                                    >
                                        <CampaignCard campaign={campaign} router={router} />
                                    </MotionBox>
                                );
                            })}
                        </SimpleGrid>
                    ) : (
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card.Root
                                bg="gray.900/80"
                                backdropFilter="blur(8px)"
                                color="white"
                                border="1px solid"
                                borderColor="white/10"
                                borderRadius="xl"
                                p={12}
                                textAlign="center"
                            >
                                <Center flexDir="column">
                                    <Center
                                        w={14}
                                        h={14}
                                        borderRadius="full"
                                        bg="red.500/10"
                                        color="red.400"
                                        mb={4}
                                    >
                                        <Icon boxSize={6}>
                                            <FiInbox />
                                        </Icon>
                                    </Center>
                                    <Heading size="md" color="white" fontWeight="800">
                                        {selectedActivity === 'all'
                                            ? 'Trenutno Nema Aktivnih Kampanja'
                                            : 'Nema Kampanja Za Izabranu Aktivnost'}
                                    </Heading>
                                    <Text fontSize="xs" color="gray.400" mt={2} maxW="sm">
                                        {selectedActivity === 'all'
                                            ? 'Proverite ponovo uskoro za nove prilike za zaradu.'
                                            : 'Izaberite drugu kategoriju iznad da biste videli ostale dostupne kampanje.'}
                                    </Text>
                                    {selectedActivity !== 'all' && (
                                        <Button
                                            mt={5}
                                            onClick={() => setSelectedActivity('all')}
                                            size="sm"
                                            bg="red.500"
                                            color="white"
                                            borderRadius="full"
                                            px={5}
                                            fontWeight="700"
                                            fontSize="xs"
                                            _hover={{ bg: 'red.600' }}
                                        >
                                            Prikaži sve kampanje
                                        </Button>
                                    )}
                                </Center>
                            </Card.Root>
                        </MotionBox>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default Campaigns;