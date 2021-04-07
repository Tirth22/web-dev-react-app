import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import axios from '../../helpers/axiosForMusic'
import WaveForm from './WaveForm/WaveForm'
import * as Vibrant from 'node-vibrant'
import SmoothImage from 'react-smooth-image'

const MusicPlayer = () => {
  const { songId } = useParams()
  const [{ song, color }, setState] = useState({
    song: {
      _id: '',
      name: 'Loading',
      artist: 'Loading',
      img_url: '',
      song_url: '',
    },
    color: 'black',
  })

  useEffect(() => {
    const func = async () => {
      console.log(songId)
      const songData = await axios.get(`/songs/${songId}`)
      console.log(songData.img_url)
      Vibrant.from(songData.img_url)
        .getPalette()
        .then((palette) => {
          console.log(palette)
          const colorData = palette.Vibrant.hex
          setState({
            song: songData,
            color: colorData,
          })
        })
    }

    func()
  }, [songId])

  return (
    <div style={{ backgroundColor: color }}>
      <div className="row justify-content-center mx-0">
        <SmoothImage
          src={song.img_url}
          containerStyles={{
            width: '100vw',
            height: '100vw',
          }}
        />
      </div>
      <h1 className="pt-2 font-weight-bold">{song.name}</h1>
      <small>{song.artist}</small>
      <WaveForm song_url={song.song_url} />
    </div>
  )
}

export default MusicPlayer
