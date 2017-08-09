import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

// TODO Probably best to treat this as a HOC
export default () => (
  <Nav>
    <NavLink href="/auth/logout">Logout</NavLink>
    <NavLink href="/projects">Projects</NavLink>
  </Nav>
)
