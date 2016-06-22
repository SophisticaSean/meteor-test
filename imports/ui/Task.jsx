import React, { Component, PropTypes } from 'react';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }
  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';

    // Handle $ and % insertion only if applicable
    this.props.task.percentage = this.props.task.value
    this.props.task.flat_amount = this.props.task.dist
    if (this.props.task.percentage != '') {
      this.props.task.percentage = this.props.task.value + "%"
    }
    if (this.props.task.flat_amount != '') {
      this.props.task.flat_amount = "$" + this.props.task.dist
    }

    return (
        <tr>
          <td>{this.props.task.text}</td>
          <td>{this.props.task.percentage}</td>
          <td>{this.props.task.flat_amount}</td>
          <td>{this.props.task.priority}</td>
          <td>
           <label>
            <input
              type="checkbox"
              readOnly
              checked={this.props.task.checked}
              onClick={this.toggleChecked.bind(this)}
            />
            Percentage
           </label>
          </td>
          <td>
            <button className="delete" onClick={this.deleteThisTask.bind(this)}>
              &times;
            </button>
          </td>
        </tr>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
