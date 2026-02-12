import { Center, Container } from "@mantine/core";
import SuspenseOutlet from "@/components/SuspenseOutlet";

export default function AuthLayout() {
  return (
    <Center w="100%" mih="100dvh" bg="#f1f1f1">
      <Container w={{ xl: "30dvw", lg: "60dvw", md: "100%" }} my={40}>
        <SuspenseOutlet />
      </Container>
    </Center>
  );
}
