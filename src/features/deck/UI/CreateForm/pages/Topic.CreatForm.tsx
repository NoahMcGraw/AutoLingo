import ChipList from '../../../../../components/ChipList'
import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import { addTopic, removeTopic, selectSourceLang, selectTopics } from '../../../deckCreationSlice'
import TopicSearchBar from '../TopicSearchBar'
import { LanguageCode } from '../../../../../models/Language.model'

const TopicPageCreateForm = () => {
  const dispatch = useAppDispatch()
  const sourceLangCode = useAppSelector(selectSourceLang) as LanguageCode
  const topics = useAppSelector(selectTopics) as string[]

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

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>Topics to Include</span>
      </section>
      <section className='pb-2'>
        <TopicSearchBar addtlTopicChangeHandler={handleAddTopic} sourceLangCode={sourceLangCode} />
      </section>
      <section className='pb-2 flex-1'>
        <ChipList chips={topics} addtlChipRemoveHandler={handleRemoveTopic} />
      </section>
    </div>
  )
}

export default TopicPageCreateForm
