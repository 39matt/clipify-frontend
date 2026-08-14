
import { Box, Flex } from '@chakra-ui/react'
import Header from "@/app/(pages)/components/header";
import Footer from "@/app/(pages)/components/footer";

export default async function PagesLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return (
        <Flex direction="column" minH="100vh" bg="black" color="white">
            <Header />

            <Box as="main" flex="1" w="full">
                {children}
            </Box>

            <Footer />
        </Flex>
    )
}