import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const styles = {
  constainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  item: {
    display: 'flex',
    width: '100px',
    height: '30px',
    border: '1px solid black',
    alignSelf: 'center',
    fontSize: '20px',
  }
}

export default () => (
  <Nav>
          <NavLink href="/auth/logout">Logout</NavLink> 
          <NavLink href="/projects">Projects</NavLink> 
        </Nav>
)

/*
<div style={styles.constainer}>
    <div style={styles.item}><a href="/auth/logout">Logout</a></div>
    <div style={styles.item}><a href="/projects">Projects</a></div>
  </div>
  */