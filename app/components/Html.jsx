import React from 'react';

class Html extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>{ this.props.title }</title>
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/js/jquery.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/main.js"></script>
        <script src="/js/prism.js"></script>

    <meta name="google-signin-scope" content="profile email"/>
    <meta name="google-signin-client_id" content="1025550058906-2fmd1rbo48m977cn4c5v4u3iuer68qm3.apps.googleusercontent.com"/>
    <script src="https://apis.google.com/js/platform.js" async defer></script>

      </head>
      <body>
      <div id="content"/>
      </body>
      </html>
    );
  }
}

export default Html;
