import React from 'react'

const SearchBar = (props) => {
  return (
    <div>
        <input className="search-input" value={props.value} onChange={props.onChange} placeholder='Search Products...'/>
    </div>
  )
}

export default SearchBar