import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import logInOutActions from './action';

class logInOut extends Component {
  static defaultProps = {
    loggingIn: false,
  }

  static propTypes = {
    logIn: propTypes.func.isRequired,
    logOut: propTypes.func.isRequired,
    loggingIn: propTypes.bool,
  }

  constructor(props) {
    super(props);

    // reset login status
    this.props.logOut();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.logIn(username, password);
    }
  }
  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="alert alert-info">
          Username: test1 <br />
          Password: test1
        </div>
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group ${(submitted && !username ? 'has-error' : '')}`}>
            <label htmlFor="username">username
              <input
                type="text"
                id="username"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </label>
            {
              submitted && !username && <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group ${(submitted && !password ? 'has-error' : '')}`}>
            <label htmlFor="password">Password
              <input
                id="password"
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
            {
              submitted && !username && <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            {
              loggingIn ?
                <button className="btn btn-primary">Logging</button> :
                <button className="btn btn-primary">Log in</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.authReducer.loggingIn,
});

const mapDispatchToProps = dispatch => ({
  logIn: (username, password) => {
    dispatch(logInOutActions.logIn(username, password));
  },
  logOut: () => {
    dispatch(logInOutActions.logOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(logInOut);
