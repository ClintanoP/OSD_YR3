// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  cognito: {
    // get these details from your User pool
    // User Pool ID and Client ID from App Clients and analytics
    userPoolId: 'eu-west-1_g7mYh3oxu',
    userPoolWebClientId: '763vnshrcgnummqg3al8n8gj66',
  },
  friendlyName:"advert-app-ap"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
