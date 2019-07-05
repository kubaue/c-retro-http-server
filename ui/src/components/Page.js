import React from "react";
import styles from './AppPage.module.css';

export class Page extends React.Component {
  render () {
    return (
      <div className={styles.container}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}