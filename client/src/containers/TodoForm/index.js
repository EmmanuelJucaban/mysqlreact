import React, { Component } from "react";
import axios from 'axios';
// Component exports
import ListItem from "../../components/TodoListItems";
class TodoForm extends Component {
  state = {
    input: "",
    todos: [],
  };
  componentDidMount() {
    this.fetchTodos();
  }
  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ input: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("I happened")
    // The second parameter to this post request is going to become req.body
    axios.post('/api/todos', {title: this.state.input }).then(res => {
      this.setState({ todos: res.data })
    });
  };

  fetchTodos = () => {
    axios.get('/api/todos').then(res => {
      console.log(res);
      this.setState({todos: res.data});
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <form>
          <div className="form-group">
            <label>Todos</label>
            <input
              onChange={this.handleInputChange}
              value={this.state.input}
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <button onClick={this.handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>
        <ListItem items={this.state.todos} {...this.props} />
      </div>
    );
  }
}
export default TodoForm;