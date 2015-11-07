import React from 'react';

class AuthPage extends React.Component {

  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  }
  
  render() {
    return (
      <div>
        <div className="g-signin2" data-onsuccess={this.onSignIn} data-theme="dark"></div>
      </div>
    )
  }
}

export default AuthPage;

