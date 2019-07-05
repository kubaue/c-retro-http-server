import React from "react";
import PageWithRouting from '../PageWithRouting';
import styles from './HomePage.module.css';
import { userData } from '../../selectors/authSelectors';
import { connect } from 'react-redux';

class HomePage extends React.Component {

  render () {
    return (
      <PageWithRouting title={'Home'}>
        <div className={styles.container}>
          <h3>Hello, {this.props.userName}. You are logged as {this.props.userRole}.</h3>
        </div>
      </PageWithRouting>
    );
  }
}

const mapStateToProps = (state) => {
  const user = userData(state);
  return {
    userRole: user.role,
    userName: user.name,
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)