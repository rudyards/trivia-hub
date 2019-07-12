import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';

class GamePage extends Component {

    state = {
        questions: []
    }

    async componentDidMount(){
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        this.setState({questions: theseQuestions.results})
        console.log(this.state.questions[0].question)
    }

    render(props){
        const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

        return (
            <div className="GamePage">
                Here's the GamePage
                <ul>
                { this.state.questions.map((q, i) =>
                    <p>
                    {renderHTML(q.question)}
                    <button>{renderHTML(q.correct_answer)}</button>
                    {q.incorrect_answers.map((a, i) =>
                        <button>{renderHTML(a)}</button>
                        )}
                    </p>
                    )}
                </ul>
            </div>
        );
    }
}

export default GamePage;
