import { data } from "@/data/reading/part-3";
import { QuestionPart3 } from "./question";

function ReadingPart3() {
  const questions = data;
  return (
    <div>
      {questions.map((item, index) => (
        <QuestionPart3 question={item} key={index} />
      ))}
    </div>
  );
}

export default ReadingPart3;
