
import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { isAuthenticated, isLoading, login, signup } from '../modules/auth';

// route wrapper internals
const UnconnectedAuthRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    props.authenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const mapAuthStateToProps = (state, props) => {
  return {
    authenticated: isAuthenticated(state), 
    ...props
  }
};


const UnwrappedLoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">email address</label>
        <Field component="input" type="email" className="form-control" name="email" placeholder="Email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">password</label>
        <Field component="input" type="password" className="form-control" name="password" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-default">Submit</button>
    </form>
  );
}
const LoginForm = reduxForm({
  form: "login"
})(UnwrappedLoginForm);




// login internals
class UnconnectedLogin extends React.Component {
  static propTypes = {
    submitLogin: React.PropTypes.func.isRequired,
    authenticated: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(blob) {
    return this.props.submitLogin(blob.email, blob.password);
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (this.props.authenticated) {
      console.log("authenticated is broken");
      return (
        <Redirect to={from} />
      );
    }
    if (this.props.isLoading) {
      console.log("loading is broken");
      return (
        <div> Loading </div>
      );
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <LoginForm onSubmit={ this.handleSubmit } />
          <small><em>Don't yet have an account? <Link to="/signup">Create</Link> one now!</em></small>
        </div>
      </div>
    );
  }
}

const mapLoginStateToProps = (state, props) => {
  return {
    authenticated: isAuthenticated(state),
    loading: isLoading(state)
  }
};

const mapLoginDispatchToProps = (dispatch, props) => {
  return {
    submitLogin: (email, password) => dispatch(login(email, password))
  }
};


// signup internals
class UnconnectedSignup extends React.Component {
  static propTypes = {
    submitSignup: React.PropTypes.func.isRequired,
    authenticated: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired
  }

  render () {
    if (this.props.authenticated) {
      return (
        <Redirect to={"/"} />
      );
    }
    if (this.props.loading) {
      return (
        <div> Loading </div>
      );
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label htmlFor="emailAddress">email address</label>
              <input type="email" className="form-control" id="emailAddress" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input type="text" className="form-control" id="name" placeholder="Name"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">confirm</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"/>
            </div>
            <button type="submit" className="btn btn-default" onClick={this.props.submitSignup}>Submit</button>
          </form>
          <em>Already have an account? <Link to="/signup">Log in</Link> now!</em>
        </div>
      </div>
    );
  }
}

const mapSignupStateToProps = (state, props) => {
  return {
    authenticated: isAuthenticated(state),
    loading: isLoading(state)
  }
};

const mapSignupDispatchToProps = (dispatch, props) => {
  return {
    submitSignup: (email, name, password) => dispatch(signup(email, name, password))
  }
};

// exported components
export const AuthRoute = connect(mapAuthStateToProps)(UnconnectedAuthRoute);
export const Login = connect(mapLoginStateToProps, mapLoginDispatchToProps)(UnconnectedLogin);
export const Signup = connect(mapSignupStateToProps, mapSignupDispatchToProps)(UnconnectedSignup);

