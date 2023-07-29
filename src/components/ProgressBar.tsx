type ProgressBarProps = {
  curStep: number
  totalSteps: number
}

// Shows a progress bar with a meter and dots for each step
const ProgressBar = ({ curStep, totalSteps }: ProgressBarProps) => {
  const stepWidth = 100 / (totalSteps - 1)
  const meterWidth = stepWidth * curStep
  const dotCount = totalSteps
  return (
    <div className='w-full h-3 bg-gray-300 rounded-xl'>
      <div className='transition-all duration-500 h-full bg-primary rounded' style={{ width: `${meterWidth}%` }}></div>
      <div className='flex items-center justify-between relative bottom-3'>
        {Array.from(Array(dotCount).keys()).map((step) => (
          <div
            key={step}
            className={`transition-all duration-500 w-3 h-3 rounded-full ${
              step < curStep
                ? 'bg-green-500 border-2 border-green-500 '
                : step === curStep
                ? curStep === Array.from(Array(dotCount).keys()).length - 1
                  ? 'bg-yellow-400 shine-effect transform scale-125 shadow-glow'
                  : 'bg-gray-500 border-2 border-primary transform scale-125'
                : 'bg-secondary'
            }`}></div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
