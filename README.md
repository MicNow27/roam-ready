# RoamReady

## Project Description

This project is a web application for users to store holiday itineraries. It is part of the DVT Graduate Program 2023.
Designed and developed by Michelle Nowers.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Inspiration

[AirBnB](https://www.airbnb.com/)

## Accreditation

**Logos:** [My Free Logo Maker](https://myfreelogomaker.com/)

**Loading spinner:** [Loading.io](https://loading.io/)

**Images:**

castle: [Tim Rebkavets](https://unsplash.com/pt-br/@timreb9?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

elephant: [AJ Robbie](https://unsplash.com/@ajrobbie?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

louvre: [Patrick Langwallner](https://unsplash.com/de/@patresinger?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

## References

- [Udemy: Angular - The Complete Guide (2023 Edition)](https://www.udemy.com/course/the-complete-guide-to-angular-2/)

- **Firebase setup:**
  - https://www.youtube.com/watch?v=HXSqKW4JCr4
  - https://www.youtube.com/watch?v=BFboztcUj74

- **Angular Fire:**
  - https://github.com/angular/angularfire

- **Firestore:**
  - queries: https://github.com/tdkehoe/Using-Firebase-with-Angular-and-AngularFire#read-data-from-firestore

- **Firebase Auth:**
  - https://github.com/angular/angularfire/blob/master/docs/auth.md
  - https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0

## Assumptions (for now...):

- uniqueness of trip names and activity names

## Still To Do

- [ ] Modules
- [ ] Error handling for required fields in login / signup form
- [ ] Add location picker to activity form
- [ ] Add a calendar (https://medium.com/allenhwkim/angular-build-a-calendar-in-50-lines-f813f0a04c3b)
- [ ] Add activities resolver
- [ ] Remove user feedback for disabled buttons
- [ ] Merge commonality of trip and activity components
- [ ] Item components' bg --> forms' bg
- [ ] Currency selection capabilities
- [ ] Put limit lengths on input fields
- [ ] Add cut-off dates to calendar, start date on calendar
- [ ] Hacky fix to NG-Zorro components showing through alert background
- [ ] More icons... maybe?

## Bugs

- date picker doesn't work on screens less than 400px wide


