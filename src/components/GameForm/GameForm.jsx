import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class GameForm extends Component {

    state = {
        difficulty: '',
        category: 0,
    }

    handleChange = (e) => {
      this.setState({
        // Using ES2015 Computed Property Names
        [e.target.name]: e.target.value
      });
    }


    handleGameStart = async (e) => {
        e.preventDefault()
        window.location = "/game"
    }

    render(){
        return(
        <form className="form-horizontal" onSubmit={this.handleGameStart}>
            <br/>Difficulty:
            <select name="difficulty" onChange={this.handleChange} value={this.state.difficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <br/>Category:
            <select name="category" onChange={this.handleChange} value={this.state.category}>
                {this.props.categories.map((category) =>
                    <option value={category.id}>{category.name}</option>
                    )}
            </select>
            <br />
            <button className="btn btn-default">Start Game</button>
        </form>
    )}
}


export default GameForm;