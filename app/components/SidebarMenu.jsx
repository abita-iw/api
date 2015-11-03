import React from 'react';

class SidebarMenu extends React.Component {
  render() {
    return (
      <nav className="col-xs-2 bs-docs-sidebar">
        <ul id="sidebar" className="nav nav-stacked fixed">
          <li>
            <a href="#datatypes">Data Types</a>
            <ul className="nav nav-stacked">
              <li><a href="#data-users">Users</a></li>
              <li><a href="#data-pins">Pins</a></li>
              <li><a href="#data-descriptions">Descriptions</a></li>
              <li><a href="#data-images">Images</a></li>
              <li><a href="#data-tags">Tags</a></li>
            </ul>
          </li>
          <li>
            <a href="#api">API Description</a>
            <ul className="nav nav-stacked">
              <li><a href="#api-users">Users</a></li>
              <li><a href="#api-pins">Pins</a></li>
              <li><a href="#api-descriptions">Descriptions</a></li>
              <li><a href="#api-images">Images</a></li>
              <li><a href="#api-imagesizes">Imagesizes</a></li>
              <li><a href="#api-tags">Tags</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SidebarMenu;
