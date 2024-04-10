// Import types, components and other functionality
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest } from "next/server";

// Define endpoint to get heart rate data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const session = await getServerSession(authOptions);

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${session?.accessToken}`,
  };

  const response = await fetch(
    `https://www.polaraccesslink.com/v3/users/continuous-heart-rate?from=${from}&to=${to}`,
    {
      method: "GET",

      headers: headers,
    }
  );
  const data = await response.json();
  console.log(data);

  return Response.json({ data });
}
