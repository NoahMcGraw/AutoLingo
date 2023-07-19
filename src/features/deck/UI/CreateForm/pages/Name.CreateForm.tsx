import { useAppDispatch, useAppSelector } from '../../../../../context/hooks'
import { generateDeckName, selectName, selectTopics, setName } from '../../../deckCreationSlice'

const NamePageCreateForm = () => {
  const dispatch = useAppDispatch()
  const name = useAppSelector(selectName) as string
  const topics = useAppSelector(selectTopics) as string[]

  const handleChangeName = (newName: string) => {
    dispatch(setName(newName))
  }

  const handleGenerateDeckName = () => {
    dispatch(generateDeckName({ topics: topics }))
  }

  return (
    <div className='h-full w-full flex flex-col'>
      <section className='pb-2'>
        <span className='text-style-tertiary text-tertiary'>Give Your Deck a Name</span>
      </section>
      <section className='pb-2'>
        <input
          type='text'
          className='w-full h-10 rounded-xl bg-tertiary text-style-tertiary text-gray-400 placeholder-secondary px-4'
          placeholder='Enter a name for your deck'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
      </section>
      <section>
        <div className='text-style-tertiary text-tertiary pb-2'>
          <span>or</span>
        </div>
        <button
          type='button'
          onClick={handleGenerateDeckName}
          className='w-full rounded-xl bg-green-500 text-style-tertiary text-tertiary py-1 px-2'>
          Generate A Name
        </button>
      </section>
    </div>
  )
}

export default NamePageCreateForm
