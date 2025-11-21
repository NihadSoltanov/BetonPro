# Cretosaurus

## To Launch An App
* Install Expo CLI
* Download Expo Go on mobile
* Run `npm install` in root folder
* Run `expo start` to launch an app in expo 
* Open Expo Go on mobile and scan QR code from terminal

## To Build An App
* You will have to create an Expo account.
* Then in terminal:
#### For Android
* Run `expo build:android`
#### For iOS
* Run `expo build:ios`

Then just follow instructions in terminal. Expo will build an app in cloud


## Project structure

* 'src' folder contains all the code.
* 'package.json' and 'package-lock.json' contains all dependencies managed by npm and expo
* 'App.js' project's entry point
* 'app.json' app's metadata and config such as API keys
* 'node_modules' is temporary folder for all dependencies that were downloaded by `npm install`. Dont commit this folder.
* 'android' contains generated native Android code. Change only if needed.
* Same with iOS  