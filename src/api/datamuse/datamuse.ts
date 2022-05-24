import axios from 'axios'
import { DMTranslationResponse, DMTranslationResponseSingular, SourceWord } from '../../app/types'
import { formatUrlGetParams } from '../../utils'


/** /========================================\
 *  |=======Source Word Get Endpoints========|
 *  \========================================/
 *
 * Integrates with the datamuse api to source word lists
 * API documentation @ https://www.datamuse.com/api/
 */

/**
 * Fetches a list of words of determined length and topic
 * @param wordNumber: Number - Number of words to return from the request
 * @param lang: String - Alternate language to return. Known Options: es | zh | it | de
 * @returns List of random words
 */
export const getSourceWords = (wordNumber:number, lang: string = "", topic: string = "travel") => new Promise<SourceWord[]>((resolve, reject) => {
  // The random word api defaults to returning english and does not accept an 'en' lang code so we will just blank the value.
  if (lang == 'en') {
    lang = ""
  }

  const _params = [
    {
      key: "max",
      value: wordNumber.toString()
    },
    {
      key: "v",
      value: lang
    },
    {
      key: "rel_trg",
      value: topic
    }
  ]
  axios({
      method: 'GET',
      url: `${import.meta.env.VITE_DATAMUSE_API_URL}/words${formatUrlGetParams(_params)}`,
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then((x: any) => x.data)
  .then((sourceWordArr: DMTranslationResponse) => {
    const _sourceWordArr = pullSourceWordsFromDMResponse(sourceWordArr)
    resolve(_sourceWordArr)
  })
})

const pullSourceWordsFromDMResponse = (sourceWordArr: DMTranslationResponse) => {
  let pulledArr = [] as SourceWord[]
  sourceWordArr.map((sourceWordObj: DMTranslationResponseSingular) => {
    if (typeof sourceWordObj.word !== 'undefined') {
      pulledArr.push(sourceWordObj.word)
    }
  })
  return pulledArr
}
