# Rookout official tutorial for using Node.JS

[![CircleCI](https://circleci.com/gh/Rookout/tutorial-nodejs/tree/master.svg?style=svg)](https://circleci.com/gh/Rookout/tutorial-nodejs/tree/master)
[![License][license-image]][license-url]
[![Docs][docs-image]][docs-url]
[![GitHub version][version-badge]](https://badge.fury.io/gh/rookout%2Ftryme-tutorial)

This is the official [rookout][rookout-getting-started] Node.JS tutorial

- [Signup][rookout-signup]
- [Documentation][docs-url]
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)


## Prerequisites

1. Docker - https://www.docker.com/get-docker
2. Node.JS 10 + NPM 

## Installation

1. Clone this repo

```bash
git clone https://github.com/Rookout/tutorial-nodejs.git
cd tutorial-nodejs
``` 

2. Set your Rookout token in an ENV variable 

```bash
export ROOKOUT_TOKEN=YOUR_TOKEN_IN_HERE
```
     
3. Build and run the app

- Option 1 - Without Docker:

```bash
npm start
```

- Option 2 - Running with docker

```bash
docker build . -t tutorial-nodejs
docker run -p 4000:4000 -e ROOKOUT_TOKEN=$ROOKOUT_TOKEN tutorial-nodejs
```

## Usage

- After running the app go to [https://app.rookout.com/][rookout-app-url] and **Log In**
- Add the source code according to the instructions using the left pane **Source View**

    <details>
    <summary>More details</summary>
    <p>
    
    #### Adding source code
    
    1. Click on Add source
    1. Choose source control
        - Github
            - Click on Connect
            - Authorize O-Auth
            - Fill `Repository Owner`
            - Click `Repository` and choose from the dropdown menu
            - Click Next
            - Choose the desired branch
            - Click View Repository
        - Local FileSystem - Server
            - Click on Setup Server
            - Choose a supported HTTP Server (Node.js)
            - Leave the default port `8000` or choose your own
            - Run your local server e.g. `simple-https -p 8000` in the right directory
            - Click on Connect to Server
    </p>
    </details>
    
    
- Open the file `src/handlers/homePage.js`
- Add a default (Dump Frame) rule to line 5 by clicking next the the line number in the file viewer
- Looking at the right-hand pane **Rules**, you will see the rule and the line number where you added it - it should be GREEN.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
- Go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
- Check the bottom pane **Messages** and you'll see the dumpframe you just added, as it was triggered by the handler of the web page when you accessed it

Go through the [bug list](BUGHUNT.md) and follow instructions to see some basic use cases.

## Rules Common Issues

- Rule status is RED -- Hash mismatch. It means the file used in the server is not the same file used from github/local server in app.rookout.com
- Rule status is GRAY -- No rook connected. Make sure you have inserted the token in the right place and that connection is made properly.

## Want to learn more ?

- [Our documentation][docs-url] for more information
- [our deployment examples][deployment-examples] for platform-specific integration examples

## License
[APACHE 2](LICENSE)

[version-badge]: https://badge.fury.io/gh/rookout%2Ftryme-tutorial.svg
[license-url]: LICENSE
[docs-url]: https://docs.rookout.com/
[rookout-getting-started]: https://docs.rookout.com/docs/introduction.html
[rookout-signup]: https://www.rookout.com/trial/
[docs-image]: https://img.shields.io/badge/docs-latest-blue.svg
[license-image]: https://img.shields.io/badge/License-Apache%202.0-blue.svg
[rookout-app-url]: https://app.rookout.com/
[deployment-examples]: https://github.com/Rookout/deployment-examples
