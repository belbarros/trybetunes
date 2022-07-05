import React from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isFav: false,
    };
  }

  componentDidMount() {
    this.isFavorite();
  }

  isFavorite = () => {
    const { favorites, trackId } = this.props;
    if (favorites.some((song) => song.trackId === trackId)) {
      this.setState({ isFav: true });
    } else {
      this.setState({ isFav: false });
    }
  }

  handleCheck = () => {
    this.setState((prevState) => ({
      loading: true,
      isFav: !prevState.isFav,
    }), async () => {
      const { songList } = this.props;
      const { isFav } = this.state;
      if (isFav) {
        await addSong(songList);
        this.setState({ loading: false });
      } else {
        await removeSong(songList);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isFav } = this.state;
    if (loading) return <Loading />;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            name="favorite"
            onChange={ this.handleCheck }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ isFav }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  favorites: propTypes.arrayOf(propTypes.object).isRequired,
};

export default MusicCard;
