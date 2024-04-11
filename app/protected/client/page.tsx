"use client";

// Import types, components and other functionality
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import TimeRangeSelector from "../../components/TimeRangeSelector";

// Type definition for the props expected
interface HeartRateData {
  heart_rate: number;
  sample_time: string;
}

// Define client rendered page
const ClientProtectPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/protected/client");
    },
  });

  const [heartRates, setHeartRates] = useState<HeartRateData[]>([]);

  const handleTimeRangeChange = (from: string, to: string) => {
    if (!session) return;

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    };

    fetch(`/api/heart-rate?from=${from}&to=${to}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setHeartRates(data);
      })
      .catch((error) => {
        console.error("Failed to fetch heart rate data:", error);
      });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto client-page-content">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">client-side</span>{" "}
          protected page
        </h1>
        <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />
        <h2 className="mt-4 font-medium">Heart Rate Data:</h2>
        {heartRates.length > 0 ? (
          <ul>
            {heartRates.map((rate: HeartRateData, index: number) => (
              <li
                key={index}
              >{`Time: ${rate.sample_time}, Heart Rate: ${rate.heart_rate}`}</li>
            ))}
          </ul>
        ) : (
          <p>
            Select a time range to see registered heart rates in that time
            interval.
          </p>
        )}
        <p className="mt-4">You are logged in as: {session?.user?.name}</p>
      </div>
    </section>
  );
};

// Export component to make it available
export default ClientProtectPage;
