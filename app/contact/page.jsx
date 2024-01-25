import Container from "@/components/ui/Container";
import Navbar from "@/components/ui/Navbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("dashboard");
  return (
    <Container>
      <Navbar />
      <h1>Contact</h1>
    </Container>
  );
}

export default page;
