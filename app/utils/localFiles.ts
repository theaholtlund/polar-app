// Import types, components and other functionality
import fs from "fs";
import path from "path";
import { TrainingSessionData } from "../types/trainingSession";
import { HeartRateData, HeartRateSamples } from "../types/heartRates";

// Use async function for reading directory and files
const getLocalJsonFiles = async () => {
  try {
    const directoryPath = "./user-data";
    const files = await fs.promises.readdir(directoryPath);

    const jsonFiles = files.filter((file) => {
      return (
        path.extname(file) === ".json" &&
        file.toLowerCase().includes("training-session")
      );
    });

    const jsonArray = [];
    for (const file of jsonFiles) {
      const filePath = path.join(directoryPath, file);
      const fileData = await fs.promises.readFile(filePath);
      const json = JSON.parse(fileData.toString()) as TrainingSessionData;
      jsonArray.push(json);
    }
    return jsonArray;
  } catch (error) {
    console.error("Error reading JSON files:", error);
  }
};

// Map training data to structure displaying heart rates
const mapTrainingSessionDataToHeartRateData = (
  activityDataList: TrainingSessionData[]
): HeartRateData[] => {
  const heartRateDataList: HeartRateData[] = [];

  activityDataList?.forEach((activityData) => {
    activityData?.exercises?.forEach((exercise) => {
      // Extract relevant information for HeartRateData
      const date = exercise.startTime;

      // Extract heart rate samples from exercise samples
      const heartRateSamples: HeartRateSamples[] =
        exercise.samples?.heartRate?.map((sample) => ({
          heart_rate: sample.value,
          sample_time: sample.dateTime,
        })) ?? [];

      const heartRateData: HeartRateData = {
        polar_user: "local",
        date,
        heart_rate_samples: heartRateSamples,
      };

      heartRateDataList.push(heartRateData);
    });
  });

  return heartRateDataList;
};

export { getLocalJsonFiles, mapTrainingSessionDataToHeartRateData };
