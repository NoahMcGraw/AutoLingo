import { useAppDispatch } from '../../../context/hooks'
import { fetchTranslations } from '../cardsSlice'

export const MoreCardsButton = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      className='rounded text-xl text-white bg-green-300 hover:bg-green-500 relative top-1/2 py-4 px-2'
      onClick={() => {
        dispatch(fetchTranslations({ wordNumber: 5 }))
      }}>
      <span>Get More Cards</span>
    </button>
  )
}
