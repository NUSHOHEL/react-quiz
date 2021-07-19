import React from 'react'

export default function QuizResult(props) {
  const score =((props.correct/props.questionLength) * 100).toFixed();
    return (
        <div className="results fade-in">
      <h1>Your score: {score}%</h1>
      <button type="button" onClick={props.startOver}>Try again <i className="fas fa-redo"></i></button>
      {
        score > 80 ? <button>Next</button>: "you must pass"
      }
    </div>
    )
}
