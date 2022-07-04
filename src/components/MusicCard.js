import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songList } = this.props;
    return (
      <div>
        {
          songList.filter((a) => (a.kind === 'song'))
            .map((b) => (
              <div key={ b.trackName }>
                <p>{ b.trackName }</p>
                <audio data-testid="audio-component" src={ b.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>
            ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  songList: propTypes.arrayOf(propTypes.object).isRequired,
};

export default MusicCard;
