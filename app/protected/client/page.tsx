"use client";

// Import types, components and other functionality
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import TimeRangeSelector from "../../components/TimeSelector";
import Chart from "@/app/components/Chart";
import { HeartRateData } from "@/app/types/heartRates";
import { getLocalJsonFiles } from "@/app/utils/localFiles";

// Define client rendered page
const ClientProtectPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/protected/client");
    },
  });

  const [heartRates, setHeartRates] = useState<HeartRateData[]>([]);

  const handleTimeRangeChange = (
    from: string,
    to: string,
    localFiles: boolean
  ) => {
    if (!session) return;

    // Account for Polar API limitations
    // Dates cannot be more than one year ago, or more than 28 days apart
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const fromDate = new Date(from);
    const toDate = new Date(to);
    const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (fromDate < oneYearAgo) {
      alert("Selected time range cannot be more than one year.");
      return;
    }

    if (diffDays > 28) {
      alert("Date range between from and to cannot be more than 28 days.");
      return;
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    };

    fetch(`/api/heart-rate?from=${from}&to=${to}&local=${localFiles}`, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        setHeartRates(response.data.heart_rates);
      })
      .catch((error) => {
        console.error("Failed to fetch heart rate data:", error);
      });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Only include sample of heart rates
  const reducedArray = (array: any) => {
    return array.reduce((result: any, currentValue: any, index: number) => {
      if (index % 8 === 0) {
        result.push(currentValue);
      }
      return result;
    }, []);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto client-page-content">
        <link rel="icon" href="/favicon.ico?" type="image/x-icon" />
        <h1 className="text-2xl font-bold">
          This is a <span className="text-orange-300">client-side</span>{" "}
          protected page
        </h1>
        <TimeRangeSelector onTimeRangeChange={handleTimeRangeChange} />

        <h2 className="mt-4 font-medium">Heart Rate Data:</h2>
        {heartRates.length > 0 ? (
          <div>
            {heartRates.map((rate: HeartRateData, index: number) => (
              <div key={index}>
                <p>{rate.date}</p>
                <Chart
                  height={500}
                  width={1000}
                  heart_rate_samples={reducedArray(rate.heart_rate_samples)}
                />
              </div>
            ))}
          </div>
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
