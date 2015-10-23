import React from 'react';

import Navbar from './Navbar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar {...this.props}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
