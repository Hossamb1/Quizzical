import blob1 from "./images/blob-1.png";
import blob2 from "./images/blob-5.png";
import { useState, useEffect } from "react";
import Quiz from "./components/quiz";
function App() {
  const [quizData, setQuizData] = useState([]);
  const [enterQuiz, setEnterQuiz] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [reQuiz, setReQuiz] = useState(false);
  const [score, setScore] = useState(0);
  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  function func() {
    return 0.5 - Math.random();
  }
  function selected(answerText, ID) {
    if (!showAnswers) {
      setQuizData((prevQuestList) => {
        const newQuestList = prevQuestList.map((question) => {
          if (ID === question.id) {
            const newAnsArray = question.answers.map((answer) => {
              if (answerText === answer.text) {
                return { ...answer, isSelected: true };
              }
              return { ...answer, isSelected: false };
            });
            return { ...question, answers: newAnsArray };
          }
          return question;
        });
        return newQuestList;
      });
    }
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((response) => response.json())
      .then((data) =>
        setQuizData(
          data.results.map((item, index) => {
            return {
              id: index,
              questionText: decodeHtml(item.question),

              answers: [
                {
                  text: decodeHtml(item.correct_answer),
                  isCorrect: true,
                  isSelected: false,
                },
                ...item.incorrect_answers.map((answer) => {
                  return {
                    text: decodeHtml(answer),
                    isCorrect: false,
                    isSelected: false,
                  };
                }),
              ].sort(func),
              gotScore: false,
            };
          })
        )
      );
  }, [reQuiz]);
  const quizComponent = quizData.map((items) => {
    return (
      <Quiz
        key={items.id}
        enterQuiz={enterQuiz}
        id={items.id}
        question={items.questionText}
        answers={items.answers}
        gotScore={items.gotScore}
        showAnswers={showAnswers}
        selected={selected}
      />
    );
  });
  function checkAnswers() {
    setScore(0);
    setQuizData((prevQuestList) => {
      const newQuestList = prevQuestList.map((question) => {
        const selectedAnswer = question.answers.find((answer) => {
          return answer.isSelected;
        });
        if (selectedAnswer && selectedAnswer.isCorrect) {
          setScore((score) => score + 0.5);
          return { ...question, gotScore: true };
        }
        return { ...question, gotScore: false };
      });
      return newQuestList;
    });
    setShowAnswers(true);
  }

  function startQuiz() {
    if (quizData.length > 1) {
      return setEnterQuiz((enterQuiz) => !enterQuiz);
    }
  }
  function reQuizing() {
    setShowAnswers((quiz) => !quiz);
    setEnterQuiz((quiz) => !quiz);
    setReQuiz((quiz) => !quiz);
  }
  return (
    <div>
      {quizData.length < 1 ? (
        <div className="App">
          <h1 className="loading">
            Quiz is loading
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </h1>
        </div>
      ) : (
        <div className="App">
          <img
            src={blob2}
            alt=""
            className={enterQuiz ? "smaller-right" : "image2"}
          />
          <div className="quiz">{quizComponent}</div>
          {showAnswers ? (
            <div className="play">
              <h3>You scored {score}/5 correct answers</h3>
              <button onClick={reQuizing}>Play again</button>
            </div>
          ) : (
            enterQuiz && (
              <div className="btn">
                <button onClick={checkAnswers}>Check answers</button>
              </div>
            )
          )}

          <div className={enterQuiz ? "opening disabled move" : "opening"}>
            <h1>Quizzical</h1>
            <p>Let's test YOUR knowledge!</p>
            <button onClick={startQuiz}>Start quiz</button>
          </div>
          <img
            src={blob1}
            alt=""
            className={enterQuiz ? "smaller-left" : "image1"}
          />
        </div>
      )}
    </div>
  );
}

export default App;
