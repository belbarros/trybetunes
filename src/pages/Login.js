import React from 'react';
// import propTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isBtnDisabled: true,
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      username: target.value,
    }, () => { this.handleBtnDisabled(); });
  }

  handleBtnDisabled = () => {
    const { username } = this.state;
    const minLength = 3;
    if (username.length >= minLength) {
      this.setState({
        isBtnDisabled: false,
      }, () => {});
    } else {
      this.setState({
        isBtnDisabled: true,
      }, () => {});
    }
  }

  handleSubmit = () => {
    const { username } = this.state;
    createUser(username);
  }

  render() {
    const { username, isBtnDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="username"
            value={ username }
            onChange={ this.handleInput }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isBtnDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

// Login.propTypes = {
//   history: propTypes.string.isRequired,
// };

export default Login;
