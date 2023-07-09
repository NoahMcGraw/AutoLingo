import usFlag from '/assets/images/us.svg'
import esFlag from '/assets/images/es.svg'
import frFlag from '/assets/images/fr.svg'

export enum LanguageCode {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
}

export type LanguageObj = {
  name: string
  code: LanguageCode
  icon: string
}

export const languages = [
  {
    name: 'English',
    code: 'en',
    icon: usFlag,
  },

  {
    name: 'Spanish',
    code: 'es',
    icon: esFlag,
  },

  {
    name: 'French',
    code: 'fr',
    icon: frFlag,
  },
] as LanguageObj[]
