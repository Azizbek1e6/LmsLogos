import React from "react";

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
}

const LoadingSpinner = ({
  size = "3.25em",
  color = "#106ee8",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="25 25 50 50"
        style={{
          width: size,
          transformOrigin: "center",
          animation: "rotate4 2s linear infinite",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          style={{
            fill: "none",
            stroke: color,
            strokeWidth: 10,
            strokeDasharray: "2, 200",
            strokeDashoffset: 0,
            strokeLinecap: "round",
            animation: "dash4 1.5s ease-in-out infinite",
          }}
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
