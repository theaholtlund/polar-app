// Import types, components and other functionality
import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientOrangeRed } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { HeartRateSamples } from "../types/heartRates";

const verticalMargin = 120;

// Define accessors
const getSampleTime = (d: HeartRateSamples) => d.sample_time;
const getHeartRate = (d: HeartRateSamples) => Number(d.heart_rate);

export type BarsProps = {
  width: number;
  height: number;
  heart_rate_samples: HeartRateSamples[];
};

export default function Chart({
  width,
  height,
  heart_rate_samples,
}: BarsProps) {
  // Bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // Scales, memoise the result for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: heart_rate_samples.map(getSampleTime),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...heart_rate_samples.map(getHeartRate))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientOrangeRed id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {heart_rate_samples.map((d) => {
          const letter = getSampleTime(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getHeartRate(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(248, 46, 0, 0.4)"
            />
          );
        })}
      </Group>
    </svg>
  );
}
