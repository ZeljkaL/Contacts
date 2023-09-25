# Contacts
 React Native mobile app for effortless contact management. Features TypeORM data handling, Axios network integration with retries, responsive UI, and TypeScript for code quality.

## Overview

The Contacts App is a mobile application built with React Native that allows users to manage their contacts effortlessly. 
It incorporates various functionalities, including contact creation, modification, and deletion using TypeORM for data management, image uploading with the image picker library, 
Axios for network requests with a retry mechanism, a responsive UI to ensure compatibility with various mobile devices, and TypeScript for type checking and improved code quality.


## Features


### Contact Management with TypeORM

- **Create Contacts:** Users can easily add new contacts, including details such as name, phone numbers, emails, and profile images, with data management.
- **Modify Contacts:** Edit contact information, update phone numbers or email addresses, and change profile images while ensuring data consistency.
- **Delete Contacts:** Effortlessly remove unwanted contacts from the app, with TypeORM handling database updates.
- **Filter Contacts by Name:**: Users can quickly find specific contacts by entering a name in the search bar. The app will filter and display only the contacts whose names match the entered text, simplifying contact search and management.


### Network Requests

- **Axios Integration:** The app leverages Axios for making network requests, ensuring efficient communication with a remote server.
- **Generic Request Handling:** A robust and flexible Axios-based request mechanism handles various API endpoints and data formats.
- **Retry Mechanism:** To account for possible network issues, the app incorporates a retry mechanism that automatically retries failed network requests when connectivity is restored.


### Responsive UI

- **Screen Responsiveness:** The app is designed to adapt to various screen sizes and orientations, providing a consistent and visually appealing user interface on all mobile devices.
- **Keyboard Responsiveness:** The app ensures a seamless user experience when interacting with the keyboard, using `react-native-keyboard-aware-scroll-view`. This library automatically adjusts the view to avoid keyboard overlap and scrolling issues.


### Linting and TypeScript

- **ESLint**: The project includes ESLint for code linting, helping maintain code quality and consistency.
- **TypeScript**: TypeScript is used for type checking and providing enhanced code quality and development experience.


### Navigation with React Navigation

- **Stack Navigation:** React Navigation is used to implement stack-based navigation, allowing users to move between screens with intuitive navigation patterns.


### Image Upload
- **Image Picker:** Users can select and upload profile pictures for their contacts using the built-in image picker library.
