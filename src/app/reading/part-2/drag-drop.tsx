"use client";

import { Button } from "antd";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "react-beautiful-dnd";
export interface Answer {
  content: string;
  correctOrder: string;
  status?: "correct" | "incorrect";
}

export interface DragDropProps {
  initialAnswers: Answer[];
  title: string;
  index: number;
}

function DragDropComponent({ initialAnswers, title, index }: DragDropProps) {
  const randomAnswers = useMemo(
    () => initialAnswers.sort(() => Math.random() - 0.5),
    [initialAnswers]
  );
  const [answers, setAnswers] = useState<Answer[]>(randomAnswers);
  const [isChecked, setIsChecked] = useState(false);
  const [isShowAnswers, setIsShowAnswers] = useState(false);
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(answers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAnswers(items);
  };
  const checkAnswer = () => {
    setIsChecked(true);
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer, index) => ({
        ...answer,
        status:
          answer.correctOrder === (index + 1).toString()
            ? "correct"
            : "incorrect",
      }))
    );
  };
  const toggleAnswer = () => {
    setIsShowAnswers((prev) => !prev);
  };
  const reset = () => {
    const randomAnswers = [...initialAnswers].sort(() => Math.random() - 0.5);
    setAnswers(randomAnswers);
    setIsChecked(false);
    setIsShowAnswers(false);
  };
  return (
    <div className="max-w-md mx-auto bg-white">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="answers">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-2 p-4 rounded-lg transition-colors ${
                snapshot.isDraggingOver ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <p className="font-semibold mb-1 text-black">{index + 1}. {title}</p>
              {answers.map((answer, index) => (
                <Draggable
                  key={answer.correctOrder}
                  draggableId={answer.correctOrder}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 py-1 bg-white text-sm border border-gray-200 rounded-lg shadow-sm cursor-move ${
                        snapshot.isDragging
                          ? "shadow-lg rotate-2 scale-105"
                          : "hover:shadow-md"
                      }
                      ${
                        answer.status === "correct" &&
                        "bg-green-100 border-green-300"
                      }
                      ${
                        answer.status === "incorrect" &&
                        "bg-red-100 border-red-300"
                      }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <p className="flex-1 text-black">{answer.content}</p>
                        {isChecked && isShowAnswers && (
                          <p className="text-black">{answer.correctOrder}</p>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="px-4 pb-2 flex justify-end gap-2">
        {isChecked && <Button onClick={reset}>Reset</Button>}
        {isChecked && (
          <Button onClick={toggleAnswer}>
            {!isShowAnswers ? "Show Answers" : "Hidden Answers"}
          </Button>
        )}
        <Button onClick={checkAnswer}>Check</Button>
      </div>
    </div>
  );
}

// Export the component with SSR disabled to prevent hydration issues
const DragDrop = dynamic(() => Promise.resolve(DragDropComponent), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Loading...</h2>
      <div className="space-y-2">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  ),
});

export default DragDrop;
