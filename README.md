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
docker run -p 4000:4000 -e ROOKOUT_TOKEN=$ROOKOUT_TOKEN rookout/tutorial-nodejs
```

## Usage

- Log in to the [Rookout IDE](https://app.rookout.com/)
- Set up your debug session by selecting the NodeJS app you started. See [Debug session setup](https://docs.rookout.com/docs/debug-session-setup) for more information
- Add the source code according to the following [instructions](https://docs.rookout.com/docs/source-repos/). In this case, use the [local filesystem option](https://docs.rookout.com/docs/source-repos/) to associate the code in your local 'tutorial-nodejs' folder.
- Open the file 'src/services/todos.js'
- Add a Breakpoint to line 15 by clicking next the the line number in the file viewer
- The breakpoint should turn solid purple, indicating that it has been set successfully and that it is active.
    - If this is not the case, [click here](https://docs.rookout.com/docs/breakpoints-status.html) to see how to fix that
- Go the the app webpage [http://localhost:4000/](http://localhost:4000/) and add a todo in order to trigger the Breakpoint
- Check the bottom pane **Messages** and you'll see the snapshot you just added, as it was triggered by the handler of the web api when you added a todo.

## Common Pitfalls

- Breakpoint status is pending (hollow with purple outline) -- Connection to the app was not able to be established. Make sure that you inserted the Rookout Token in the right place and that the SDK was properly installed.
- Breakpoint status is disabled (solid grey) -- The breakpoint was disabled from collecting more data due to the limits being hit.
- Brekapoint error -- something went wrong. Check the breakpoint status to get more information on the error type, and for more information go to our [breakpoint status guide](https://docs.rookout.com/docs/breakpoints-status/).

## Want to learn more ?

- [Our website](https://rookout.com/) for more information
- [Our documentation](https://docs.rookout.com/) for more information
- [our deployment examples](https://docs.rookout.com/docs/deployment-examples.html) for platform-specific integration examples

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
