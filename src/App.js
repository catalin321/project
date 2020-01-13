import React, {Component, useRef, useEffect } from 'react';
import './App.css';
import jsonData from './resources/people';
import Chips from './components/Chips';

export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      entries: []
		}
  }

  componentDidMount() {
    this.parseData(jsonData)
      .then(list => {
        const entries = list.map( value => { 
          const {entry : {...entry}} = value; 
          return { 
            ...entry, editMode: false
          };
        });
        return entries;
      })
      .then(entries => this.setState({ entries }));
  }

  parseData = data => {
    return new Promise( resolve => {
        const { list : { entries } } = data; 
        resolve(entries);
      }
    )
  }

  render() {

    const entries = this.state.entries;
    return (
      entries.length > 0 && <Chips entries={entries} />
    )
	}
}
