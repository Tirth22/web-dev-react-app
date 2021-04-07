import { useState } from 'react'
import useSongsList from '../../helpers/useSongsList'
import FeatherIcon from 'feather-icons-react'
import { Link } from 'react-router-dom'
import SmoothImage from 'react-smooth-image'

const Search = () => {
  const [query, setQuery] = useState('')
  const songs = useSongsList(query)

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <div className="p-5 pb-0 d-flex fixed top-0 end-0 justify-content-end">
        <input
          placeholder="Search by song name"
          value={query}
          className="rounded-pill bg-secondary py-2 px-4 flex-1"
          onChange={handleChange}
        />
        <FeatherIcon icon="search" />
      </div>
      <div className="container pt-5">
        {songs.length !== 0 ? (
          <>
            <h6 className="text-muted mb-4">Most Relevant Results</h6>
            <div className="d-flex w-100 justify-content-center">
              {songs.slice(0, 4).map((song) => {
                return (
                  <div key={song._id}>
                    <Link to={`/play/${song._id}`} className="d-flex">
                      <div style={{ width: '20vw' }} className="p-3">
                        <SmoothImage
                          src={song.img_url}
                          className="w-100 h-100"
                        />
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
            <hr />
            <h6 className="text-muted mt-4">All results</h6>
            <ul className="list-unstyled p-0">
              {songs.map((song) => {
                return (
                  <Link key={song._id} to={`/play/${song._id}`}>
                    <li className="my-4 d-flex justify-content-between">
                      <h6>{song.name}</h6>
                      <FeatherIcon icon="external-link" />
                    </li>
                  </Link>
                )
              })}
            </ul>
          </>
        ) : (
          <h6 className="text-muted">No results found</h6>
        )}
      </div>
    </>
  )
}

export default Search
