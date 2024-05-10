// Type definition for the props expected from HeartRateZone
export type HeartRateZone = {
  lowerLimit: number;
  higherLimit: number;
  inZone: string;
  distance: number;
  zoneIndex: number;
};

// Type definition for the props expected from HeartRateSample
export type HeartRateSample = {
  dateTime: string;
  value: number;
};

// Type definition for the props expected from SpeedZone
export type SpeedZone = {
  lowerLimit: number;
  higherLimit: number;
  inZone: string;
  distance: number;
  zoneIndex: number;
};

// Type definition for the props expected from Speed
export type Speed = {
  avg: number;
  max: number;
};

// Type definition for the props expected from HeartRate
export type HeartRate = {
  min: number;
  avg: number;
  max: number;
};

// Type definition for the props expected from PhysicalInformationSnapshot
export type PhysicalInformationSnapshot = {
  dateTime: string;
  sex: "FEMALE" | "MALE";
  birthday: string;
  height_cm: number;
  weight_kg: number;
  vo2Max: number;
  maximumHeartRate: number;
  restingHeartRate: number;
  aerobicThreshold: number;
  anaerobicThreshold: number;
  sleepGoal: string;
};

// Type definition for the props expected from Exercise
export type Exercise = {
  startTime: string;
  stopTime: string;
  timezoneOffset: number;
  duration: string;
  distance: number;
  sport: string;
  kiloCalories: number;
  heartRate: HeartRate;
  speed: Speed;
  zones: {
    speed: SpeedZone[];
    heart_rate: HeartRateZone[];
  };
  samples: {
    heartRate: HeartRateSample[];
  };
};

// Type definition for the props expected from TrainingSessionData
export type TrainingSessionData = {
  exportVersion: string;
  name: string;
  deviceId: string;
  startTime: string;
  stopTime: string;
  timeZoneOffset: number;
  distance: number;
  duration: string;
  maximumHeartRate: number;
  averageHeartRate: number;
  kiloCalories: number;
  physicalInformationSnapshot: PhysicalInformationSnapshot;
  exercises: Exercise[];
};
