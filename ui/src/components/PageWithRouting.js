import React from "react";
import { Page } from './Page';
import styles from './PageWithRouting.module.css'
import { connect } from 'react-redux';
import { userData } from '../selectors/authSelectors';
import browserHistory from '../history';

class PageWithRouting extends React.Component {
  render() {
    return (
      <Page>
        <div className={styles.authenticationRow}>
          <div>
            Hello, {this.props.userName}. You are logged as {this.props.userRole}.
          </div>
          <div className={styles.logOut}>Log out</div>
        </div>
        <div className={styles.titleContainer}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.navigation}>
            <h4>Navigation</h4>
            {this.renderNavigationEntry('Home', '/home', true)}
            {this.renderNavigationEntry('Groups', '/groups', this.props.userRole === 'admin')}
          </div>
          <div className={styles.payload}>
            {this.props.children}
          </div>
        </div>
      </Page>
    );
  }

  renderNavigationEntry(label, path, enabled) {
    if (enabled) {
      return (
        <div onClick={() => browserHistory.push(path)} className={styles.navigationEntry}>
          {label}
        </div>
      )
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const user = userData(state);
  return {
    userRole: user.role,
    userName: user.name,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageWithRouting)