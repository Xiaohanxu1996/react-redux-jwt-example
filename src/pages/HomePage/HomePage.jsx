import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logInOutActions from '../../components/LogInOut/action';

class HomePage extends Component {
  static defaultProps = {
    user: {},
    users: [],
  }
  static propTypes = {
    getAll: propTypes.func.isRequired,
    deleteUser: propTypes.func.isRequired,
    user: propTypes.shape({}),
    users: propTypes.shape({}),
  }
  componentDidMount() {
    this.props.getAll();
  }

  handleDeleteUser(id) {
    this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You are logged in with JWT !!</p>
        <h3>Users from api end point:</h3>
        {users.loding && <em>Loading users...</em>}
        {
          users &&
            <ul>
              {users.map(item => (
                <li key={item.id}>
                  {`${item.firstName} ${item.lastName}`}
                </li>
              ))}
            </ul>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAll: () => {
    dispatch(logInOutActions.getAll());
  },
  deleteUser: (id) => {
    dispatch(logInOutActions.deleteUser(id));
  },
});

const mapStateToProps = state => ({
  user: state.authReducer.user,
  users: state.userReducer.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
