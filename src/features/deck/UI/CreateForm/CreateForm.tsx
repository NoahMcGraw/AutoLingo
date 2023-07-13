import { CreateFormData } from '../../../../models/CreateForm.model'
import { createDeck } from '../../deckSlice'
import PaginatedForm from '../../../../components/PaginatedForm'
import { LanguageCode } from '../../../../models/Language.model'
import { useAppDispatch } from '../../../../context/hooks'

const CreateForm = () => {
  const dispatch = useAppDispatch()

  const formData: CreateFormData = {
    name: '',
    topics: [],
    sourceLang: LanguageCode.EN,
    targetLang: LanguageCode.ES,
  }

  const submitForm = () => {
    // Dispatch action to create deck
    dispatch(createDeck(formData))
  }

  return (
    <PaginatedForm submitFunction={submitForm}>
      <div>Page 1</div>
      <div>Page 2</div>
      <div>Page 3</div>
    </PaginatedForm>
  )
}

export default CreateForm
