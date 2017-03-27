
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { isAuthenticated, isLoading, login, checkSession } from '../modules/auth';
import { LoadingComponent } from './Loading';


// HOC for publishing authenticated components
export function Authenticate(WrappedComponent) {
  class UnconnectedAuthenticatedComponent extends React.Component {
    componentDidMount() { 
      this.props.checkSession();
    }

    render() {
      if (this.props.authenticated) {
        return <WrappedComponent />;
      } else if (this.props.loading) {
        return <LoadingComponent />;
      } else { 
        return (
          <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />
        );
      }
    };
  }

  const mapAuthDispatchToProps = (dispatch) => {
    return {
      checkSession: () => dispatch(checkSession())
    }
  };

  const mapAuthStateToProps = (state, props) => {
    return {
      loading: isLoading(state),
      authenticated: isAuthenticated(state), 
      ...props
    }
  };

  return connect(mapAuthStateToProps, mapAuthDispatchToProps)(UnconnectedAuthenticatedComponent);
}


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


// exported components
export const Login = connect(mapLoginStateToProps, mapLoginDispatchToProps)(UnconnectedLogin);

