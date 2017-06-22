import React from 'react';

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
  <div style={styles.constainer}>
    <div style={styles.item}><a href="/projects">Projects</a></div>
    <div style={styles.item}><a href="/auth/logout">Logout</a></div>
  </div>
)