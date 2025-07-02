"use client";
import { useEffect, useState } from "react";

export function QuestionPart3({ question }: { question: any }) {
  const [randomListAnswers, setRandomListAnswers] = useState<any>([]);
  useEffect(() => {
    const randomizeAnswers = question.listAnswers.sort(
      () => Math.random() - 0.5
    );
    setRandomListAnswers(randomizeAnswers);
  }, [question.listAnswers]);

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const getAnswerResult = (index: number) => {
    const correctAnswer = randomListAnswers[index].match;
    const userAnswer = userAnswers[index];
    return userAnswer === correctAnswer;
  };

  const getScore = () => {
    let correct = 0;
    randomListAnswers.forEach((_: any, index: number) => {
      if (getAnswerResult(index)) {
        correct++;
      }
    });
    return { correct, total: randomListAnswers.length };
  };
  return (
    <div className="max-w-[1640px] mx-auto px-6 py-8">
    
      <div className="flex gap-6">
        {/* Reading Passage */}
        <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-xl">
            <h2 className="text-xl font-semibold">{question.title}</h2>
          </div>
          <div className="p-4">
            <div className="prose max-w-none">
              {question.questions.map((item: any, index: number) => (
                <div key={index} className="mb-2 last:mb-0">
                  <p className="text-md leading-relaxed text-gray-800">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 font-bold text-sm rounded-full mr-3">
                      {item.order}
                    </span>
                    {item.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="w-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-t-xl">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Answer the Questions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid gap-3">
              {randomListAnswers.map((item: any, index: number) => {
                const isCorrect = showResults ? getAnswerResult(index) : null;
                const userAnswer = userAnswers[index];
                const correctAnswer = item.match;

                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-2 transition-colors flex items-center gap-2 ${
                      showResults
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : userAnswer
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-md font-medium text-gray-900">
                        {item.title}
                      </p>
                      {showResults && (
                        <div className="text-sm flex gap-2">
                          {userAnswer && (
                            <p
                              className={`${
                                isCorrect ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              Your answer: {userAnswer} {isCorrect ? "✓" : "✗"}
                            </p>
                          )}
                          {!isCorrect && userAnswer && (
                            <p className="text-green-600">
                              Correct answer: {correctAnswer}
                            </p>
                          )}
                          {!userAnswer && (
                            <p className="text-gray-600">
                              Not answered. Correct answer: {correctAnswer}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <select
                      name={`question-${index}`}
                      value={userAnswers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      disabled={isSubmitted}
                      className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 shadow-sm hover:border-gray-400 transition-colors text-sm ${
                        isSubmitted ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      <option value="" disabled className="text-gray-500">
                        Select your answer
                      </option>
                      <option value="A" className="py-2">
                        A
                      </option>
                      <option value="B" className="py-2">
                        B
                      </option>
                      <option value="C" className="py-2">
                        C
                      </option>
                      <option value="D" className="py-2">
                        D
                      </option>
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Submit Button and Results */}
            <div className="mt-4">
              {showResults && (
                <div className="mb-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-900">
                        Results
                      </h3>
                      <p className="text-blue-700">
                        You scored {getScore().correct} out of{" "}
                        {getScore().total} questions correctly (
                        {Math.round(
                          (getScore().correct / getScore().total) * 100
                        )}
                        %)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Submit Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserAnswers({});
                      setIsSubmitted(false);
                      setShowResults(false);
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
