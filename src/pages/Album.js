import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: {},
      songList: [],
      favorites: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  // https://dev.to/ishakmohmed/history-location-match-in-react-summarized-like-crazy-9d1

  fetchMusic = async () => {
    const { match } = this.props;
    this.setState({ loading: true });
    const music = await getMusics(match.params.id);
    const favs = await getFavoriteSongs();
    this.setState({
      album: music[0],
      songList: music.filter((type) => type.kind === 'song'),
      favorites: favs,
      loading: false,
    });
  }

  render() {
    const { album, songList, favorites, loading } = this.state;
    if (loading) return <Loading />;
    console.log(songList);
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="album-name">{ album.collectionName }</h4>
        <h5 data-testid="artist-name">{ album.artistName }</h5>

        {
          songList.map((a) => (<MusicCard
            key={ a.trackId }
            songList={ songList }
            trackName={ a.trackName }
            previewUrl={ a.previewUrl }
            trackId={ a.trackId }
            favorites={ favorites }
          />))
        }
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
