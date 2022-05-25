import { Combobox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { getSearchSuggestions } from "../../../api/datamuse/datamuse"
import { useAppDispatch } from "../../../app/hooks"
import { SourceWord } from "../../../app/types"
import { capitalizeFirstLetter, createClearAllTimeouts } from "../../../utils"
import { fetchTranslations } from "../cardsSlice"


export const CardSourceSearch = () => {
  const dispatch = useAppDispatch()
  const maxSugResults = 6
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [maxQueryResults, setMaxQueryResults] = useState<number>(20)
  const [autoFillList, setAutoFillList] = useState<SourceWord[]>([])

  const handleQueryChange = (newQuery: string) => {
    // TODO: Figure out how to clear previous timeouts and only run one search at a time
    const clearAllTimeouts = createClearAllTimeouts();
    clearAllTimeouts() // Clear all prev timeouts
    // If the query is not empty, reset the timeout and then get the suggested results.
    if (newQuery) {
      setTimeout(() => {
        getSearchSuggestions(newQuery, maxSugResults)
        .then((searchResults: SourceWord[]) => {
          setAutoFillList(searchResults)

        })
      }, 1000)
    }
    else {
      setAutoFillList([])
    }
  }

  const fetchMoreCardsByTopic = () => {
    dispatch(fetchTranslations({wordNumber: maxQueryResults, sourceLang: "en", targetLang: "es", topic: selectedTopic}))
    setSelectedTopic('')
  }

  // useEffect(()=>{
  //   console.log(selectedTopic)
  // }, [selectedTopic])


  return (
    <div className="w-full h-1/6 bg-gray-800 bg-opacity-80">
      <div className="text-xl py-2 text-slate-100">
        Add more cards by Topic
      </div>
      <div className="relative mt-3 flex justify-center left-0 right-0 z-1000">
        <Combobox value={selectedTopic} onChange={setSelectedTopic}>
          <div className="w-1/2">
            {/* <div className="relative w-full cursor-default overflow-hidden rounded-l bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300"> */}
              <Combobox.Input displayValue={(selectedTopic:string) => capitalizeFirstLetter(selectedTopic)} className={`bg-slate-100 py-2 px-4 w-full rounded-l`} placeholder="Find a topic to add" onChange={(e) => handleQueryChange(e.target.value)} />
              {/* <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                Find
              </Combobox.Button> */}
            {/* </div> */}
            <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => {
              setQuery(''),
              setAutoFillList([])
            }}
            >
              <Combobox.Options className={"mx-auto bg-slate-100 rounded-b text-xl"}>
                {autoFillList.map((fillOption) => (
                  <Combobox.Option key={fillOption} value={fillOption} className={"text-left ml-8"}>
                    - {capitalizeFirstLetter(fillOption)}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
        <div className="h-10 p-2 text-gray-300 bg-slate-100 cursor-default">
          <span>Max Amt</span>
        </div>
        <input defaultValue={maxQueryResults} onChange={(e) => setMaxQueryResults(Number(e.target.value))} type="number" className="bg-slate-100 pl-1 py-1 w-12 h-10" max={100}/>
        <button onClick={(e) => fetchMoreCardsByTopic()} disabled={!(selectedTopic.length > 0)} className={`py-1 w-12 h-10 rounded-r ${selectedTopic.length ? "bg-green-300" : "bg-slate-200"}`}>
          Add
        </button>
      </div>

    </div>
  )
}
