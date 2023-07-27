import Deck from './Deck.model'

type FormPageProps = {
  formData?: {
    data: Deck & { topicsToAdd?: string[]; topicsToRemove?: string[]; cardIdToRemove?: string }
    setter: React.Dispatch<React.SetStateAction<Deck>>
  }
  className?: string
  onValidate?: (index: number, valid: boolean) => void
  index?: number
}

export default FormPageProps
