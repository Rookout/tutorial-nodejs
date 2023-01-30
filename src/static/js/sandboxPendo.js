/* eslint no-undef: 0, no-console: 0 */
(function(apiKey){
  (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=[];
    v=['initialize','identify','updateOptions','pageLoad'];for(w=0,x=v.length;w<x;++w)(function(m){
      o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};}(v[w]));
    y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.rookout.com/agent/static/'+apiKey+'/pendo.js';
    z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
})('f82ec424-cc04-47ca-5f5f-43c17ba69485');

$(document).ready(() => {
  // Initialize only in Sandbox
  const sandboxUrlPattern = new RegExp(/sandbox-nodejs(?:\.[a-zA-Z]+)?\.rookout-demo\.com$/);
  if (sandboxUrlPattern.test(document.location.hostname)) {
    pendo.initialize();
  }
});
