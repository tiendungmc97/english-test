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
    <div className="max-w-[1640px] mx-auto px-6 py-8 bg-pink-50 min-h-screen">
      <div className="flex gap-6">
        {/* Reading Passage */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl border-2 border-pink-200 mb-8">
          <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 text-white px-6 py-5 rounded-t-3xl flex items-center gap-3 shadow-pink-200 shadow">
            <span className="inline-block w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 text-lg font-bold shadow-inner shadow-pink-100 animate-bounce">💖</span>
            <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-pink-200">{question.title}</h2>
          </div>
          <div className="p-6">
            <div className="prose max-w-none">
              {question.questions.map((item: any, index: number) => (
                <div key={index} className="mb-3 last:mb-0">
                  <p className="text-md leading-relaxed text-pink-700 font-medium flex items-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 font-bold text-base rounded-full mr-3 border-2 border-pink-300 shadow-pink-100 shadow-inner">
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
        <div className="w-[600px] bg-white rounded-3xl shadow-2xl border-2 border-pink-200">
          <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 text-white px-6 py-5 rounded-t-3xl flex items-center gap-2 shadow-pink-200 shadow">
            <svg
              className="w-6 h-6 text-pink-100"
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
            <h2 className="text-2xl font-extrabold flex items-center gap-2 drop-shadow-pink-200">
              Answer the Questions
              <span className="ml-1 animate-bounce">🎀</span>
            </h2>
          </div>
          <div className="p-6 bg-pink-50 rounded-b-3xl">
            <div className="grid gap-4">
              {randomListAnswers.map((item: any, index: number) => {
                const isCorrect = showResults ? getAnswerResult(index) : null;
                const userAnswer = userAnswers[index];
                const correctAnswer = item.match;

                return (
                  <div
                    key={index}
                    className={`border-2 rounded-2xl p-3 transition-colors flex items-center gap-3 shadow-sm ${showResults
                        ? isCorrect
                          ? "border-pink-400 bg-pink-100"
                          : userAnswer
                            ? "border-red-300 bg-red-50"
                            : "border-pink-200 bg-pink-50"
                        : "border-pink-200 hover:border-pink-400 bg-white"
                      }`}
                  >
                    <div className="flex-1">
                      <p className="text-md font-semibold text-pink-700 flex items-center gap-2">
                        <span className="inline-block w-6 h-6 bg-pink-200 text-pink-600 rounded-full text-center font-bold shadow-inner shadow-pink-100">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {item.title}
                      </p>
                      {showResults && (
                        <div className="text-sm flex gap-2 mt-1">
                          {userAnswer && (
                            <p
                              className={`${isCorrect ? "text-pink-600" : "text-red-500"
                                } font-bold`}
                            >
                              Your answer: {userAnswer} {isCorrect ? "🌸" : "❌"}
                            </p>
                          )}
                          {!isCorrect && userAnswer && (
                            <p className="text-pink-500 font-semibold">
                              Correct: {correctAnswer}
                            </p>
                          )}
                          {!userAnswer && (
                            <p className="text-pink-400 font-semibold">
                              Not answered. Correct: {correctAnswer}
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
                      className={`px-4 py-2 border-2 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white text-pink-700 shadow-sm hover:border-pink-300 transition-colors text-base font-semibold ${isSubmitted ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                    >
                      <option value="" disabled className="text-pink-300">
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
            <div className="mt-6">
              {showResults && (
                <div className="mb-3 p-5 bg-pink-100 border-2 border-pink-300 rounded-2xl shadow-pink-100 shadow flex items-center gap-4">
                  <svg
                    className="w-7 h-7 text-pink-400"
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
                    <h3 className="text-lg font-extrabold text-pink-700">
                      Results
                    </h3>
                    <p className="text-pink-600 font-semibold">
                      You scored {getScore().correct} out of{" "}
                      {getScore().total} questions (
                      {Math.round(
                        (getScore().correct / getScore().total) * 100
                      )}
                      %)
                    </p>
                  </div>
                  <span className="ml-auto text-2xl animate-bounce">🎉</span>
                </div>
              )}

              <div className="flex justify-center gap-4">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 hover:from-pink-500 hover:to-pink-600 disabled:from-pink-200 disabled:to-pink-200 disabled:cursor-not-allowed text-white font-extrabold py-3 px-10 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-pink-200 text-lg tracking-wide"
                  >
                    Submit Answers 💌
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserAnswers({});
                      setIsSubmitted(false);
                      setShowResults(false);
                    }}
                    className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-extrabold py-3 px-10 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-200 text-lg tracking-wide"
                  >
                    Try Again 💗
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
