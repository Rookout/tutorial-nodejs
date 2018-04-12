[![CircleCI](https://circleci.com/gh/Rookout/tryme-tutorial/tree/master.svg?style=svg)](https://circleci.com/gh/Rookout/tryme-tutorial/tree/master)
[![GitHub version](https://badge.fury.io/gh/rookout%2Ftryme-tutorial.svg)](https://badge.fury.io/gh/rookout%2Ftryme-tutorial)
[![npm version](https://badge.fury.io/js/rookout.svg)](https://badge.fury.io/js/rookout)

# How to use ?

## Running Locally
1. Set your agent token in an env variable 
 ```bash
 export ROOKOUT_TOKEN=<Your-Token>
 ```
1. Start agent and app
    - With Docker `docker-compose up`

    - Without Docker `make -j run-prod`

## Tutorial

1. After running the server go to [https://app.rookout.com/](https://app.rookout.com/)
    - If you are not logged in yet, log in
1. Add the source code according to the instructions using the left pane **Source View**
1. Open the file `/src/handlers/homePage.js`
1. In the right-hand pane **Rules** choose the Rule Type `Log - Rookout`
1. Add a rule to line 5 by clicking next the the line number in the file viewer
1. Looking at the right-hand pane **Rules**, you should see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
1. Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
1. Check the bottom pane **Messages** and you should now see the log message you just added, and it was triggered by the handler of the web page when you accessed it

__The integration is working and we can know debug some things together to learn how to use Rookout__

Go through the [bug list](https://github.com/Rookout/tryme-tutorial/blob/master/BUGHUNT.md) and follow instructions to see some basic use cases.

## Rules Common Issues

- Rule status is RED -- Hash mismatch. It means the file used in the server is not the same file used from github/local server in app.rookout.com

- Rule status is GRAY -- No rook connected to the agent. Make sure you have inserted the token in the right place and that connection is made properly.

## Want to learn more ?

Head over to [our documentation](https://rookout.github.io/) for more specific information
or to [our deployment examples](https://github.com/Rookout/deployment-examples) for platform-specific integration examples
