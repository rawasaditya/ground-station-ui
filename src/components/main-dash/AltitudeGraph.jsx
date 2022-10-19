import React from "react";

// Utilities
import {
  LineStyle,
  DotStyle,
  GrowingX,
  GrowingY,
} from "../../utils/chart-options";

// Hooks
import { useStorage } from "../../hooks/useStorage";

// Components
import ReactEcharts from "echarts-for-react";

export default function AltitudeGraph({ className }) {
  // Functions for fetching x and y points
  const get_x = (data) => {
    return data.map((packet) => packet.altitude.mission_time / 1000);
  };
  const get_y = (data) => {
    return data.map((packet) => packet.altitude.altitude.metres);
  };
  const [x, y] = useStorage(get_x, get_y); // Get updated x and y

  const options = {
    xAxis: GrowingX(x, "Time (ms)"),
    yAxis: GrowingY("Altitude (m)"),
    series: [
      {
        data: y,
        type: "line",
        ...LineStyle(1, 3, "solid"),
        ...DotStyle(1, 7),
      },
    ],
  };

  return <ReactEcharts className={className} option={options} />;
}