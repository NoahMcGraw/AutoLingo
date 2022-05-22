import { getSourceWords } from "../random-word-api/random-word-api";
import { getTranslations } from "../microsoft-translator/microsoft-translator";
import { SourceWord, TranslatedResultObj, TranslatedWord } from "../../app/types";


export const buildTranslationsList = async (wordNumber: number, sourceLang = "es", targetLang = "en") => {
  let mergedList = [] as TranslatedResultObj[]
  const sourceList = await getSourceWords(wordNumber, sourceLang).catch((err) => { console.error(err) })
  //TODO: dispatch source words to store
  if (typeof sourceList !== "undefined" && sourceList.length > 0) {
    let translatedList = await getTranslations(sourceList, sourceLang, targetLang).catch((err) => { console.error(err) })
    mergedList = mergeTranslationsIntoSourceList(sourceList, translatedList)
  }
  return mergedList
}

const mergeTranslationsIntoSourceList = (sourceList: SourceWord[], translatedList: TranslatedWord[] | void): TranslatedResultObj[] => {
  const mergedList = [] as TranslatedResultObj[]
  for (let i = 0; i < sourceList.length; i++) {
    let mergedObj = {
      source: sourceList[i],
      translation: "Unknown Translation"
    } as TranslatedResultObj
    if (typeof translatedList !== 'undefined' && typeof translatedList[i] !== 'undefined') {
      mergedObj.translation = translatedList[i]
    }
    mergedList.push(mergedObj)
  }
  return mergedList
}
