self.onmessage = function (e) {
  const { questions, answers, correctAnswers } = e.data;

  const result = questions.map((question) => {
    const userAnswers = answers[question.id] ?? [];
    const correct = correctAnswers[question.id] ?? [];

    const isCorrect = correct.length === userAnswers.length &&
      correct.every((a) => userAnswers.includes(a));

    return {
      id: question.id,
      question: question.text,
      userAnswer: userAnswers.join(', '),
      isCorrect
    };
  });

  self.postMessage(result);
};
