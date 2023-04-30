const server = require('./src/server');
const rookout = require('rookout');

/*rookout.start({
    token: '2c25ca51e48fce65fc9ea6f47922ae3990b187c776e30f0d24480367e974b6bc', labels: { env: 'dev' }
})*/

rookout.start({
    token: 'eafdd8db77d6cdb59ab966a58ac62f7426677416376c8552fc5117d72e5e5ba5',
    labels: {env: 'dev'},
    host:'wss://staging.control.rookout.com',
    debug:true
})

server.start();
