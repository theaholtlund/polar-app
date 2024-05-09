// Type definition for the props expected
export interface HeartRateData {
  polar_user: string;
  date: string;
  heart_rate_samples: HeartRateSamples[];
}

export interface HeartRateSamples {
  heart_rate: number;
  sample_time: string;
}
