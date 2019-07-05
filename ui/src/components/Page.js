import React from "react";
import styles from './Page.module.css';

export class Page extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.page}>{this.props.children}</div>
      </div>
    );
  }
}