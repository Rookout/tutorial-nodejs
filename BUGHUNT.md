## Bug Hunt

### What is this?

We prepared for you a few manually introduced bugs in order to learn how to use Rookout.
The first two will make sure you understand how to create and analyze our most complete rule - the Dump Frame.
The third bug will introduce a new rule type - Log. You will be walked through the process of editing the rule in order
to add custom elements to it.

For more information about Rule Scripting refer to (our documentation)[https://rookout.github.io/scripts/index.md]

__Level: Beginner__
- __The bug: Clear Completed button hangs, does not do what is intended - nothing is cleared.__
    - **Reproduce:** Add a few tasks, check one or more as completed using the checkbox on the left of the task and click the `Clear completed` button on the bottom right corner.
    - **Debug:**  
        1. In the Rookout app, open the file `/src/utils/store.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Dump Frame"
        3. Add this rule to line 131 and try again to click on `Clear completed` to see the message that pops in the Rookout app
        4. We can now see the whole stacktrace leading to this point and we pinpoint the error to this message :
        5. We see the `Locals` object and all we have in is `this`, which has `todos` inside it.
            - it means we need to access todos as `this.todos.filter(...` and not `todos.filter(...`
        6. We can now know what is not working on the server-side and fix it.

__Level: Beginner__
- __The bug: Special characters (<,>,;,`,&,/,\\) are not being accepted as part of the title when Adding or Updating a Todo.__
    - **Reproduce:** Add a task with special characters. All these characters should not be saved.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. At lines 14 and 61 we see that the title passes the function `utils.cleanString(...)` - Let's add a `Dump Frame` to the end of the function in file `/src/services/utils.js`.
        3. Try to add a task with some of these characters to get the frame.
        4. We can see that after using this function, on line 3 these characters are being found and replaced by regex. We found the source of the issue.
        ```
        regex = ...
        this = ...
        str = "Test < > &&"
        trimmedStr = "Test"
        ```

__Level: Intermediate__
- __The bug: Duplicate Todo adds an invalid todo instead of an exact copy of an existing one.__
    - **Reproduce:** Add a task and when hovering on the text, on the right side you have the **&** symbol. Click on it to duplicate the task.
    - **Debug:**
        1. In the Rookout app, open the file `/src/services/todos.js`
        2. Using the **Rules** pane on the right, select the *Rule Type* "Log"
        3. Add this rule to line 92
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
        
        7. Add and duplicate a todo in order to see the output, and now we can see what is being given to the object and match if we have an error in the function (parameters missing or in bad order).
