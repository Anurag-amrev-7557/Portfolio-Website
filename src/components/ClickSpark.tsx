"use client";

import { useCallback, useEffect, useRef } from "react";

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ease = (value: number, easing: ClickSparkProps["easing"]) => {
  switch (easing) {
    case "linear": return value;
    case "ease-in": return value * value;
    case "ease-in-out": return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
    default: return value * (2 - value);
  }
};

export default function ClickSpark({
  sparkColor = "#F8F6F1",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    resize();
    return () => observer.disconnect();
  }, []);

  const animationFrameRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const draw = (timestamp: number) => {
      const dpr = window.devicePixelRatio || 1;
      context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const progress = (timestamp - spark.startTime) / duration;
        if (progress >= 1) return false;
        const distance = ease(progress, easing) * sparkRadius * extraScale;
        const length = sparkSize * (1 - ease(progress, easing));
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        context.strokeStyle = sparkColor;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x1 + length * Math.cos(spark.angle), y1 + length * Math.sin(spark.angle));
        context.stroke();
        return true;
      });

      if (sparksRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(draw);
      } else {
        context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        animationFrameRef.current = null;
      }
    };
    animationFrameRef.current = requestAnimationFrame(draw);
  }, [duration, easing, extraScale, sparkColor, sparkRadius, sparkSize]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const now = performance.now();
      for (let index = 0; index < sparkCount; index += 1) {
        sparksRef.current.push({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          angle: (Math.PI * 2 * index) / sparkCount,
          startTime: now,
        });
      }
      startAnimation();
    },
    [sparkCount, startAnimation]
  );

  return (
    <div className="relative min-h-full w-full" onClick={handleClick}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[100]" aria-hidden="true" />
      {children}
    </div>
  );
}
