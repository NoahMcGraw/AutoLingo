import Deck from './Deck.model'

export type CreateDeckFormPageProps = {
  formData?: {
    data: Omit<Deck, 'id' | 'cards'>
    setter: React.Dispatch<React.SetStateAction<Omit<Deck, 'id' | 'cards'>>>
  }
  className?: string
  onValidate?: (index: number, valid: boolean) => void
  index?: number
}

export type EditDeckFormPageProps = {
  formData?: {
    data: Deck & { topicsToAdd?: string[]; topicsToRemove?: string[]; cardIdToRemove?: string }
    setter: React.Dispatch<
      React.SetStateAction<Deck & { topicsToAdd?: string[]; topicsToRemove?: string[]; cardIdToRemove?: string }>
    >
  }
  className?: string
  onValidate?: (index: number, valid: boolean) => void
  index?: number
}
