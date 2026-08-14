'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { motion, HTMLMotionProps } from 'framer-motion'
import * as React from 'react'

export type MotionBoxProps = Omit<HTMLMotionProps<'div'>, 'transition' | 'color'> & BoxProps

export const MotionBox = motion.create(Box)