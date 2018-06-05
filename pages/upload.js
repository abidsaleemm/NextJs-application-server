import React from "react";
import { Component } from "react";
import Head from "next/head";

const title = "Upload DICOM / Files";
const instructions =
  "Recommend to use Chrome browser which allows folder uploads.";
const token = "v3r7dayenyo4t0nfbc3khgx7nkk1jyj3";

export default class extends Component {
  static getInitialProps({ query: { boxFolderId } }) {
    return { boxFolderId };
  }

  render() {
    const { boxFolderId } = this.props;

    console.log("boxFolderId", boxFolderId);

    return (
      <div>
        <style jsx global>{`
          .logo {
            width: 300px;
            align-self: center;
          }

          iframe {
            display: absolute;
            top: 200px;
          }

          body {
            display: flex;
            flex-direction: column-reverse;
          }
        `}</style>
        <center>
          <img className="logo" src="/static/images/logo.jpg" />
        </center>
        <br />
        <Head>
          <script
            src={`https://multusmedical.app.box.com/upload-widget/embed.js?folderID=50004520877&title=${title}&instructions=${instructions}&isDescriptionFieldShown=0&isEmailRequired=1&width=450&height=420&token=${token}`}
            type="text/javascript"
          />
        </Head>
      </div>
    );
  }
}
