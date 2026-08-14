'use client';

import * as React from 'react';
import { chakra, type HTMLChakraProps } from '@chakra-ui/react';
import {
    motion,
    isValidMotionProp,
    type HTMLMotionProps,
} from 'framer-motion';

/**
 * Chakra v3's `chakra()` factory signature is:
 *   chakra(Component, recipeOrStyleConfig?, options?)
 * `shouldForwardProp` lives in the THIRD argument (options), not the
 * second one — the second argument is reserved for a `RecipeDefinition`
 * (base styles / variants). Passing `{ shouldForwardProp }` as the second
 * argument is what caused:
 *   TS2353: Object literal may only specify known properties, and
 *   'shouldForwardProp' does not exist in type 'RecipeDefinition<...>'
 *
 * Correct call: chakra(motion.div, {}, { shouldForwardProp })
 */
type ChakraDivProps = Omit<HTMLChakraProps<'div'>, 'transition' | 'children'>;
type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'children'>;

export type MotionBoxProps = ChakraDivProps &
    MotionDivProps & {
    children?: React.ReactNode;
};

const ChakraMotionDiv = chakra(
    motion.div,
    {},
    {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    }
);

export const MotionBox = React.forwardRef<HTMLDivElement, MotionBoxProps>(
    function MotionBox(props, ref) {
        return <ChakraMotionDiv ref={ref} {...(props as any)} />;
    }
);