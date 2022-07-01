import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isBtnDisabled: true,
    };
  }

  handleBtnDisabled = () => {
    const { artistName } = this.state;
    const minLength = 2;
    if (artistName.length >= minLength) {
      this.setState({
        isBtnDisabled: false,
      }, () => {});
    } else {
      this.setState({
        isBtnDisabled: true,
      }, () => {});
    }
  }

  handleInput = ({ target }) => {
    this.setState({
      artistName: target.value,
    }, () => { this.handleBtnDisabled(); });
  }

  render() {
    const { artistName, isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            placeholder="Digite o nome do artista"
            value={ artistName }
            onChange={ this.handleInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isBtnDisabled }
            // onClick={ this.handleSubmit }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
