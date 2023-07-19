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
      <div className='h-full bg-primary rounded' style={{ width: `${meterWidth}%` }}></div>
      <div className='flex justify-between relative bottom-3'>
        {Array.from(Array(dotCount).keys()).map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full ${
              step < curStep ? 'bg-green-500' : step === curStep ? 'bg-black' : 'bg-gray-400'
            }`}></div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
