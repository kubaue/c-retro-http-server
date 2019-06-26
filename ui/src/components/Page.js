import React from "react";
import styles from './Page.module.css';

export class Page extends React.Component {
  render () {
    return (
      <div style={styles.container}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}