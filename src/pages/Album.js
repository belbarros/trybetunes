import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: {},
      songList: [],
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  // https://dev.to/ishakmohmed/history-location-match-in-react-summarized-like-crazy-9d1

  fetchMusic = async () => {
    const { match } = this.props;
    const music = await getMusics(match.params.id);
    this.setState({
      album: music[0],
      songList: music,
    });
  }

  render() {
    const { album, songList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="album-name">{ album.collectionName }</h4>
        <h5 data-testid="artist-name">{ album.artistName }</h5>

        <MusicCard songList={ songList } />
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }),
  }).isRequired,
};

export default Album;
