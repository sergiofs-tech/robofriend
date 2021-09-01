import React, { useState , useEffect } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

function App () {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        return setRobots(users);
      });
  }, []);

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  if (robots.length === 0) {
    return <h1> Please wait... </h1>
  }

  return (
    <div className='tc'>
      <h1>RoboFriends</h1>
      <SearchBox searchChange={(event) => { setSearchfield(event.target.value)}}/>
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots}/>
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;