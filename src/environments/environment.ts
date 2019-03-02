// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCWcmR_LdwsYH3K7WgmPIN2Cd4U6PONS-k',
    authDomain: 'lightning-alert.firebaseapp.com',
    databaseURL: 'https://lightning-alert.firebaseio.com',
    projectId: 'lightning-alert',
    storageBucket: 'lightning-alert.appspot.com',
    messagingSenderId: '224662572143'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
