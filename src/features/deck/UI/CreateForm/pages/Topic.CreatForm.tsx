import ChipList from '../../../../../components/ChipList'
import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import { addTopic, removeTopic, selectSourceLang, selectTopics } from '../../../deckCreationSlice'
import TopicSearchBar from '../TopicSearchBar'
import { LanguageCode } from '../../../../../models/Language.model'
import FormPageProps from '../../../../../models/FormPage.model'
import { useEffect, useRef, useState } from 'react'
import {
  arraysAreEqual,
  assignErrorOutlineByName,
  findOutliersAndActOnArr,
  removeErrorOutlineByName,
} from '../../../../../utils'
import Error from '../../../../../components/FormError'

const TopicPageCreateForm = ({ onValidate, index }: FormPageProps) => {
  const dispatch = useAppDispatch()
  const sourceLangCode = useAppSelector(selectSourceLang) as LanguageCode
  const prevTopics = useRef<string[]>([])
  const topics = useAppSelector(selectTopics) as string[]
  const [invalidInputs, setInvalidInputs] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleValidation = () => {
    let valid = true
    let invalidInputs: string[] = []
    let errorMsgs = []

    // If topics has no length, the form is invalid
    if (topics.length === 0) {
      valid = false
      invalidInputs.push('topics')
      errorMsgs.push('At least one topic is required')
    }
    if (typeof onValidate === 'function' && typeof index === 'number') {
      onValidate(index, valid)
    }
    setInvalidInputs((prevInvalidInputs) => {
      // If the invalid inputs have changed, assign the error outline to the new invalid inputs
      findOutliersAndActOnArr(invalidInputs, prevInvalidInputs, assignErrorOutlineByName)

      // If the invalid inputs have changed, remove the error outline from the old invalid inputs
      findOutliersAndActOnArr(prevInvalidInputs, invalidInputs, removeErrorOutlineByName)

      return invalidInputs
    })
    setErrorMsg(errorMsgs.join('\n'))
  }

  const handleAddTopic = (topic: string) => {
    if (topic.length > 0) {
      dispatch(addTopic(topic))
    }
  }

  const handleRemoveTopic = (topic: string) => {
    if (topic.length > 0) {
      dispatch(removeTopic(topic))
    }
  }

  useEffect(() => {
    // If the topics have changed, validate the form
    if (!arraysAreEqual(topics, prevTopics.current)) {
      prevTopics.current = topics
      handleValidation()
    }
  }, [topics])

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='text-right'>
        <span className='text-style-tertiary text-tertiary'>Topics</span>
      </section>
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>Add to Deck</span>
      </section>
      <section className='pb-2'>
        <TopicSearchBar addtlTopicChangeHandler={handleAddTopic} sourceLangCode={sourceLangCode} />
        <section className='pb-1'>
          <Error message={errorMsg} />
        </section>
      </section>
      <section className='pb-2 flex-1'>
        {topics.length === 0 && <span className='text-style-tertiary text-tertiary'>No topics selected</span>}
        {topics.length > 0 && <ChipList chips={topics} addtlChipRemoveHandler={handleRemoveTopic} />}
      </section>
    </div>
  )
}

export default TopicPageCreateForm
