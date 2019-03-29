import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import './signup.css'
import config from '../../app.config';
import OutNavbar from '../layout/OutNavbar';

export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null
      };
      this.oktaAuth = new OktaAuth({ url: config.url });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken:sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
      e.preventDefault();
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          Accept: 'application/json',
          'Content-Type': 'application/json' ,
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' ,
          
        },
        body: JSON.stringify(this.state)
      })
        .then(user => {
          this.oktaAuth
            .signIn({
              username: this.state.email,
              password: this.state.password
            })
            .then(res =>
              this.setState({
                sessionToken: res.sessionToken
              })
            );
        })
        .catch(err => console.log);
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div className="container">
        <OutNavbar/>
        <form className="form"  onSubmit={this.handleSubmit}>
          <label >
          <p className="label-txt">ENTER YOUR EMAIL</p>
            <input
              className="input"
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <div className="line-box">
            <div className="line"></div>
            </div>
          </label>
          <label >
          <p className="label-txt">ENTER YOUR FIRST NAME</p>
            <input
              className="input"
              type="text"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
            <div className="line-box">
            <div className="line"></div>
            </div>
          </label>
          <label>
          <p className="label-txt">ENTER YOUR LAST NAME</p>
            <input
              className="input"
              type="text"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
            <div className="line-box">
            <div className="line"></div>
            </div>
          </label>
          <label>
            <p className="label-txt">Password:</p>
            <input
              className="input"
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <div className="line-box">
            <div className="line"></div>
            </div>
          </label>
          <button id="submit" type="submit">REGISTER</button>
        </form>
        </div>
      );
    }
  }
);