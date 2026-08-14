'use client';

import React, { useState } from 'react';
import {
  Box,
  BoxProps,
  Container,
  Flex,
  Button,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type HeaderProps = Omit<BoxProps, 'children'>

export const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { label: 'Case studies', href: '#case-studies' },
    { label: 'Planovi', href: '#plans' },
    { label: 'Zaradi kao kliper', href: '/signup' },
  ];

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
      <>
        {/* Desktop Header - Bottom Sticky */}
        <Box
            as="header"
            position="fixed"
            bottom="24px"
            left="0"
            right="0"
            zIndex="sticky"
            display={{ base: 'none', md: 'block' }}
            pointerEvents="none"
        >
          <Container maxW="7xl">
            <Flex justify="center">
              <Box
                  pointerEvents="auto"
                  bg="rgba(255,255,255,0.9)"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="rgba(0,0,0,0.06)"
                  boxShadow="0 12px 40px rgba(0,0,0,0.12)"
                  borderRadius="full"
                  px={{ md: 4, lg: 6 }}
                  py={{ md: 2, lg: 3 }}
                  minH={{ md: '64px', lg: '72px' }}
                  display="flex"
                  alignItems="center"
              >
                <HStack gap={{ md: 1, lg: 2 }}>
                  {menuItems.map((item) => (
                      <Button
                          key={item.href}
                          variant="ghost"
                          border="none"
                          size="lg"
                          fontWeight="700"
                          color="gray.900"
                          px={{ md: 4, lg: 5 }}
                          height={{ md: '48px', lg: '52px' }}
                          borderRadius="full"
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.href.startsWith('#')) {
                              document
                                  .querySelector(item.href)
                                  ?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                              router.push(item.href);
                            }
                          }}
                      >
                        {item.label}
                      </Button>
                  ))}

                  <Button
                      size="lg"
                      height={{ md: '48px', lg: '52px' }}
                      bg="black"
                      color="white"
                      fontWeight="800"
                      px={{ md: 6, lg: 7 }}
                      borderRadius="full"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
                        bg: 'black',
                      }}
                      _active={{ transform: 'translateY(0)' }}
                      transition="all 0.2s"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                            .querySelector('#kontakt')
                            ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                  >
                    Zakaži Poziv
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </Container>
        </Box>

        {/* Mobile Header - Centered Floating Circle */}
        <Box
            position="fixed"
            bottom="24px"
            left="50%"
            transform="translateX(-50%)"
            zIndex="sticky"
            display={{ base: 'block', md: 'none' }}
            {...props}
        >
          <Flex direction="column" align="center">
            {/* Expandable Menu */}
            <AnimatePresence>
              {isOpen && (
                  <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{ width: '100%' }}
                  >
                    <VStack
                        gap={2}
                        mb={2}
                        align="stretch"
                        bg="rgba(26, 26, 26, 0.95)"
                        backdropFilter="blur(10px)"
                        borderRadius="2xl"
                        p={3}
                        border="1px solid"
                        borderColor="white/20"
                        boxShadow="0 12px 40px rgba(0,0,0,0.3)"
                        minW="200px"
                    >
                      {menuItems.map((item) => (
                          <Button
                              key={item.href}
                              size="sm"
                              variant="ghost"
                              color="white"
                              fontWeight="600"
                              justifyContent="flex-start"
                              _hover={{ bg: 'white/20' }}
                              onClick={(e) => {
                                e.preventDefault();
                                if (item.href.startsWith('#')) {
                                  document
                                      .querySelector(item.href)
                                      ?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                  router.push(item.href);
                                }
                                handleClose();
                              }}
                          >
                            {item.label}
                          </Button>
                      ))}

                      <Button
                          asChild
                          size="sm"
                          bg="white"
                          color="black"
                          fontWeight="700"
                          borderRadius="lg"
                          _hover={{ bg: 'gray.100' }}
                      >
                        <a
                            href="https://cal.com/petarnovakovic/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          Zakaži Poziv
                        </a>
                      </Button>
                    </VStack>
                  </motion.div>
              )}
            </AnimatePresence>

            {/* Circular Toggle Button */}
            <IconButton
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                size="lg"
                borderRadius="full"
                bg="black"
                color="white"
                w="64px"
                h="64px"
                boxShadow="0 8px 32px rgba(0,0,0,0.3)"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                }}
                _active={{ transform: 'scale(0.95)' }}
                transition="all 0.2s"
                onClick={handleToggle}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
          </Flex>
        </Box>
      </>
  );
};

export default Header;