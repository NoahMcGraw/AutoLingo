[![Netlify Status](https://api.netlify.com/api/v1/badges/51b57973-2ae2-42a7-894c-4a911efccaf8/deploy-status)](https://app.netlify.com/sites/grand-cajeta-92ed93/deploys)

[Check Out the Demo on Netlify!](https://grand-cajeta-92ed93.netlify.app/)

# AutoLingo - Generated Flash Cards for Learning a New Language

This project's original idea was to generate a flash card deck of english to spanish flash cards in order to help me study for my trip to Spain. It connects two api integrations together in order to grab a list of english words and then pass them through the Microsoft translator api to find their Spanish equivelant.

# Required Setup

## Init npm

`npm i`

## Create a free Azure Account and Translator API account.

Unfortunately, the free version of the translator api does have limitations so I cannot just share my endpoint with everyone. Luckily, setting up your own endpoint is fast, easy, and free. Follow along at https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs if you're confused.

## Create yourself a .env file in the top level.

This is where you will store the API integration details.

The variables you'll need:
`VITE_DATAMUSE_API_URL=https://api.datamuse.com` (This is a public open-source api. With that said, this url may be subject to change.)
`VITE_MS_TRANSLATOR_API_URL`
`VITE_MS_TRANSLATOR_API_KEY`
`VITE_MS_TRANSLATOR_API_LOCALITY`
