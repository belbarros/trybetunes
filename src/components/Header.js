import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <div>LOGO</div>
        <nav>
          <NavLink exact to="/search" data-testid="link-to-search">Buscar</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
          <NavLink exact to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;
