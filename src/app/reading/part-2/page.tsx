import { dataReadingPart2 } from "@/data/reading/part-2";
import DragDrop from "./drag-drop";

function Part2() {
  const data = dataReadingPart2;
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <div className="w-full" key={item.title}>
          <DragDrop
            initialAnswers={item.answers}
            title={item.title}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export default Part2;
