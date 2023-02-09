import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css'
export default Sidebar => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="">
        Chats
      </a>
      <a className="menu-item" href="">
        Schedule
      </a>
      <a className="menu-item" href="">
        Clients
      </a>
      <a className="menu-item" href="">
        Bookings
      </a>
      <a className="menu-item" href="https://apidev4.sapien.systems/graphql">
        Programs
      </a>
      <a className="menu-item" href="">
        Packages
      </a>
    </Menu>
  );
};
