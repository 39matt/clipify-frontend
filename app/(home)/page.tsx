'use client';

import {Box, Steps} from '@chakra-ui/react';
import { Global } from '@emotion/react';
import MarqueeSection from "@/components/home/MarqueeSection";
import { HeroSection } from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import StepsSection from "@/components/home/StepsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";


export default function Home() {
    return (
        <>
            <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
            <Box
                minH="100dvh"
                color="gray.900"
                overflowX="hidden"
            >
                <HeroSection />
                <MarqueeSection />
                <StatsSection />
                <CaseStudiesSection/>
                <StepsSection />
                <FeaturesSection />
                <PricingSection />
                <FAQSection />
                <CTASection />
            </Box>
        </>
    );
}