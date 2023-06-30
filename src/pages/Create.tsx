import { CardsList } from '../features/flash-cards/CardList'
import { CardSourceSearch } from '../features/flash-cards/UI/CardSourceSearch'

const Create = () => {
  return (
    <section className='lg:flex'>
      <CardSourceSearch />
      <CardsList />
    </section>
  )
}

export default Create
