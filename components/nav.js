import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';

import applicationStyle from '../styles/custom-style.css';

const RouterPaths = {
  projects: '/projects',
  logout: '/auth/logout'
}


// the default navbar for the website
export class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <nav className='navbar'>
      {this.props.children}
    </nav>
  }
}
export class ToggleNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let classes = 'navbar navbar-toggleable-md navbar-inverse app-navbar';
    classes += this.props.fixed ? ' fixed-top' : '';

    return <nav className={ classes }>
      <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarNav'>
        <span className="navbar-toggler-icon"></span>
      </button>
      {this.props.children}
    </nav>
  }
}

/**
 * the collapsible items container
 */
export class NavbarCollapse extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className='collapse navbar-collapse justify-content-between' id='navbarNav'>
      <ul className='navbar-nav'>
        {this.props.children}
      </ul>
    </section>
  }
}

// add a navigation link to the navbar
export class NavigationLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let classNames = 'nav-item nav-link ' + (this.props.active ? 'active-link' : '');
    return <li className='nav-item'>
      <a onClick={this.props.whenClicked ? this.props.whenClicked : null} className={classNames} href={this.props.href}>
        { this.props.title ? this.props.title : this.props.children }
      </a>
    </li>
  }
}

// the brand item on navbar
export class NavbarBrand extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <a className='navbar-brand' href={this.props.href}> {this.props.children} </a>
  }
}

// pull the navbar items to the right
export class NavbarRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <section className='navbar-nav'>
      {this.props.children}
    </section>
  }
}

export default class extends React.Component {

  constructor(props) {
    super(props);

    // binding the callbacks
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    // this.redirect = this.redirect.bind(this);

    this.state = { activeItem: 'projects', isOpen: false };
  }

  handleItemClick (e) {
    this.props.transitionCallback();
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // redirect(name) {
  //   alert(name);
  //   // this.props.navBarAction;
  // }

  render() {

    const { activeItem } = this.state;
    const { def } = this.props;

    if (!this.props.session) {
      return (
        <header>
          <Head>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
            {/*<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />*/}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
            {/*<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>*/}
            <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
            <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>

            <style dangerouslySetInnerHTML={{ __html: applicationStyle }} />
          </Head>

          <ToggleNavbar fixed>
            <NavbarBrand> MULTUS </NavbarBrand>
            <NavbarCollapse>
              <NavigationLink active={ this.props.def == 'login' } href='/' > Login </NavigationLink>

              <NavbarRight>
                <NavigationLink href='#'> Signup </NavigationLink>
              </NavbarRight>
            </NavbarCollapse>
          </ToggleNavbar>

        </header>)
    } else
      return <header>
        <Head>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
          {/*<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css' />*/}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
          {/*<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>*/}
          <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>

          <style dangerouslySetInnerHTML={{ __html: applicationStyle }} />
        </Head>

        <ToggleNavbar fixed>
          <NavbarBrand> MULTUS </NavbarBrand>
          <NavbarCollapse>
            <NavigationLink  name='projects' whenClicked={ this.handleItemClick } href='/projects' active={ this.props.def == 'projects' }> Projects </NavigationLink>
            <NavigationLink href='/auth/logout'>Logout</NavigationLink>
          </NavbarCollapse>
        </ToggleNavbar>
      </header>
  }
}