import React from 'react';
import Router from 'next/router';

const styles = {
  constainer: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  item: {
    // margin: '6px',
    display: 'flex',
    width: '100px',
    height: '30px',
    border: '1px solid black',
    alignSelf: 'center',
    cursor: 'pointer',
    // alignContent: 'center',
    // align: 'center',
    // verticalAlign: 'center',
  }
};

// const logout = () => {

// };

export default () => (
  <div style={styles.constainer}>
    <div style={styles.item}>Projects</div>
    <div style={styles.item}>Settings</div>
    <div style={styles.item} onClick={() => Router.push('/auth/logout')}>Logout</div>
  </div>
)