// Import types, components and other functionality
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest } from "next/server";
import {
  getLocalJsonFiles,
  mapTrainingSessionDataToHeartRateData,
} from "@/app/utils/localFiles";
import { DateTime } from "luxon";

// Define endpoint to get heart rate data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from") as string;
  const to = searchParams.get("to") as string;
  const localFiles = searchParams.get("local");

  if (localFiles) {
    const localFilesData = await getLocalJsonFiles();
    const filteredData = localFilesData?.filter(
      (json) =>
        DateTime.fromISO(json.startTime).startOf("day") >=
          DateTime.fromISO(from).startOf("day") &&
        DateTime.fromISO(json.startTime).startOf("day") <=
          DateTime.fromISO(to).startOf("day")
    );
    if (filteredData) {
      const data = mapTrainingSessionDataToHeartRateData(filteredData);
      return Response.json({
        data: { heart_rates: data },
      });
    } else {
      return Response.json({ error: "Could not get local files" });
    }
  } else {
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

    return Response.json({ data });
  }
}
