# WeatherApp
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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Technologies Used

#### Frontend: Vue.js
#### API: WeatherAPI 
'''
https://www.weatherapi.com/
'''
#### One Call API 3.0
''''
https://api.openweathermap.org/data/3.0/onecall?lat=34.0522&lon=-118.2437&exclude=current,minutely,alerts&appid=4ea2f2d1f43135c0d12e48a6deb57cc3
'''
#### for Search city used meta data
'''
https://www.weatherbit.io/api/meta
'''
#### Backend: Firebase Firestore (Cloud Firestore for city data)
#### Styling: SCSS

Prerequisites
Node.js & npm installed
Firebase project set up with Firestore enabled
WeatherAPI key (sign up at https://www.weatherapi.com/)

Project Structure
src/components - Vue components including SearchCity.vue, Navigation.vue, etc.
src/firebase - Firebase initialization and config
src/views - Main app views
public - Static assets
src/uploadCityDirectory - for uploading bulk citied to Backend

Usage
Click the search icon to open the city search input.
Type a city name and press Enter or click Search.
Results (found/not found) show in a modal.
City data is stored and searched via Firebase Firestore.

Steps followed for Search City
Export your Excel data to JSON (https://www.convertcsv.com/excel-to-json.htm).

Write a Node.js script to read the JSON file (uploadCityDirectory.js).

Use Firebase Admin SDK in the script to upload data to Firestore (cityDirectory collection).

Run the script to bulk upload all cities to Firestore.
Run Commands inside src/uploadCityDirectory
npm install firebase-admin
node uploadCityDirectory.js

On search click query Firestore’s cityDirectory collection to search for cities.

Display search results in your Vue component.