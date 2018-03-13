># Lab 41: Oauth

Create a frontend that enables a user to signup or signin using Google OAuth.  This a demo front end tied to a demo backend to showcase the usage of the google OAuth process.  Users are prompted to sign in or sign up using their google credentials.  New users are signed up and signed in while existing users are signed in.  A JSON web token id returned for additional requests.

>## Install

```BASH
    npm i
```


```BASH
    npm run build
```

```BASH
    npm run watch
```

### Dependencies 

- This project has the following dependencies:

```JSON
   "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-eslint": "^8.2.2",
    "babel-jest": "^22.4.1",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "clean-webpack-plugin": "^0.1.18",
    "css-loader": "^0.28.10",
    "dotenv": "^5.0.0",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "eslint": "^4.18.1",
    "eslint-plugin-react": "^7.7.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.9",
    "html-webpack-plugin": "^2.30.1",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^22.4.2",
    "node-sass": "^4.7.2",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.2.2",
    "redux": "^3.7.2",
    "redux-devtools-extension": "^2.13.2",
    "redux-thunk": "^2.2.0",
    "sass-loader": "^6.0.6",
    "superagent": "^3.8.2",
    "uglifyjs-webpack-plugin": "^1.2.1",
    "url-loader": "^0.6.2",
    "uuid": "^3.2.1",
    "webpack": "^3.11.0",
    "webpack-dev-server": "^2.11.1"
  },
```

### npm scripts

- The following npm scripts are available:

```JSON
   "scripts": {
    "lint": "eslint .",
    "build": "webpack",
    "watch": "webpack-dev-server --inline --hot",
    "test": "jest --verbose -i",
    "test:debug": "DEBUG=http* jest --verbose -i"
  },
```

### Environmental Variables

The following env vars are needed:

```BASH
NODE_ENV=development
API_URL=http://localhost:3000
```

### Usuage:

Sign in or sign up.  If you are new to the site, you need to sign up and create an account. Signing up creates a user name and password for signing in to  the site.  Once signed up, all you need to do on return visits is sign in.    