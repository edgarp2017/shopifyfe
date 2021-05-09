import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import './App.css';

// API key
import { APIKEY } from './key.js'

// components
import SearchBox from './components/SearchBox.js';
import SearchResults from './components/SearchResults.js';
import NominatedList from './components/NominatedList.js';
import Banner from './components/Banner.js';

const App = ()  => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [nominated, setNominated ] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shopify-results"));
    setNominated(data);
  }, []);

  useEffect(() => {
    const getData = () => {
      fetch(`https://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&type=movie`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          setResults(data.Search)
        }
      });
    }

    getData();
    
  }, [search]);

  const checkNominated = (title) => {
    for (let i=0; i<nominated.length; i++) {
      if (nominated[i] === title) {
        return true
      }
    }

    if (nominated.length === 5) {
      return "Done"
    }

    return false;
  }

  const addNominated = (title) => {
    setNominated([...nominated, title])
    localStorage.setItem("shopify-results", JSON.stringify([...nominated, title]))
  }

  const removeNominated = (title) => {
    let update = [];

    for (let i=0; i<nominated.length; i++) {
      if (nominated[i] !== title) {
        update.push(nominated[i])
      }
    }
    setNominated(update)
    localStorage.setItem("shopify-results", JSON.stringify(update))
  }

  return (
    <Container>
      { nominated.length === 5 ? <Banner />: <div /> }
      
      <h1 className="mt-5 pt-5 mb-5">The Shoppies</h1>

      <SearchBox handleChange={handleChange} />

      <Row>
        <Col>
          <Card className="mt-5">
            <Card.Body>
              <h5 className="mt-3 mb-3">
                Results for "{search}"
              </h5>
              {
                results.map((movie) => {
                  return (
                    <SearchResults 
                      key={movie.imdbID}
                      Title={movie.Title} 
                      Year={movie.Year} 
                      Poster={movie.Poster}
                      checkNominated={checkNominated}
                      addNominated={addNominated}
                      removeNominated={removeNominated}
                    /> 
                  )
                })
              }
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mt-5">
            <Card.Body>
              <h5 className="mt-3 mb-3">
                Nominations
              </h5>
              {
                nominated.map((movie) => {
                  return (
                    <NominatedList 
                      key={nominated.length}
                      Title={movie} 
                      removeNominated={removeNominated}
                    /> 
                  )
                })
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

export default App;
