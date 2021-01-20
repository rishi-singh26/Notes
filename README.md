# Notes app with firebse

## Installation

```sh
$ git clone https://github.com/rishi-singh26/Code_Scanner.git
Clones this repo
$ npm install
Install all the node modules
$ expo upgrade
```

### Firebase credentials setup

- Create a new folder named "Firebase" inside "src".
- Inside "Constants" foldar create a file by name "index.js"
- Inside "index.js" copy the code below

```sh
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PRIJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const cloudStorage = firebase.storage();
```

### Dependencies

| Dependencies       | README                                                            |
| ------------------ | ----------------------------------------------------------------- |
| firebase           | [https://www.npmjs.com/package/firebase]                          |
| redux              | [https://www.npmjs.com/package/redux]                             |
| react-redux        | [https://www.npmjs.com/package/react-redux]                       |
| redux-logger       | [https://www.npmjs.com/package/redux-logger]                      |
| redux-persist      | [https://www.npmjs.com/package/redux-persist]                     |
| @expo/vector-icons | [https://www.npmjs.com/package/@expo/vector-icons]                |
| More               | [https://github.com/rishi-singh26/Notes/blob/master/package.json] |
