import React from "react";
import { Page } from './Page';
import styles from './PageWithRouting.module.css'
import { connect } from 'react-redux';
import { userData } from '../selectors/authSelectors';
import browserHistory from '../history';
import { logOut } from '../actions/actions';

class PageWithRouting extends React.Component {
  render() {
    return (
      <Page>
        <div className={styles.authenticationRow}>
          <div onClick={() => this.props.logOut()} className={styles.logOut}>Log out</div>
        </div>
        <div className={styles.titleContainer}>
          <h1>{this.props.title}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.navigation}>
            <h4>Navigation</h4>
            {this.renderNavigationEntry('Home', '/home', true)}
            {this.renderNavigationEntry('Groups', '/groups', this.props.userRole === 'admin')}
            {this.renderNavigationEntry('Your Exams', '/exams', this.props.userRole === 'examiner')}
            {this.renderNavigationEntry('Create Exam', '/createExam', this.props.userRole === 'examiner')}
            {this.renderNavigationEntry('Your Exams', '/studentExams', this.props.userRole === 'student')}
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
  };
};

const mapDispatchToProps = {
  logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(PageWithRouting)