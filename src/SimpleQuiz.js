import React, { useRef, useState } from 'react'
import QuizProgress from './QuizProgress';
import QuizResult from './QuizResult';
import allquestions from "./SimpleQuizData"
import './SimpleQuiz.scss'

export default function SimpleQuiz() {
const [currentQuestion,setCurrentQuestion]=useState(0)
const [questions, setQuestions]=useState(allquestions)
const [correct, setCorrect]=useState(0)
const [inprogress, setInprogress]=useState(true)
const radioRef=useRef()


const updateAnswer =(e)=>{
    let userinput = e.target.value
    let upDateQuestion= [...questions]
    upDateQuestion[currentQuestion].answerCorrect=JSON.parse(userinput)
    setQuestions(upDateQuestion)   
}
const checkAnswer =()=>{
    let updatedQuestion = [...questions]
    updatedQuestion[currentQuestion].checked=true
    setQuestions(updatedQuestion)  
}
const nextQuestion =()=>{
    setCurrentQuestion(currentQuestion+1)
    radioRef.current.reset()
}
const getResult =()=>{
    let answer = correct
    questions.forEach((item,index)=>{
        if(item.answerCorrect){
            ++answer
        }
        if(index === questions.length-1){
                setCorrect(answer)
                setInprogress(false)
        }
    })
}
const startOver =()=>{
    let updateQuestion = [...questions]
    updateQuestion.forEach(item => {
        delete item.answerCorrect;
        delete item.checked
    });
    setInprogress(true)
    setCorrect(0)
    setCurrentQuestion(0)
    setQuestions(updateQuestion)
}  
    return (
        <section className="quiz fade-in" aria-live="polite">
            {
                !inprogress? <QuizResult correct={correct} questionLength={questions.length} startOver={startOver}/>: <div>
                     <QuizProgress currentQuestion={currentQuestion} questionLength={questions.length}/>
            <div className='question-container'>
                <p className='question'>{questions[currentQuestion].question}</p>
                <form ref={radioRef}>
                   { questions[currentQuestion].options.map((item,index)=><div key={index}
                       className={"option"+ (questions[currentQuestion].checked && !item.correct?'dim':'')+(questions[currentQuestion].checked&& item.correct?'correct':'')}>
                           <input id={"radio-"+index} type="radio" name="option" value={item.correct} disabled={questions[currentQuestion].checked} onClick={updateAnswer}/>
                           <label htmlFor={"radio-"+index}>{item.option}</label>
                   </div> )}
                </form>
                <div className="bottom">
                    {
                          questions[currentQuestion].feedback && questions[currentQuestion].checked && <p>
                              {questions[currentQuestion].feedback}
                          </p>  
                    }
                    {
                        !questions[currentQuestion].checked && <button 
                        type="button" disabled={!("answerCorrect" in questions[currentQuestion])} onClick={checkAnswer}>Check Answer</button>
                       
                    }
                    {
                        currentQuestion+1 < questions.length && questions[currentQuestion].checked && <button className="fade-in next" type="button" onClick={nextQuestion}>Next</button>
                    }
                </div>
                {
                    currentQuestion+1 === questions.length && questions[currentQuestion].checked && <button type='button' className="get-result pulse" onClick={getResult}>Get Result</button>
                }
            </div>
                </div>
            } 
        </section>
    )
}
