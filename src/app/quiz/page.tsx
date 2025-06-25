"use client";

import { useEffect, useState, useRef } from "react";


type Question = {
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [questionNumber, setQuestionNumber] = useState(0)

    const has_fetched = useRef(false)

    useEffect(() => {
        if (!has_fetched.current) {
            has_fetched.current = true
            const fetchQuestions = async () => {
                try {
                    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
                    const data = await res.json()

                    setQuestions(data.results)
                } catch (err){
                    console.error("Failed to fetch data ", err)
                } finally {
                    setLoading(false)
                }
                
            }

            fetchQuestions()
        }
        

    }, [])

    if (loading || !questions) return <p>Questions are loading...</p>

    const currentQuestion = questions[questionNumber]

    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]

    for (let i = 0; i <= 3; i++) {
        const randomNumber = Math.floor(Math.random() * 4)

        const temp = answers[i]
        answers[i] = answers[randomNumber]
        answers[randomNumber] = temp
    }

    return (
        <main>
            { questionNumber <= 9? (
                <div className="flex min-h-screen items-center bg-white flex-col">
                <h1 className="text-5xl my-6">Question number {questionNumber + 1}: {questions[questionNumber].question}</h1>

                <ul>
                    {answers.map((answer, i) => (
                        <li className="px-2 py-3 my-6 rounded-md text-3xl text-center text-white bg-blue-600 hover:bg-orange-600 transition" key={i} onClick={() => {setQuestionNumber(questionNumber + 1)}}>{answer}</li>
                    ))}
                </ul>
                </div>
            ): <h1>End of quiz</h1>
            }
        </main>
    );
}
