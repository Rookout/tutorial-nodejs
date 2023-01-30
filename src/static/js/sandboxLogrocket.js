/* eslint no-undef: 0, no-console: 0 */

function identifySession(currentUser) {
  if (!currentUser || !Object.keys(currentUser).includes('email')) return;

  if (window.LogRocket) {
    window.LogRocket.identify(currentUser.email, {
      name: currentUser.fullname || currentUser.username,
      email: currentUser.email,

      sandbox: true,
    });
  }
}

function getCurrentUserAndIdentifySession() {

  const currentUserUrl = 'https://app.rookout.com/graphql';

  $.get({
    url: currentUserUrl,
    method: 'POST',
    xhrFields: {
      withCredentials: true
   },
    contentType: 'application/json',
    data: JSON.stringify({
      query: `  {
    currentUserInfo {
      info {
        id
        username
        fullname
        email
      }
      orgs {
        id
        name
        isAdmin
        token
      }
    }
  }`
    })

  }, ({ data } ) => {
    identifySession(data.currentUserInfo.info);
  })
    .fail(() => {
      console.warn("Currently not logged in to app.rookout.com");
    });


}

function initLogrocket() {
  if (window.LogRocket) {
    window.LogRocket.init('fzkqiz/rookout');
  }
}


$(document).ready(() => {
  // Follow sessions only in Sandbox
  const sandboxUrlPattern = new RegExp(/sandbox-nodejs\.rookout-demo\.com$/);
  if (sandboxUrlPattern.test(document.location.hostname)) {
    initLogrocket();
    getCurrentUserAndIdentifySession();
  }
});
