import React, { useEffect, useState } from 'react'
import { LoadingOverlay } from './Loading'

interface HalfCircleGaugeProps {
  value: number
}

const HalfCircleGauge: React.FC<HalfCircleGaugeProps> = ({ value }) => {
  const normalizedValue = Math.max(0, Math.min(value, 1))

  return (
    <div className='flex items-center justify-center'>
      <svg width='220' height='120' viewBox='0 0 220 120'>
        <defs>
          <linearGradient id='gauge-gradient'>
            <stop offset='0%' stopColor='red' />
            <stop offset='50%' stopColor='yellow' />
            <stop offset='100%' stopColor='green' />
          </linearGradient>
        </defs>
        <path
          d='M 10 110 A 100 100 0 0 1 210 110'
          fill='transparent'
          stroke='url(#gauge-gradient)'
          strokeWidth='20'
          strokeDasharray='314.16' // approx. pi * radius
          strokeDashoffset={0} // 0% of the stroke is hidden
        />
        <line
          x1='110'
          y1='110'
          x2='110'
          y2='10'
          stroke='black'
          strokeWidth='5'
          transform={`rotate(${(normalizedValue - 0.5) * 180}, 110, 110)`}
        />
      </svg>
    </div>
  )
}

export default HalfCircleGauge
