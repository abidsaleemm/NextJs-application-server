import React from "react";
import Router from "next/router";

// TODO Might be a hack but works well was not able to solve solution
const { STAGING: staging = false } =
  "undefined" !== typeof window ? window.env : process.env;

export default ({ user: { role = "user", name } = {}, ...props }) => {
  return (
    <div>
      <style jsx>
        {`
          .buttonLink {
            margin: 10px;
            cursor: pointer;
            color: white;
            display: inline-block;
          }

          .nav {
            display: flex;
            background: ${staging ? "#b7632a" : "#3079c6"};
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }

          .navName {
            align-self: center;
          }
        `}
      </style>
      <div className="nav">
        <li
          className="buttonLink"
          onClick={() =>
            Router.push({
              pathname: "/auth/logout"
            })
          }
        >
          Logout
        </li>
        <li>
          <div
            className="buttonLink"
            onClick={() => Router.push({ pathname: "/projects" })}
          >
            Projects
          </div>
          <div
            className="buttonLink"
            onClick={() => Router.push({ pathname: "/users" })}
          >
            Users
          </div>
        </li>
        <div className="navName">{`Welcome ${name}`}</div>
      </div>
    </div>
  );
};
