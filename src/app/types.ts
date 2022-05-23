/**
* Main file for custom app types
*/

export type SourceWord = string

export type TranslatedWord = string

export type TranslatedResultObj = {
  id: string
  source: SourceWord,
  translation: TranslatedWord,
  reaction: TranslationReaction
}

export type MSTranslationResponse = {
  translations: {
    text: string,
    to: string
  }[]
}

export type TranslationReaction = "Do Not Know" | "Know"

  // Imported from types.ts as possible reaction options.
export type reactionObj = {
    name: string,
    icon: string,
    color: string,
    exitDir: string
  }

  export const translationReactions = [
    {
      name: "Don't Know",
      icon: "",
      color: "red",
      exitDir: "left"
    },
    {
      name: "Know",
      icon: "",
      color: "green",
      exitDir: "right"
    }
  ] as reactionObj[]

