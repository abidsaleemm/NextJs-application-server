import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Loader from '../containers/loader';

export default WrappedComponent => ({ ...props, client }) =>
  (
    <div className="root">
      <style jsx global>
        {`
          .root {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }

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
          <Link href="/auth/logout"><a className="button">Logout</a></Link>
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