import { useAppSelector } from "../../app/hooks"
import { TranslatedResultObj } from "../../app/types"
import { capitalizeFirstLetter } from "../../utils"
import { selectList } from "./cardsSlice"

export const CardsList = () => {
  const cardDataList = useAppSelector(selectList) as TranslatedResultObj[]

  return (
    <section>
      {cardDataList.map((cardData: TranslatedResultObj, i: number) =>
        <div
          key={`card_${i}`}
        >
          <div>
            {capitalizeFirstLetter(cardData.source)}
          </div>
          <div>
            {capitalizeFirstLetter(cardData.translation)}
          </div>
        </div>
      )}
    </section>
  )
}
