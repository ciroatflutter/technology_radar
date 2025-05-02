import React from "react";

import { getChartConfig } from "@/lib/data";
import { Flag } from "@/lib/types";

const { blipSize } = getChartConfig();
const halfBlipSize = blipSize / 2;

interface BlipProps {
  color: string;
  x: number;
  y: number;
  restricted: boolean;
}

function getRestrictedStyle(restricted: boolean) {
  return restricted
    ? {
        strokeWidth: 2,
        stroke: "var(--foreground)",
      }
    : undefined;
}

export function Blip({
  flag,
  color,
  x,
  y,
  restricted = false,
}: BlipProps & { flag: Flag }) {
  switch (flag) {
    case Flag.New:
      return <BlipNew x={x} y={y} color={color} restricted={restricted} />;
    case Flag.Changed:
      return <BlipChanged x={x} y={y} color={color} restricted={restricted} />;
    default:
      return <BlipDefault x={x} y={y} color={color} restricted={restricted} />;
  }
}

function BlipNew({ x, y, color, restricted = false }: BlipProps) {
  x = Math.round(x - halfBlipSize);
  y = Math.round(y - halfBlipSize);
  return (
    <path
      stroke="none"
      fill={color}
      d="M7.93189 1.24806C7.84228 1.09446 7.67783 1 7.5 1C7.32217 1 7.15772 1.09446 7.06811 1.24806L0.0681106 13.2481C-0.0220988 13.4027 -0.0227402 13.5938 0.0664289 13.749C0.155598 13.9043 0.320967 14 0.5 14H14.5C14.679 14 14.8444 13.9043 14.9336 13.749C15.0227 13.5938 15.0221 13.4027 14.9319 13.2481L7.93189 1.24806Z"
      transform={`translate(${x},${y})`}
      style={getRestrictedStyle(restricted)}
    />
  );
}

function BlipChanged({ x, y, color, restricted = false }: BlipProps) {
  x = Math.round(x - halfBlipSize);
  y = Math.round(y - halfBlipSize);
  return (
    <rect
      transform={`rotate(-45 ${x} ${y})`}
      x={x}
      y={y}
      width={blipSize}
      height={blipSize}
      rx="3"
      stroke="none"
      fill={color}
      style={getRestrictedStyle(restricted)}
    />
  );
}

function BlipDefault({ x, y, color, restricted = false }: BlipProps) {
  return (
    <circle
      style={getRestrictedStyle(restricted)}
      cx={x}
      cy={y}
      r={halfBlipSize}
      stroke="none"
      fill={color}
    />
  );
}
