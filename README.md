# Tranlator Flash Cards

This project's original idea was to generate a flash card deck of english to spanish flash cards in order to help me study for my trip to Spain. It connects two api integrations together in order to grab a list of random english words and then pass them through the Microsoft translator api to find their Spanish equivelant.

# Required Setup

## Init npm
```npm i```

## Create a free Azure Account and Translator API account.
Unfortunately, the free version of the translator api does have limitations so I cannot just share my endpoint with everyone. Luckily, setting up your own endpoint is fast, easy, and free. Follow along at https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-translator?tabs=nodejs if you're confused.

## Create yourself a .env file in the top level.
This is where you will store the API integration details.

The variables you'll need:
```VITE_RANDOM_API_URL```
```VITE_MS_TRANSLATOR_API_URL```
```VITE_MS_TRANSLATOR_API_KEY```
