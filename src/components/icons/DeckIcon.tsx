type DeckIconProps = {
  className?: string
}

const DeckIcon = ({ className }: DeckIconProps) => {
  return (
    <svg
      className={`h-8 w-8 ${className ? className : ''}`}
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
      height='48'
      viewBox='0 -960 960 960'
      width='48'>
      <path d='m609-378 44-159-137-93-43 159 136 93ZM170-152l-67-25q-32.755-14.026-43.877-48.348Q48-259.67 67-293l103-245v386Zm142.493 59q-34.318 0-58.406-23.704Q230-140.407 230-174v-314l136.027 368q2.723 8 7.056 14 4.334 6 9.917 13h-70.507ZM535-105q-37 13-71.432-3.203Q429.137-124.407 415-161L227-668q-13-37 3.305-72.062Q246.61-775.125 284-789l304-110q37-13 72.5 3.5T710-843l187 506q14 37-2.203 72.375Q878.593-229.25 842-216L535-105Zm-31-90 301-111-185-502-301 110 185 503Zm59-307Z' />
    </svg>
  )
}

export default DeckIcon
