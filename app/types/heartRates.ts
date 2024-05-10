// Type definition for the props expected from HeartRateData
export interface HeartRateData {
  polar_user: string;
  date: string;
  heart_rate_samples: HeartRateSamples[];
}

// Type definition for the props expected from HeartRateSamples
export interface HeartRateSamples {
  heart_rate: number;
  sample_time: string;
}
