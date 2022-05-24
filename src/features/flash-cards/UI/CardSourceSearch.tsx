import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"
import { getSearchSuggestions } from "../../../api/datamuse/datamuse"
import { SourceWord } from "../../../app/types"
import { createClearAllTimeouts } from "../../../utils"


export const CardSourceSearch = () => {
  const maxSugResults = 6
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [autoFillList, setAutoFillList] = useState<SourceWord[]>([])

  const handleQueryChange = () => {
    // TODO: Figure out how to clear previous timeouts and only run one search at a time
    const clearAllTimeouts = createClearAllTimeouts();
    clearAllTimeouts() // Clear all prev timeouts
    // If the query is not empty, reset the timeout and then get the suggested results.
    if (query) {
      setTimeout(() => {
        getSearchSuggestions(query, maxSugResults)
        .then((searchResults: SourceWord[]) => {
          setAutoFillList(searchResults)
  
        })
      }, 1000)
    }
    else {
      setAutoFillList([])
    }
  }

  useEffect(() => {
    // If query changes, run the handler to update the suggested results.
    handleQueryChange()
  }, [query])

  const handleSelectedOptionChange = () => {
    console.log('fire list build')
  }

  useEffect(() => {
    // If selectedOption gets set
    handleSelectedOptionChange()
  }, [selectedOption])

  return (
    <div className="w-full bg-gray-800 bg-opacity-20">
      <Combobox value={selectedOption} onChange={setSelectedOption}>
        <Combobox.Input className={"bg-slate-100 rounded py-2 px-4 w-1/2 m-4 "} placeholder="Find a topic to add" onChange={(e) => setQuery(e.target.value)} />
        <Combobox.Options>
          {autoFillList.map((fillOption) => (
            <Combobox.Option key={fillOption} value={fillOption}>
              {fillOption}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>

    </div>
  )
}
