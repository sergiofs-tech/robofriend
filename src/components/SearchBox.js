import React from 'react';

function SearchBox ({searchfield, searchChange}) {
  return (
    <div className='pa2'>
      <input type='search'
            className='pa3 ba b--green bg-lightest-blue'
            placeholder='Search Robots'
            onChange={searchChange}/>
    </div>
  );
}

export default SearchBox;