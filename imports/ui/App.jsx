import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Scenarios } from '../api/scenarios.js';

import Task from './Task.jsx';
import Scenario from './Scenario.jsx';

// App component - represents the whole app
class App extends Component {
  recipientSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.recipientTextInput).value.trim();
    const value = ReactDOM.findDOMNode(this.refs.valueInput).value.trim();
    const dist = ReactDOM.findDOMNode(this.refs.distributionInput).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priorityInput).value.trim();

    if (text != '' && priority != '' &&((dist != '' && value == '') || (value != '' && dist == ''))) {
      Tasks.insert({
        text,
        value,
        dist,
        priority,
        createdAt: new Date(), // current time
      });

      // Clear form
      ReactDOM.findDOMNode(this.refs.recipientTextInput).value = '';
      ReactDOM.findDOMNode(this.refs.valueInput).value = '';
      ReactDOM.findDOMNode(this.refs.distributionInput).value = '';
      ReactDOM.findDOMNode(this.refs.priorityInput).value = '';
    }
  }

  scenarioSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const date = ReactDOM.findDOMNode(this.refs.dateInput).value.trim();
    const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();

    Scenarios.insert({
      text,
      date,
      amount,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
    ReactDOM.findDOMNode(this.refs.dateInput).value = '';
    ReactDOM.findDOMNode(this.refs.amountInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderScenarios() {
    return this.props.scenarios.map((scenario) => (
      <Scenario key={scenario._id} scenario={scenario} />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="calc">
          <header>
            <h1>Equity Calculator</h1>

            <form className="new-task" onSubmit={this.recipientSubmit.bind(this)} >
                <input
                  type="text"
                  ref="recipientTextInput"
                  placeholder="Type to add new Recipient"
                />
                <input
                  type="number"
                  ref="valueInput"
                  placeholder="Distribution Percentage (needs to be <=100 and >0)"
                />
                <input
                  type="number"
                  ref="distributionInput"
                  placeholder="Distribution Flat Amount"
                />
                <input
                  type="number"
                  ref="priorityInput"
                  placeholder="Priority (1 being highest)"
                />
                <button className="recipientSubmit" type="submit">Submit</button>
              </form>
          </header>

          <table>
            <tbody>
              <tr>
                <th>Recipient Name</th>
                <th>Distribution Percentage</th>
                <th>Distribution Flat Amount</th>
                <th>Priority</th>
              </tr>

              {this.renderTasks()}
            </tbody>
          </table>
        </div>

        <div className="other">
          <header>
            <h1>Scenario Creation</h1>
            <form className="new-task" onSubmit={this.scenarioSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new Scenario name"
                />
                <input
                  type="date"
                  ref="dateInput"
                  placeholder="Scenario Date"
                />
                <input
                  type="number"
                  ref="amountInput"
                  placeholder="Reward Amount"
                />
              <button className="recipientSubmit" type="submit">Submit</button>
              </form>
          </header>

          <table>
            <tbody>
              <tr>
                <th>Scenario Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Misc</th>
              </tr>

              {this.renderScenarios()}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    scenarios: Scenarios.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
