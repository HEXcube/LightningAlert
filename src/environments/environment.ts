// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDoaQOU2xb_D6Omyvw13PGaDPs1WaI4dq8',
    authDomain: 'precision-trainer.firebaseapp.com',
    databaseURL: 'https://precision-trainer.firebaseio.com',
    projectId: 'precision-trainer',
    storageBucket: 'precision-trainer.appspot.com',
    messagingSenderId: '687158631150'
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
