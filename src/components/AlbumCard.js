import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <div key={ album.artistId }>
        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
        <h4>{ album.collectionName }</h4>
        <p>{ album.artistName }</p>
        <Link
          to={ `album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          { album.collectionId }
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: propTypes.shape({
    artistId: propTypes.number.isRequired,
    artistName: propTypes.string.isRequired,
    collectionName: propTypes.string.isRequired,
    artworkUrl100: propTypes.string.isRequired,
    collectionId: propTypes.number.isRequired,
  }).isRequired,
};

export default AlbumCard;
