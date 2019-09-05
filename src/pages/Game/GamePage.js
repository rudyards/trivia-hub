import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';
import scoresService from '../../utils/scoresService';

class GamePage extends Component {

    state = {
        questions: [],
        score: 0,
        mixAnswers: [],
        warning: ''
    }

    async componentDidMount(){
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        if (theseQuestions.response_code === 1){
            this.setState({warning: 'There are no questions available for this difficulty level of this category.'})
        } else {
            this.setState({questions: theseQuestions.results})
            const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
            let questionAnswers = this.state.questions.map((q, idx) =>{
                return (
                    <span name={idx} className="question">
                    {renderHTML(q.question)}
                    <button class="correct" onClick={this.handleCorrectGuess}>{renderHTML(q.correct_answer)}</button>
                    {q.incorrect_answers.map((a, i) =>
                        <button class="incorrect" onClick={this.handleIncorrectGuess}>{renderHTML(a)}</button>
                        )}
                    <br/>
                    </span>
                    )

                })


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
        }
    }

    handleCorrectGuess = (e) => {
        e.preventDefault()
        let targetClass = e.currentTarget.parentElement.getAttribute("class");
        if (targetClass !== "answered-wrong" && targetClass !== "answered-right"){
            e.currentTarget.parentElement.setAttribute("class", "answered-right");
            this.setState({score: this.state.score+1})
        }
    }

    handleIncorrectGuess = (e) => {
        e.preventDefault()
        let targetClass = e.currentTarget.parentElement.getAttribute("class");
        if (targetClass !== "answered-wrong" && targetClass !== "answered-right"){
            e.currentTarget.parentElement.setAttribute("class", "answered-wrong");
        }
    }

    handleGameEnd = (e) => {
        let initialsAttempt = prompt('Enter your initials: ');
        let initials;
        if (initialsAttempt != null){
            initials = initialsAttempt.substr(0, 3);
        } else {
            initials = 'NO1'
        }
        scoresService.create({ initials, correctAnswers: this.state.score, difficulty: this.props.difficulty, category: this.props.categoryString });
        window.location='/high-scores'
        
        
        //this is where the game end logic is going to go and how it's going to save the user's score

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
                {this.state.warning}
                <br/><p name="score">Your Score: {this.state.score}</p>
                <button name="Finish" onClick={this.handleGameEnd}>Finish</button>
            </div>
        );
    }
}

export default GamePage;
