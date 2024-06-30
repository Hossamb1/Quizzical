export default function Quiz(props) {
  if (props.enterQuiz) {
    function Checked(i) {
      if (props.showAnswers) {
        if (
          (props.answers[i].isSelected && props.gotScore) ||
          props.answers[i].isCorrect
        ) {
          return "correct";
        } else if (props.answers[i].isSelected && props.gotScore === false) {
          return "false";
        }
      } else if (props.answers[i].isSelected) {
        return "selected";
      } else {
        return "";
      }
    }

    return (
      <div className="qanda">
        <h3>{props.question}</h3>
        <p>
          <span
            onClick={() => props.selected(props.answers[0].text, props.id)}
            className={Checked(0)}
          >
            {props.answers[0].text}
          </span>
          <span
            onClick={() => props.selected(props.answers[1].text, props.id)}
            className={Checked(1)}
          >
            {props.answers[1].text}
          </span>
          <span
            onClick={() => props.selected(props.answers[2].text, props.id)}
            className={Checked(2)}
          >
            {props.answers[2].text}
          </span>
          <span
            onClick={() => props.selected(props.answers[3].text, props.id)}
            className={Checked(3)}
          >
            {props.answers[3].text}
          </span>
        </p>
      </div>
    );
  }
}
