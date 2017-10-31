import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Nav, NavItem, NavLink } from "reactstrap";

const RenderUser = () => (
  <div
    className="buttonLink"
    onClick={() => Router.push({ pathname: "/projects" })}
  >
    Projects
  </div>
);

const RenderClient = () => (
  <div
    className="buttonLink"
    onClick={() => Router.push({ pathname: "/portal" })}
  >
    Portal
  </div>
);

const RenderAdmin = () => (
  <div>
    <div
      className="buttonLink"
      onClick={() => Router.push({ pathname: "/projects" })}
    >
      Projects
    </div>
    <div
      className="buttonLink"
      onClick={() => Router.push({ pathname: "/portal" })}
    >
      Portal
    </div>
  </div>
);

// TODO Might be a hack but works well was not able to solve solution
const { STAGING: staging = false } =
  "undefined" !== typeof window ? window.env : process.env;

export default ({ user: { client = false, admin = false } = {}, ...props }) => {
// console.log("props", props);
return (
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
          background: ${ staging ? 'red' : '#3079c6' };
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
      `}
    </style>
    <Nav className="nav">
      <Link href="/auth/logout">
        <a className="buttonLink">Logout</a>
      </Link>
      {admin ? (
        <RenderAdmin />
      ) : client === true ? (
        <RenderClient />
      ) : (
        <RenderUser />
      )}
    </Nav>
  </div>
);
}