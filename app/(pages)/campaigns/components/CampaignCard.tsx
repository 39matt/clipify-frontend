'use client'

import {
    AspectRatio,
    Badge,
    Box,
    Flex,
    HStack,
    Icon,
    Image,
    Progress,
    Separator,
    Text,
    VStack,
} from '@chakra-ui/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { FiArrowUpRight, FiEye, FiTrendingUp } from 'react-icons/fi'
import { ICampaign } from '@/app/lib/models/campaign'

interface CampaignCardProps {
    campaign: ICampaign
    router: AppRouterInstance
}

const formatMoney = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)

const formatNumber = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, router }) => {
    const moneySpent =
        campaign.moneySpent ??
        Math.round((campaign.budget * campaign.progress) / 100)

    const progressPercent =
        campaign.budget > 0
            ? Math.min((moneySpent / campaign.budget) * 100, 100)
            : 0

    return (
        <Box
            role="button"
            tabIndex={0}
            w="full"
            bg="gray.900/80"
            backdropFilter="blur(8px)"
            border="1px solid"
            borderColor="white/10"
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            transition="all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow:
                    '0 12px 24px -10px rgba(0,0,0,0.5), 0 0 20px rgba(239, 68, 68, 0.1)',
                '& .campaign-image': {
                    transform: 'scale(1.06)',
                },
                '& .campaign-arrow': {
                    transform: 'translate(2px, -2px)',
                    bg: 'red.500',
                    borderColor: 'red.400',
                    color: 'white',
                },
            }}
            _focusVisible={{
                outline: '2px solid',
                outlineColor: 'red.400',
                outlineOffset: '3px',
            }}
            cursor="pointer"
            onClick={() => router.push(`/campaigns/${campaign.id}`)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    router.push(`/campaigns/${campaign.id}`)
                }
            }}
        >
            <Box position="relative">
                <AspectRatio ratio={16 / 9} w="full">
                    <Image
                        className="campaign-image"
                        src={campaign.imageUrl || '/placeholder.png'}
                        alt={`Kampanja: ${campaign.activity}`}
                        objectFit="cover"
                        w="full"
                        h="full"
                        transition="transform 500ms ease"
                    />
                </AspectRatio>

                <HStack position="absolute" top={3} left={3} gap={2}>
                    <Badge
                        bg={campaign.isActive ? 'green.500/20' : 'gray.500/20'}
                        color={campaign.isActive ? 'green.400' : 'gray.400'}
                        border="1px solid"
                        borderColor={campaign.isActive ? 'green.500/30' : 'gray.500/30'}
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        fontSize="2xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        backdropFilter="blur(4px)"
                    >
                        {campaign.isActive ? 'Aktivna' : 'Završena'}
                    </Badge>

                    {campaign.isPot && (
                        <Badge
                            bg="purple.500/20"
                            color="purple.300"
                            border="1px solid"
                            borderColor="purple.500/30"
                            px={2.5}
                            py={1}
                            borderRadius="full"
                            fontSize="2xs"
                            fontWeight="700"
                            backdropFilter="blur(4px)"
                        >
                            POT
                        </Badge>
                    )}
                </HStack>

                {campaign.totalViews > 0 && (
                    <Flex
                        position="absolute"
                        top={3}
                        right={3}
                        align="center"
                        bg="black/60"
                        backdropFilter="blur(8px)"
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        border="1px solid"
                        borderColor="white/10"
                    >
                        <Icon boxSize={3} mr={1.5} color="gray.300">
                            <FiEye />
                        </Icon>
                        <Text fontSize="xs" color="gray.200" fontWeight="600">
                            {formatNumber(campaign.totalViews)}
                        </Text>
                    </Flex>
                )}

                <Flex
                    className="campaign-arrow"
                    position="absolute"
                    bottom={3}
                    right={3}
                    align="center"
                    justify="center"
                    boxSize={8}
                    borderRadius="full"
                    bg="black/60"
                    border="1px solid"
                    borderColor="white/20"
                    color="gray.300"
                    backdropFilter="blur(8px)"
                    transition="all 220ms ease"
                >
                    <Icon boxSize={4}>
                        <FiArrowUpRight />
                    </Icon>
                </Flex>

                <Box
                    position="absolute"
                    inset={0}
                    bgGradient="linear(to-t, gray.900 0%, transparent 40%)"
                    pointerEvents="none"
                />
            </Box>

            <VStack align="stretch" gap={4} p={5} pt={2}>
                <VStack align="start" gap={1}>
                    <Text
                        fontSize="2xs"
                        fontWeight="700"
                        color="red.400"
                        textTransform="uppercase"
                        letterSpacing="wider"
                    >
                        {campaign.influencer}
                    </Text>

                    <Text
                        fontSize="lg"
                        fontWeight="800"
                        color="white"
                        lineHeight="1.3"
                    >
                        {campaign.activity}
                    </Text>
                </VStack>

                <Flex gap={3}>
                    <Box
                        flex={1}
                        bg="white/5"
                        p={3}
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="white/10"
                    >
                        <HStack gap={1.5} mb={1}>
                            <Icon boxSize={3.5} color="red.400">
                                <FiTrendingUp />
                            </Icon>
                            <Text fontSize="xs" color="gray.400" fontWeight="600">
                                Rate / 1M
                            </Text>
                        </HStack>

                        <Text fontSize="md" color="white" fontWeight="800">
                            {campaign.perMillionText ||
                                `${formatMoney(campaign.perMillion)} / 1M`}
                        </Text>
                    </Box>
                </Flex>

                <Separator borderColor="white/10" />

                <VStack align="stretch" gap={2}>
                    <HStack justify="space-between" align="baseline">
                        <Text fontSize="xs" color="gray.400" fontWeight="600">
                            Potrošen budžet
                        </Text>

                        <Text fontSize="xs" color="gray.400" fontWeight="600">
                            {formatMoney(moneySpent)}{' '}
                            <Text as="span" fontSize="sm" color="white" fontWeight="800">
                                / {formatMoney(campaign.budget)}
                            </Text>
                        </Text>
                    </HStack>

                    <Progress.Root
                        value={progressPercent}
                        size="xs"
                        borderRadius="full"
                        colorPalette={progressPercent > 85 ? 'red' : 'green'}
                    >
                        <Progress.Track bg="white/10" borderRadius="full" h="5px">
                            <Progress.Range borderRadius="full" />
                        </Progress.Track>
                    </Progress.Root>
                </VStack>
            </VStack>
        </Box>
    )
}

export default CampaignCard