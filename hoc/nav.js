import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Loader from '../containers/loader';

export default WrappedComponent => ({ ...props, client }) =>
  (
    <div>
      <style jsx global>
        {`
          .button {
            margin: 10px;
            cursor: pointer;
            color: white;
          }
          .nav {
            background: #3079C6;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.20);
          }
          `}
      </style>
      <div>
        <Nav className="nav">
          <Link><a className="button" href="/auth/logout">Logout</a></Link>
          <div className="button" onClick={() => Router.push({
            pathname: client === true ? '/portal' : '/projects',
          })}>
            {client === true ? 'Portal' : 'Projects'}
          </div>
        </Nav>
      </div>
      <Loader />
      <WrappedComponent {...props} />
    </div>
  );