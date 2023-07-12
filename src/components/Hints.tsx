const Hints = () => {
  const hints = [
    'Our Algorithms use AI to bring you the best results',
    'Our Goal is to bring language learning to everyone',
    'AutoLingo is being updated every day to bring you the best experience',
  ]

  const getRandomHint = () => {
    return hints[Math.floor(Math.random() * hints.length)]
  }

  return (
    <div className='hints'>
      <div className='font-semibold'>Did you know?</div>
      <div className='font-semibold'>{getRandomHint()}</div>
    </div>
  )
}

export default Hints
