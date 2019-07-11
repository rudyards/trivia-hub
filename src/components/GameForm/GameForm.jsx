import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class GameForm extends Component {

    render(){
        return(
        <form className="form-horizontal" onSubmit={this.props.handleGameStart}>
            <br/>Difficulty:
            <select name="difficulty" onChange={this.props.handleGameChange} value={this.props.difficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <br/>Category:
            <select name="category" onChange={this.props.handleGameChange} value={this.props.category}>
                {this.props.categories.map((category, idx) =>
                    <option key={idx} value={category.id}>{category.name}</option>
                    )}
            </select>
            <br />
            <button className="btn btn-default">Start Game</button>
        </form>
    )}
}


export default GameForm;