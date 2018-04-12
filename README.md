[![CircleCI](https://circleci.com/gh/Rookout/tryme-tutorial/tree/master.svg?style=svg)](https://circleci.com/gh/Rookout/tryme-tutorial/tree/master)
[![GitHub version](https://badge.fury.io/gh/rookout%2Ftryme-tutorial.svg)](https://badge.fury.io/gh/rookout%2Ftryme-tutorial)
[![npm version](https://badge.fury.io/js/rookout.svg)](https://badge.fury.io/js/rookout)

# How to use ?

1. First, you will need to clone or download this repository.
2. Running Locally

   1. Set your agent token in an env variable 
     ```bash
     export ROOKOUT_TOKEN=<Your-Token>
     ```
   2. Start agent and app
        - With Docker `docker-compose up`
   
        - Without Docker `make -j run-prod`

3. After running the server go to [https://app.rookout.com/](https://app.rookout.com/) and **Log In**
4. Add the source code according to the instructions using the left pane **Source View**
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
    
    
5. Open the file `src/handlers/homePage.js`
6. Add a default (Dumpframe) rule to line 5 by clicking next the the line number in the file viewer
7. Looking at the right-hand pane **Rules**, you should see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
8. Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
9. Check the bottom pane **Messages** and you should now see the dumpframe you just added, and it was triggered by the handler of the web page when you accessed it


__The integration is working and we can know debug some things together to learn how to use Rookout__

Go through the [bug list](https://github.com/Rookout/tryme-tutorial/blob/master/BUGHUNT.md) and follow instructions to see some basic use cases.

## Rules Common Issues

- Rule status is RED -- Hash mismatch. It means the file used in the server is not the same file used from github/local server in app.rookout.com

- Rule status is GRAY -- No rook connected to the agent. Make sure you have inserted the token in the right place and that connection is made properly.

## Want to learn more ?

Head over to [our documentation](https://rookout.github.io/) for more specific information
or to [our deployment examples](https://github.com/Rookout/deployment-examples) for platform-specific integration examples
