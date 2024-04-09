"use client";

// Import types, components and other functionality
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Define client rendered page
const ClientProtectPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/protected/client");
    },
  });

  return (
    <section className="py-24">
      <div className="container mx-auto client-page-content">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">client-side</span>{" "}
          protected page
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
      </div>
    </section>
  );
};

// Export component to make it available
export default ClientProtectPage;
