import React from 'react'
import { useSearch } from '../../Context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdOutlineSavedSearch } from 'react-icons/md'

const SearchInput = () => {
  const [search, setSearch] = useSearch()
  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${search.keyword}`,
      )
      setSearch({ ...search, results: data })
      navigate('/search')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />

        <div
          style={{
            marginLeft: '5px',
            marginTop: '5px',
            marginRight: '10px',
          }}
        >
          <MdOutlineSavedSearch
            size={25}
            color="black"
            onClick={handlesubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchInput
