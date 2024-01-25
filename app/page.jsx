import Navbar from "@/components/ui/Navbar";
import Home from "@/components/Home";
import Container from "@/components/ui/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("dashboard");
  return (
    <Container>
      <Navbar />
      <Home />
    </Container>
  );
}

export default page;
