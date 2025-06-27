"use client";

import { dataReadingPart1 } from "@/data/reading/part-1";
import { Drawer } from "antd";
import { useState } from "react";
import QuestionItem from "./question";

export interface Answer {
  content: string;
  isCorrect: boolean;
  status?: "correct" | "incorrect";
}
export interface Question {
  question: string;
  id: number;
  answers: Answer[];
}

interface QuizResult {
  questionId: number;
  question: string;
  isCorrect: boolean;
  selectedAnswer: string;
  correctAnswer: string;
}

function Part1() {
  const data = dataReadingPart1;

  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSubmit = (
    questionId: number,
    isCorrect: boolean,
    selectedAnswer: string,
    correctAnswer: string
  ) => {
    const question = data.find((item) => item.id === questionId);

    const newResult: QuizResult = {
      questionId,
      question: question?.question || "",
      isCorrect,
      selectedAnswer,
      correctAnswer,
    };

    setQuizResults((prev) => {
      const filtered = prev.filter((r) => r.questionId !== questionId);
      return [...filtered, newResult].sort(
        (a, b) => a.questionId - b.questionId
      );
    });
  };

  const totalQuestions = dataReadingPart1.length;
  const totalCorrect = quizResults.filter((r) => r.isCorrect).length;
  const wrongAnswers = quizResults.filter((r) => !r.isCorrect);
  const answeredQuestions = quizResults.length;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Questions */}
        {dataReadingPart1.map((item: Question, index: number) => (
          <QuestionItem
            question={item}
            id={item.id}
            key={item.id}
            order={index}
            onAnswerSubmit={handleAnswerSubmit}
          />
        ))}
        {/* Drawer Button */}
        <button
          onClick={() => setShowResults(true)}
          className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Show Progress
        </button>

        {/* Drawer Panel using antd */}
        <Drawer
          title={
            <span className="text-2xl font-bold text-gray-800">
              Part 1 - Reading Test
            </span>
          }
          placement="right"
          closable={true}
          onClose={() => setShowResults(false)}
          open={showResults}
          width={400}
          className="custom-ant-drawer"
          bodyStyle={{ padding: 0 }}
        >
          <div className="overflow-y-auto p-6">
            {/* Progress and Score Display */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-blue-800">
                  Progress:
                </span>
                <span className="text-sm text-blue-600">
                  {answeredQuestions}/{totalQuestions} questions answered
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answeredQuestions / totalQuestions) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-green-600">
                  Correct: {totalCorrect}/{answeredQuestions}
                </span>
                <span className="text-lg font-semibold text-red-600">
                  Wrong: {wrongAnswers.length}/{answeredQuestions}
                </span>
              </div>
              {answeredQuestions > 0 && (
                <div className="mt-2 text-center">
                  <span className="text-lg font-bold text-gray-700">
                    Score:{" "}
                    {Math.round((totalCorrect / answeredQuestions) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Wrong Answers List */}
            {wrongAnswers.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  Wrong Answers Review:
                </h3>
                <div className="space-y-4">
                  {wrongAnswers.map((result) => (
                    <div
                      key={result.questionId}
                      className="bg-white p-4 rounded-lg border border-red-200"
                    >
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          Question {result.questionId + 1}:
                        </span>
                        <p className="text-gray-800 font-medium">
                          {result.question}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <span className="text-red-500 mr-2">✗</span>
                          <span className="text-red-700">
                            Your answer:{" "}
                            <strong>{result.selectedAnswer}</strong>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-green-700">
                            Correct answer:{" "}
                            <strong>{result.correctAnswer}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Part1;
