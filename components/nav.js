import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Nav, NavItem, NavLink } from 'reactstrap';

const RenderUser = () =>
  <div className="buttonLink" onClick={() => Router.push({ pathname: '/projects' })}>
    Projects
  </div>

const RenderClient = () =>
  <div className="buttonLink" onClick={() => Router.push({ pathname: '/portal' })}>
    Portal
  </div>

const RenderAdmin = () =>
  <div>
    <div className="buttonLink" onClick={() => Router.push({ pathname: '/projects' })}>
      Projects
    </div>
    <div className="buttonLink" onClick={() => Router.push({ pathname: '/portal' })}>
      Portal
    </div>
  </div>

export default ({ client, admin = false }) =>
  <div>
    <style jsx global>
      {`
        .buttonLink {
          margin: 10px;
          cursor: pointer;
          color: white;
          display: inline-block;
        }
        .nav {
          background: #3079C6;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.20);
        }
      `}
    </style>
    <Nav className="nav">
      <Link href="/auth/logout"><a className="buttonLink">Logout</a></Link>
      {admin ? <RenderAdmin /> : client === true ? <RenderClient /> : <RenderUser />}
    </Nav>
  </div>