import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  // Create a local react state of the this component with a content property set to nothing.
  constructor() {
    super();
    this.state = {
      content: "",
      date: "", // Adds a new key called "date" set to an empty string to represent the date.
    };
  }
  // The handleChange function updates the react state with the new input value provided from the user.
  // "event" is the defined action a user takes. In this case, the event is triggered when the user types something
  // into the text field.
  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: new Date().toLocaleString('en-us'), // updates value of "date" key
      due: null, // new key "due" (due date) set to null
    });
  };

  handleDateChange = (event) => {
    this.setState({
      due: new Date(event),
    });
  }
  // The handleSubmit function collects the forms input and puts it into the react state.
  // event.preventDefault() is called to prevents default event behavior like refreshing the browser.
  // this.props.addTodo(this.state) passes the current state (or user input) into the addTodo function defined
  // in the Home.js file which then adds the input into the list.
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim()) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "", // set "date" key back to empty string
        due: null, // clear the due date once form is submitted
      });
    }
  };

  // Bonus: Pressing the "Enter" key will equate to pressing the "ADD" submit button
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSubmit(event);
    }
  }

  render() {
    return (
      // 1. When rendering a component, you can render as many elements as you like as long as it is wrapped inside
      // one div element.
      // 2. The return statement should include a text field input with the handleChange function from above that
      // is passed into an onChange event.
      // 3. The return should also include a button with the handleSubmit function from above that is passed into
      // an OnClick event.
      // 4. The value of the text field also should reflect the local state of this component.
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress} // action for "Enter" key
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due ? new Date(this.state.due) : null/*value*/}
            onChange={this.handleDateChange/*onChange*/}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
