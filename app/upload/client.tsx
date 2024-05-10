// Import types, components, and other functionality
import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import Chart from "@/app/components/Chart";
import { HeartRateData, HeartRateSamples } from "@/app/types/heartRates";

const UserDataPage: React.FC = () => {
  const [heartRates, setHeartRates] = useState<HeartRateData[]>([]);

  useEffect(() => {
    // Function to read heart rate data files
    const readHeartRateData = () => {
      const dataFolder = path.join(process.cwd(), "user-data");

      try {
        const files = fs.readdirSync(dataFolder);

        const formattedHeartRates: HeartRateData[] = [];

        files.forEach((file) => {
          const filePath = path.join(dataFolder, file);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const userData = JSON.parse(fileContent);

          userData.deviceDays.forEach((day: any) => {
            formattedHeartRates.push({
              polar_user: day.userId.toString(),
              date: day.date,
              heart_rate_samples: day.samples.map((sample: any) => ({
                heart_rate: sample.heartRate,
                sample_time: String(sample.secondsFromDayStart),
              })),
            });
          });
        });

        // Set the formatted data into state
        setHeartRates(formattedHeartRates);
      } catch (error) {
        console.error("Error reading heart rate data:", error);
      }
    };

    // Call the function to read heart rate data
    readHeartRateData();
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto client-page-content">
        <h1 className="text-2xl font-bold">
          User Data Upload and Display Page
        </h1>

        <h2 className="mt-4 font-medium">Heart Rate Data:</h2>
        {heartRates.length > 0 ? (
          <div>
            {heartRates.map((rate, index) => (
              <div key={index}>
                <p>{rate.date}</p>
                <Chart
                  height={500}
                  width={1000}
                  heart_rate_samples={rate.heart_rate_samples}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No heart rate data found.</p>
        )}
      </div>
    </section>
  );
};

export default UserDataPage;
