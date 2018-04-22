import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { connect } from 'react-redux';

import history from './helpers/history';
import alertActions from './components/Alert/action';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function handleRedirect() {
  if (localStorage.getItem('user')) {
    return <HomePage />;
  }
  return <Redirect to={{ pathname: '/login', state: { from: history.location } }} />;
}
class App extends Component {
  static defaultProps = {
    alert: {},
  }
  static propTypes = {
    clear: propTypes.func.isRequired,
    alert: propTypes.shape({ message: propTypes.string, type: propTypes.string }),
  }
  constructor(props) {
    super(props);
    history.listen((location) => {
      this.props.clear();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {
              alert.message &&
                <div className={`alert ${alert.type}`}>{alert.type}</div>
            }
            <Router history={history}>
              <Switch >
                <Route exact path="/" render={handleRedirect} />
                <Route path="/login" component={LoginPage} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alertReducer,
});

const mapDispatchToProps = dispatch => ({
  clear: () => {
    dispatch(alertActions.clear());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
