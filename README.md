# How to use ?

## Running Locally

### With Docker

- Insert your agent token in the docker-compose.yml
- Run `docker-compose up`

### Without Docker

- Insert your agent token in the Makefile
- Run `make -j run-prod`

## Tutorial

- After running the server go to [https://app.rookout.com/](https://app.rookout.com/)
    - If you are not logged in yet, log in
- Add the source code according to the instructions using the left pane **Source View**
- Open the file `/src/handlers/index.js`
- In the right-hand pane **Rules** choose the Rule Type `Log - Rookout`
- Add a rule to line 2 by clicking next the the line number in the file viewer
- Looking at the right-hand pane **Rules**, you should see the rule you added, on what line you added it and it should be GREEN, meaning everything is communicating correctly.
    - If this is not the case, [click here](#rules-common-issues) to see how to fix that
- Refresh, or go the the app page [http://localhost:4000/](http://localhost:4000/) in order to trigger the rule
- Check the bottom pane **Messages** and you should now see the log message you just added, and it was triggered by the handler of the web page when you accessed it

__The integration is working and we can know debug some things together to learn how to use Rookout__

Go through the [bug list](#bug-list) below and follow instructions to see some basic use cases.

## Bug List

- __Clear Completed hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Dump Frame"
        3. Add this rule to line 140 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
        5. We see the `Locals` object and all we have in is `this`, which has `todos` inside it.
            - it means we need to access todos as `this.todos.filter(...` and not `todos.filter(...`
        6. We can now know what is not working on the server-side and fix it.

- __Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `/src/handlers/todo.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add this rule to line 56
        4. Before triggering the rule, let's edit it so it returns what we want
        5. In the **Rules** pane on the right, click the *Edit Rule* (pen) icon next to the rule you just added. It will open up the Rule configuration as a JSON file
        6. On line 6 in the `paths` object let's add a property `"store.rookout.locals.todo": "frame.todo"`
        7. On line 28 we have `processing.operations` object, let's add a new operation in the array :

        __name: send_rookout - means we are sending the information to the rookout web application__
        __path: store.rookout.locals.todo - we tell the rule what information to send__

        ```
        {
            "name": "send_rookout",
            "path": "store.rookout.locals.todo"
        }
        ```
        
        7. Add and duplicate a todo in order to see the output, and now we can see what is being given to the object and match if we have an error in the function.

- __Hebrew and special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a task with Hebrew or special characters. All these characters should not be saved.
    - **Debug:**
        1. In the Rookout app, open the file `/src/handlers/todo.js`
        2. At lines 18 and 35 we see that the title passes the function `cleanString(...)` - Let's add a `Dump Frame` as we did before to line 81 at the end of this function.
        3. Try to add a task with some of these characters to get the frame.
        4. We can see that after using line 73 these characters are being found and replaced by regex. We found the source of the issue.
        ```
        regex = ...
        this = ...
        str = "משימה בעברית < > &&"
        trimmedStr = ""
        ```


## Rules Common Issues

- Rule status is RED -- Hash mismatch. It means the file used in the server is not the same file used from github/local server in app.rookout.com

- Rule status is GRAY -- No rook connected to the agent. Make sure you have inserted the token in the right place and that connection is made properly.

## Want to learn more ?

Head over to [our documentation](https://rookout.github.io/) for more specific information
or to [our deployment examples](https://github.com/Rookout/deployment-examples) for platform-specific integration examples