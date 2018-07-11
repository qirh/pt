import React, { Component } from 'react';
import './App.css';

//Components
import SearchWords from './SearchWords.js';
import WordsTable from './WordsTable.js';

//React table
import ReactTable from "react-table";
import 'react-table/react-table.css'
import matchSorter from 'match-sorter'


export default class App extends Component {
  state = {
    words: [],
    organization_id: 0
  }

  componentDidMount() {

    fetch('http://localhost:5000/api')
    .then(res => res.json())
    .then(words => this.setState({ words })
  );
  //console.log(words)
  fetch('http://whalertestbackend-env.73ghfcgu73.us-east-2.elasticbeanstalk.com/donors')
  .then(res => res.json())

}

handleOrganizationIDChange = (user_input) => {
  var new_organization_id = 0
  if (!isNaN(user_input) && user_input !== "") {
    new_organization_id = parseFloat(user_input)
  }
  this.setState(prevState => ({
    organization_id: new_organization_id,
  }))
}



render() {
  const columns = [
    {Header: "Info", columns: [
      {Header: 'Word', accessor: 'word', filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)&&row[filter.id].endsWith(filter.value)},
      {Header: 'Target Language', accessor: 'target_lang', accessor: d => d.lastName, filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["target_lang"] }), filterAll: true}
    ]},

    {Header: "Guess #1", columns: [{Header: 'Detected Language', accessor: 'lang_1', Cell: props => <span className='number'>{props.value}</span>},
    {Header: 'Translation', accessor: 'translation_1', Cell: props => <span className='number'>{props.value}</span>}]},
    {Header: "Guess #2", columns: [{Header: 'Detected Language', accessor: 'lang_2', Cell: props => <span className='number'>{props.value}</span>},
    {Header: 'Translation', accessor: 'translation_2', Cell: props => <span className='number'>{props.value}</span>}]}
  ]
  return (
    <div className="words-app">
    <h1 className="words-header">Possible Translations</h1>
    <SearchWords onHandleOrganizationIDChange={this.handleOrganizationIDChange}/>

    <ReactTable data={this.state.words} columns={columns} defaultPageSize={10} className="-striped -highlight" filterable defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}/>

    </div>
  );
}
}
