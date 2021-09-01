import React, { useState , useEffect } from 'react';
import { connect} from 'react-redux';

import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css'

import { setSearchField } from '../action'

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => {
      dispatch(setSearchField(event.target.value));
    }
  }
}

function App (store) {
  const [robots, setRobots] = useState([]);
  const { searchField , onSearchChange } = store;
  console.log(store)

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
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  })

  if (robots.length === 0) {
    return <h1> Please wait... </h1>
  }

  return (
    <div className='tc'>
      <h1>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange}/>
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots}/>
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
