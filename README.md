look for `.envsample` in root directory and add your google api key in `.env` file

Go to `android/app.src/main/appAndroidManifest.xml`, look for `ADD_YOU_GOOGLE_API_KEY_HERE` and paste your api key there

You need to activate `billing and api services` from your GCP dashboard in order to use the apis that i have used in this project

### API used:

- Places API
- Maps SDK for Android
- Directions api
- Distance Matrix API

run `npm install` to install the dependencies
run `npx react-native start` to start the metro builder

### To run on android:

`npx react-native run-android`

### To run on iOS:

`npx react-native run-ios`
