# Terminology Hack 02/10/2019

This is a very simple app created as part of NHS Terminology Connectathon 02/10/2019.

It allows you to search for a snomed term and view any associated synonyms for that term.

The application is written using the following stack.

* Vue.js (version 3.0.0) - Core JS library for creating single page apps
* Vuetify (version 2.x) - UI component framework for visual aspects
* Axios - data retrieval
* VUEX for state management (but only for errors)
* Vue Router for page navigation (but only used for about screen)

The terminology server is https://ontoserver.dataproducts.nhs.uk/ 

There are no unit tests!

## CORS 

If you have CORS errors when running locally, try a Chrome CORS extension, such as Moesif CORS. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
