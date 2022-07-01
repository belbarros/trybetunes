import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isBtnDisabled: true,
      loading: false,
      logged: false,
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

  // A função createUser é uma função assíncrona, então torna-se necessário lidar com sua promise para prosseguir com o código. Usei o .then para mudar o setState quando é terminado de carregar a promise da função, como se fosse um botão on/off do usuário/loading state.

  handleSubmit = () => {
    this.setState({
      loading: true,
    });
    const { username } = this.state;
    createUser({ name: username })
      .then(() => this.setState({
        loading: false,
        logged: true,
      }));
  }

  render() {
    const { username, isBtnDisabled, logged, loading } = this.state;
    if (logged) return <Redirect to="./search" />;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            name="username"
            placeholder="Digite seu usuário"
            value={ username }
            onChange={ this.handleInput }
          />
          <button
            type="button"
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

export default Login;
