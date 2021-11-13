import { useState, useEffect } from 'react';
import LastFMApi from '../Libraries/LastFMApi';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';

export default function LastFMResults({ addedSongs, doneFunction }) {
    const LastFM = new LastFMApi(process.env.REACT_APP_LASTFM_API_KEY)
    let [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSimilarSongs();
    }, [])

    let fetchSimilarSongs = async () => {
        let cloneSongs = [...addedSongs];
        addedSongs.forEach(async song => {
            console.log(song)
            let r = await LastFM.getSimilarTrack(song.artist, song.name, 8)

            console.log(r)
            // Map each item in songs

            r = r.map(item => {
                return {
                    name: item.name,
                    match: item.match,
                    duration: item.duration,
                    artist: item.artist.name,
                }
            })

            let mappedArray = cloneSongs.map(s => {
                if (s.name === song.name && s.artist === song.artist) {
                    s.similar = r;
                }
                return s;
            })

            setSongs(mappedArray);

        })
    }

    let progressBarStyles = buildStyles({
        pathColor: '#222222',
        textColor: '#222222',
    })

    return (
        <div>
            <button className="btn btn-lg btn-danger my-4" onClick={doneFunction}>
                <FaArrowLeft /> Go Back
            </button>

            <p>Only use the refresh button below IF and only IF there is no results</p>
            <button onClick={fetchSimilarSongs} className="btn btn-success">Refresh</button>

            {songs.map((song, index) => {

                return (

                    <div className="my-5" key={index}>
                        <h3>{song.name}</h3>
                        <h5>{song.artist}</h5>
                        <div className="row">

                            {Array.isArray(song.similar) && song.similar.length

                                ?

                                song.similar.map((s, index) => {
                                    const percentage = Math.round(parseFloat(s.match) * 100);
                                    return (

                                        <div className="col-lg-3 card" key={index}>
                                            <div className="card-body">

                                                <div className="progressBarWrapper my-3">
                                                    <CircularProgressbar styles={progressBarStyles} value={percentage} text={`${percentage}%`} />
                                                </div>

                                                <h5 className="card-title">{s.name}</h5>
                                                <p className="card-text">{s.artist}</p>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <h5 className="my-3">No similar tracks found</h5>

                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}