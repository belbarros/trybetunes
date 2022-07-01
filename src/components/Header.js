import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });
    getUser()
      .then((user) => this.setState({
        loading: false,
        user,
      }));
  }

  render() {
    const { loading, user } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <div className="logo-space">LOGO</div>
        <nav className="links">
          <p data-testid="header-user-name">{ user.name }</p>
          <NavLink exact to="/search" data-testid="link-to-search">Buscar</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
          <NavLink exact to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
