# Accessibility in Design & Development: Day II

https://smashingconf.com/online-workshops/workshops/deque-accessibility

## Prerequisites

- node 16
- npm 8.x

## Installation

```sh
$ npm install
```

## Starting local server

```sh
$ npm start
```

## Let's get started!

### Review application

Navigate to `http://localhost:3000`

### Review codebase

- react
- containers?
- components
- 3rd party libs (cauldron)

### Introduction to axe DevTools Chrome Extension

- [Download axe from chrome webstore](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- open up developer tools in tab with app open
- poke around
- free vs pro features

### Running our first scan

- click "Scan ALL of my page"
- review results

### Saving our test

- click "SAVE TEST"

### Enter IGT (Intelligent Guided Testing)

- activate "Guided Tests" tab
- review testing progress

#### Keyboard IGT

Run the keyboard IGT and review results

#### Modal IGT

> Utilizing multi-run IGT to get coverage of 100% of modals on page

- run on theme modal
- run on edit recipe modal
- run on cook recipe modal

#### Images IGT

> Utilizing multi-run IGT to break testing down logically

- run on stats icons
- run on pencil icons
- run on recipe card images

#### Forms IGT

- run on theme modal form
- run on edit modal form
- run on cook modal form

### Review our results

> :tada:

Keep up the good work! We've found quite a few accessibility issues.

### Fixing accessibility issues and verifying the fixes

#### Keyboard Issues

> Role: The element's role is missing or incorrect

- Ensure the edit recipe control is marked up as a button (see `src/components/RecipeCard.js`)
- Verify fix by running Keyboard IGT again

#### Modal Issues

> Pattern libraries with accessibility baked in (no pun intended!)

- Deque's accessible pattern library [cauldron](https://cauldron.dequelabs.com/)
- Replace project's modals with cauldron's modal component
- Run Modal IGT on each of the 3 types of modals in app

#### Image Issues

- mark stat icons as decorative (`alt=""` and/or `role="presentation"`)
- run Images IGT on stat icons
- give the edit images (pencil icons) accessible names that match wireframes (day I)
- run Images IGT on pencil icons

#### Forms Issues

- Group the related fields in the edit recipe modal (`role="group"`)
- Give the `role="group"` element the expected group label (`aria-labelledby="ingredients-heading"` and `aria-labelledby="instructions-heading"`)
- Mark the "Rate the yumminess (0 - 50)" field as required (via [cauldron `<TexField />`](https://cauldron.dequelabs.com/components/TextField) component's `required` prop)
- Make the form error message more descriptive so users understand how to fix the error.
  - `src/components/CookRecipeModal.js`
  - `src/components/EditRecipeModal.js`
- Run Forms IGT on Edit Recipe form
- Run Forms IGT on Cook Recipe form
