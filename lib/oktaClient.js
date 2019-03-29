const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
    orgUrl: 'https://dev-814615.okta.com',
    token: '00irLyETQlBON_TFwwBLfdvR5d6K3SVFzlbe5mnkAS'
  });
  module.exports = client;