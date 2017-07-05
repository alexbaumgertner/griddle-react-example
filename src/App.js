import React, { Component } from 'react';
import Griddle, {
  RowDefinition,
  ColumnDefinition
} from 'griddle-react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

const data = [
  {
    "name": "Mayer Leonard",
    "city": "Kapowsin"
  },
  {
    "name": "Koch Becker",
    "city": "Johnsonburg"
  }
];

/**
 *
 * @param {Immutable.Map} state
 * @param props
 * @return {Object}
 *
 * @see https://github.com/GriddleGriddle/Griddle/blob/master/src/selectors/dataSelectors.js
 * @see https://facebook.github.io/immutable-js/docs/
 * @see http://devdocs.io/immutable/index#list.find
 */
const rowDataSelector = (state, { griddleKey }) => {
  return state // State - ImmutableJS
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});

function MyCustomComponent({ value, griddleKey, rowData }) {
  return (
    <div className="MyCustomComponent">
      Person <strong>{value}</strong> from city: <em>{rowData.city} (rowData)</em>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Griddle data={data}>
          <RowDefinition>
            <ColumnDefinition
              id="name"
              title="Persons"
              customComponent={enhancedWithRowData(MyCustomComponent)}
            />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}

export default App;
