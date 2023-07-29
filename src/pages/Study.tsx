import DeckList from '../features/deck/DeckList'
import { CardsList } from '../features/flash-cards/CardList'

const Study = () => {
  return (
    <section className='flex justify-between gap-4 w-full max-w-7xl'>
      <DeckList className={'hidden md:block w-[20%] min-w-[350px] min-h-[800px] z-[80]'} />
      <CardsList className={'w-[100%] md:w-[80%] min-w-[350px] min-h-[800px]'} />
      {/* <div className='hidden xl:block w-[20%] min-w-[350px] mx-8'></div> */}
    </section>
  )
}

export default Study
