// components/StepLine.jsx
import React from "react";

/**
 * StepLine
 * - responsive SVG path that goes: left -> mid (horizontal) -> down -> right
 * - nodes (circles) are drawn at key points; you can replace them with icons/labels
 *
 * Usage: <StepLine className="h-64" /> or <StepLine className="w-full h-48" />
 */
export default function StepLine({ className = "w-full h-56" }) {
  // Points are in a 0..100 coordinate system (viewBox). Change numbers to tweak shape:
  // 0,20  - left start
  // 50,20 - center (horizontal)
  // 50,60 - down from center
  // 100,60 - right end
  const polyPoints = "0,20 50,20 50,60 100,60";

  return (
    <div className={`relative ${className}`}>
      {/* background / container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* optional background card */}
      </div>

      {/* SVG that scales to the container */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* gradient for the stroke (optional) */}
          <linearGradient id="lineGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#FB923C" /> {/* orange */}
            <stop offset="70%" stopColor="#10B981" /> {/* green */}
          </linearGradient>

          {/* marker for arrow or end cap (optional) */}
          <marker
            id="dot"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <circle cx="3" cy="3" r="2" fill="#10B981" />
          </marker>
        </defs>

        {/* the polyline (the actual L-like path) */}
        <polyline
          points={polyPoints}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* optional arrow marker at end */}
        {/* <polyline points={polyPoints} fill="none" stroke="url(#lineGrad)" strokeWidth="2.8"
            markerEnd="url(#dot)"/> */}

        {/* nodes — circles at the key points */}
        <circle
          cx="0"
          cy="20"
          r="3.2"
          fill="#F97316"
          stroke="#fff"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="20"
          r="3.6"
          fill="#F97316"
          stroke="#fff"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="60"
          r="3.6"
          fill="#F97316"
          stroke="#fff"
          strokeWidth="0.6"
        />
        <circle
          cx="100"
          cy="60"
          r="4.2"
          fill="#10B981"
          stroke="#fff"
          strokeWidth="0.6"
        />

        {/* labels (you can replace with foreignObject / HTML overlays if needed) */}
        <text x="0" y="12" fontSize="4" textAnchor="start" fill="#111827">
          Pending
        </text>
        <text x="50" y="12" fontSize="4" textAnchor="middle" fill="#111827">
          Touch
        </text>
        <text x="50" y="74" fontSize="4" textAnchor="middle" fill="#111827">
          Cross
        </text>
        <text x="100" y="74" fontSize="4" textAnchor="end" fill="#111827">
          Success
        </text>
      </svg>

      {/* If you prefer HTML tooltips / richer content at nodes, absolutely-position them: */}
      <div className="absolute left-0 top-[20%] translate-y-[-50%] -translate-x-1/2">
        <div className="bg-white/90 px-2 py-1 rounded text-xs shadow">
          Pending
        </div>
      </div>

      <div className="absolute left-1/2 top-[20%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white/90 px-2 py-1 rounded text-xs shadow">
          Touch
        </div>
      </div>

      <div className="absolute left-1/2 top-[60%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white/90 px-2 py-1 rounded text-xs shadow">
          Cross
        </div>
      </div>

      <div className="absolute right-0 top-[60%] transform translate-x-1/2 -translate-y-1/2">
        <div className="bg-white/90 px-2 py-1 rounded text-xs shadow">
          Success
        </div>
      </div>
    </div>
  );
}
