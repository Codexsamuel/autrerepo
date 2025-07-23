"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

interface FlightData {
  timestamp: number;
  altitude: number;
  speed: number;
  battery: number;
  signal: number;
  temperature: number;
  coordinates: { x: number; y: number; z: number };
}

interface DroneFlightChartProps {
  flightData: FlightData[];
  title: string;
  dataKey: keyof FlightData;
  color: string;
  unit: string;
  minValue?: number;
  maxValue?: number;
}

export default function DroneFlightChart({
  flightData,
  title,
  dataKey,
  color,
  unit,
  minValue = 0,
  maxValue = 100
}: DroneFlightChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || flightData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (width - 2 * padding) * (i / 10);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - 2 * padding) * (i / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Draw data line
    if (flightData.length > 1) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();

      flightData.forEach((data, index) => {
        const x = padding + (width - 2 * padding) * (index / (flightData.length - 1));
        
        let value: number;
        if (dataKey === 'coordinates') {
          value = data.coordinates.z; // Use Z coordinate for altitude
        } else {
          value = data[dataKey] as number;
        }

        const normalizedValue = (value - minValue) / (maxValue - minValue);
        const y = height - padding - (height - 2 * padding) * normalizedValue;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw data points
      ctx.fillStyle = color;
      flightData.forEach((data, index) => {
        const x = padding + (width - 2 * padding) * (index / (flightData.length - 1));
        
        let value: number;
        if (dataKey === 'coordinates') {
          value = data.coordinates.z;
        } else {
          value = data[dataKey] as number;
        }

        const normalizedValue = (value - minValue) / (maxValue - minValue);
        const y = height - padding - (height - 2 * padding) * normalizedValue;

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height - 2 * padding) * (i / 5);
      const value = maxValue - (maxValue - minValue) * (i / 5);
      ctx.fillText(`${value.toFixed(1)}${unit}`, padding - 10, y + 4);
    }

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, padding - 5);

  }, [flightData, title, dataKey, color, unit, minValue, maxValue]);

  return (
    <Card className="bg-[#181f2a] border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full h-48 rounded-lg bg-gray-900"
        />
      </CardContent>
    </Card>
  );
} 