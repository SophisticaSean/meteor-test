import React, { Component, PropTypes } from 'react';
import { Scenarios } from '../api/scenarios.js';

// Scenario component - represents a single todo item
export default class Scenario extends Component {
    toggleChecked() {
    // Set the checked property to the opposite of its current value
    Scenario.update(this.props.scenario._id, {
      $set: { checked: !this.props.scenario.checked },
    });
  }

  deleteThisScenario() {
    Scenarios.remove(this.props.scenario._id);
  }
  render() {
    const scenarioClassName = this.props.scenario.checked ? 'checked' : '';
    return (
        <tr>
          <td>{this.props.scenario.text}</td>
          <td>{this.props.scenario.date}</td>
          <td>{this.props.scenario.amount}</td>
          <td>
           <label>
            <input
              type="checkbox"
              readOnly
              checked={this.props.scenario.checked}
              onClick={this.toggleChecked.bind(this)}
            />
            Percentage
           </label>
          </td>
          <td>
            <button className="delete" onClick={this.deleteThisScenario.bind(this)}>
              &times;
            </button>
          </td>
        </tr>
    );
  }
}

Scenario.propTypes = {
  // This component gets the scenario to display through a React prop.
  // We can use propTypes to indicate it is required
  scenario: PropTypes.object.isRequired,
};
