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
        // Loads questions from API, using the trivia-api services. Response_code 1 means that the questions returned empty
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        if (theseQuestions.response_code === 1){
            this.setState({warning: 'There are no questions available for this difficulty level of this category.'})
        } else {
            this.setState({questions: theseQuestions.results})
            const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });
            // Runs through the questions pulled from the API and creates HTML elements for each of them
            // The HTML consists of the question, the correct answer, and incorrect answers
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

            // Unfortunately, this initial mapping always puts the correct answer first, which is no good
            // Instead, we have another function (shuffler) that we use in a forEach loop of all the questions
            // We cycle through all our questions, add their answers to an array, mix that array, then reconnect them
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
        // We only treat a button click as a correct guess if they haven't already guessed for that question
        let targetClass = e.currentTarget.parentElement.getAttribute("class");
        if (targetClass !== "answered-wrong" && targetClass !== "answered-right"){
            e.currentTarget.parentElement.setAttribute("class", "answered-right");
            this.setState({score: this.state.score+1})
        }
    }

    handleIncorrectGuess = (e) => {
        e.preventDefault()
        // We only treat a button click as a incorrect guess if they haven't already guessed for that question
        let targetClass = e.currentTarget.parentElement.getAttribute("class");
        if (targetClass !== "answered-wrong" && targetClass !== "answered-right"){
            e.currentTarget.parentElement.setAttribute("class", "answered-wrong");
        }
    }

    handleGameEnd = (e) => {
        // We prompt the user to give their initials, with a base case if they choose not to
        // Then we use the scoresService to create a new high score, and redirect them to that page (which requires them to log in)
        let initialsAttempt = prompt('Enter your initials: ');
        let initials;
        if (initialsAttempt != null){
            initials = initialsAttempt.substr(0, 3);
        } else {
            initials = 'NO1'
        }
        scoresService.create({ initials, correctAnswers: this.state.score, difficulty: this.props.difficulty, category: this.props.categoryString });
        window.location='/high-scores'
        
        
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
