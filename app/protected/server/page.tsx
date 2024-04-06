// Import types, components and other functionality
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

// Define client rendered page
const ServerProtectedPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/protected/server");
  }


  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${session.accessToken}`,
  }

  fetch(
    'https://www.polaraccesslink.com/v3/users/continuous-heart-rate?from=2023-08-24&to=2023-08-24',
    {
      method: 'GET',

      headers: headers,
    }
  )
    .then(function (res) {
      return res.json()
    })
    .then(function (body) {
      console.log(body)
    })

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">server-side</span>{" "}
          protected page
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
      </div>
    </section>
  );
};

// Export component to make it available
export default ServerProtectedPage;
