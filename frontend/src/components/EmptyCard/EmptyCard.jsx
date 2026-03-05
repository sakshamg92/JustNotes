import React from "react"

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-24 px-4">
      {/* Inline SVG illustration — no external URLs */}
      <div className="w-48 h-48 mb-6 flex items-center justify-center">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="100" cy="100" r="90" fill="#EEF2FF" />
          <rect
            x="60"
            y="50"
            width="80"
            height="100"
            rx="8"
            fill="white"
            stroke="#C7D2FE"
            strokeWidth="2"
          />
          <line
            x1="75"
            y1="75"
            x2="125"
            y2="75"
            stroke="#E0E7FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="90"
            x2="115"
            y2="90"
            stroke="#E0E7FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="75"
            y1="105"
            x2="120"
            y2="105"
            stroke="#E0E7FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="145" cy="135" r="25" fill="#6366F1" fillOpacity="0.1" />
          <text
            x="145"
            y="142"
            textAnchor="middle"
            fontSize="24"
            fill="#6366F1"
          >
            +
          </text>
        </svg>
      </div>

      <p className="max-w-md text-sm font-medium text-gray-500 text-center leading-relaxed">
        {message}
      </p>
    </div>
  )
}

export default EmptyCard