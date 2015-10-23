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
      </head>
      <body>
      <div id="content"/>
      </body>
      </html>
    );
  }
}

export default Html;
