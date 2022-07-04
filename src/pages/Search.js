import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      artist: '',
      isBtnDisabled: true,
      loading: false,
      albuns: '',
    };
  }

  handleBtnDisabled = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    if (searchInput.length >= minLength) {
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
      searchInput: target.value,
      artist: target.value,
    }, () => { this.handleBtnDisabled(); });
  }

  handleSearch = async () => {
    const { searchInput } = this.state;
    this.setState({
      loading: true,
    });
    const search = await searchAlbumsAPI(searchInput);
    this.setState({
      albuns: search,
      searchInput: '',
      loading: false,
    });
  }

  render() {
    const { searchInput, isBtnDisabled, loading, artist, albuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading />
          : (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                name="search"
                placeholder="Digite o nome do artista"
                value={ searchInput }
                onChange={ this.handleInput }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isBtnDisabled }
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </form>
          )}

        { artist && (<h4>{ `Resultado de álbuns de: ${artist}` }</h4>) }

        { albuns !== undefined && albuns.length >= 1
          ? albuns.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />))
          : <p>Nenhum álbum foi encontrado</p> }

      </div>
    );
  }
}

export default Search;
