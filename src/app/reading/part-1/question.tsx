"use client";

import { useMemo, useState } from "react";
import type { Question } from "./page";

interface QuestionProps {
  order: number;
  question: Question;
  id: number;
  onAnswerSubmit: (
    questionId: number,
    isCorrect: boolean,
    selectedAnswer: string,
    correctAnswer: string
  ) => void;
}

function QuestionItem({ question, order, id, onAnswerSubmit }: QuestionProps) {
  // Deterministic shuffle based on question ID to prevent hydration mismatch
  const randomAnswers = useMemo(
    () => question.answers.sort(() => Math.random() - 0.5),
    [question, id]
  );
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // Prevent changing after submission

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const selectedAnswerObj = randomAnswers[answerIndex];
    const correctAnswerObj = question.answers.find((a) => a.isCorrect);

    onAnswerSubmit(
      id,
      selectedAnswerObj.isCorrect,
      selectedAnswerObj.content,
      correctAnswerObj?.content || ""
    );
  };

  return (
    <div className="bg-white p-6 shadow-md border border-gray-200">
      {/* Question Text */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {order + 1}. {question.question}
        </h3>
      </div>

      {/* Answer Choices */}
      <div className="space-y-3">
        {randomAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = answer.isCorrect;

          let buttonClass =
            "w-full text-left p-4 py-2 rounded-lg border-2 transition-all duration-200 ";

          if (!showFeedback) {
            // Before submission
            buttonClass += isSelected
              ? "border-blue-500 bg-blue-50 text-blue-800"
              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100 text-gray-700";
          } else {
            // After submission - show correct/incorrect
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isSelected && !isCorrect) {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}. {answer.content}
                </span>
                {showFeedback && (
                  <span className="text-sm">
                    {isCorrect && "✓ Correct"}
                    {isSelected && !isCorrect && "✗ Incorrect"}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionItem;
