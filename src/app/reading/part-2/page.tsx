import { dataReadingPart2 } from "@/data/reading/part-2";
import DragDrop from "./drag-drop";

function Part2() {
  const data = dataReadingPart2
  return (
    <div>
      {data.map((item, index) => (
        <DragDrop
          key={item.title}
          initialAnswers={item.answers}
          title={item.title}
          index={index}
        />
      ))}
    </div>
  );
}

export default Part2;
