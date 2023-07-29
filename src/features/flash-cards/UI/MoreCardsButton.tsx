import { useAppDispatch } from '../../../context/hooks'
import { LanguageCode } from '../../../models/Language.model'
import { fetchTranslations } from '../cardsSlice'

export const MoreCardsButton = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      className='rounded text-xl text-white bg-green-300 hover:bg-green-500 relative top-1/2 py-4 px-2'
      onClick={() => {
        dispatch(fetchTranslations({ sourceLang: LanguageCode.EN, targetLang: LanguageCode.ES, topic: 'food' }))
      }}>
      <span>Get More Cards</span>
    </button>
  )
}
