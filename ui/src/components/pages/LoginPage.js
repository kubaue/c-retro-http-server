import React from "react";
import { Page } from '../Page';
import styles from './LoginPage.module.css';
import { connect } from 'react-redux';
import { logIn } from '../../actions/actions';

class LoginPage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    }
  }

  render() {
    return (
      <Page>
        <div className={styles.container}>
          <h1>Test exam system</h1>
          <div className={styles.form}>
            <div className={styles.formRow}>
              <label>Login</label>
              <input onChange={event => this.setState({ login: event.target.value })} value={this.state.login} />
            </div>
            <div className={styles.formRow}>
              <label>Password</label>
              <input type={'password'} onChange={event => this.setState({ password: event.target.value })} value={this.state.password} />
            </div>
            <button onClick={() => this.logIn()}>Log in</button>
            {this.props.attemptFailed && <div className={styles.invalidCredentials}>Invalid credentials</div>}
          </div>
        </div>
      </Page>
    );
  }

  logIn() {
    this.props.logIn(this.state.login, this.state.password);
  }
}

const mapStateToProps = (state) => {
  return {
    attemptFailed: state.auth.attemptFailed
  };
};

const mapDispatchToProps = {
  logIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)