import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';

class GamePage extends Component {

    state = {
        questions: [],
        score: 0,
        mixAnswers: []
    }

    async componentDidMount(){
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        this.setState({questions: theseQuestions.results})
        const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
        let questionAnswers = this.state.questions.map((q, idx) =>{
            return (
                <span name={idx} className="question">
                {renderHTML(q.question)}
                <button name="correct" onClick={this.handleCorrectGuess}>{renderHTML(q.correct_answer)}</button>
                {q.incorrect_answers.map((a, i) =>
                    <button name="incorrect" onClick={this.handleIncorrectGuess}>{renderHTML(a)}</button>
                    )}
                <br/>
                </span>
                )

            })
        console.log(questionAnswers)

        function shuffler(a){
            for(let i = a.length - 1; i > 0; i--){
                const j = Math.floor(Math.random()*(i+1));
                [a[i], a[j]] = [a[j], a[i]]
            }
            return a;
        }

        var mixedUp = []

        questionAnswers.forEach(function(question){
            let mixAnswers = []
            mixAnswers.push(question.props.children[1])
            mixAnswers.push(question.props.children[2][0])
            mixAnswers.push(question.props.children[2][1])
            mixAnswers.push(question.props.children[2][2])
            mixAnswers = shuffler(mixAnswers)
            mixedUp.push(mixAnswers)
        })

        this.setState({mixAnswers: mixedUp})
        console.log(this.state.mixAnswers);
    }

    handleCorrectGuess = (e) => {
        e.preventDefault()
        e.currentTarget.parentElement.setAttribute("style", "display: none");
        this.setState({score: this.state.score+1})
    }

    handleIncorrectGuess = (e) => {
        e.preventDefault()
        e.currentTarget.parentElement.setAttribute("style", "display: none");
    }

    handleGameEnd = (e) => {
        //this is where the game end logic is going to go and how it's going to save the user's score
        e.preventDefault()
    }

    render(props){
        const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
        
        return (
            <div className="GamePage">
                {this.state.questions.map((q, idx) => 
                        <span name={idx} className="question">
                        {renderHTML(q.question)}
                        {this.state.mixAnswers[idx]}
                        </span>

                    )}
                <br/><p name="score">Your Score: {this.state.score}</p>
                <br/><button name="Finish" onClick={this.handleGameEnd}>Finish</button>
            </div>
        );
    }
}

export default GamePage;
