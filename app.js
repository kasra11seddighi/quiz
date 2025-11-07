const questions = [
  {
    id: 1,
    title: "تگ <a> در HTML برای چه کاری استفاده می‌شود؟",
    options: ["نمایش تصویر", "ایجاد لینک", "تعریف جدول"],
    answer: "ایجاد لینک",
  },
  {
    id: 2,
    title: "کدام ویژگی در CSS برای تغییر رنگ متن استفاده می‌شود؟",
    options: ["font-size", "color", "background-color"],
    answer: "color",
  },
  {
    id: 3,
    title: "کدام متد در جاوااسکریپت برای تبدیل رشته به عدد صحیح است؟",
    options: ["parseInt", "toString", "split"],
    answer: "parseInt",
  },
  {
    id: 4,
    title: "کدام دستور برای ایجاد شاخه جدید در Git استفاده می‌شود؟",
    options: ["git merge", "git branch", "git commit"],
    answer: "git branch",
  },
  {
    id: 5,
    title: "کدام یک از این زبان‌ها فقط در سمت کلاینت اجرا می‌شود؟",
    options: ["PHP", "JavaScript", "Python"],
    answer: "JavaScript",
  },
  {
    id: 6,
    title: "کدام ویژگی در CSS باعث حرکت دادن عنصر می‌شود؟",
    options: ["transition", "margin", "z-index"],
    answer: "transition",
  },
  {
    id: 7,
    title: "کدام متد آرایه در جاوااسکریپت برای فیلتر کردن استفاده می‌شود؟",
    options: ["map", "filter", "reduce"],
    answer: "filter",
  },
  {
    id: 8,
    title: "کدام یک از این‌ها سیستم کنترل نسخه است؟",
    options: ["Docker", "Git", "Node.js"],
    answer: "Git",
  },
  {
    id: 9,
    title: "کدام تگ برای تعریف فرم در HTML استفاده می‌شود؟",
    options: ["<form>", "<input>", "<div>"],
    answer: "<form>",
  },
  {
    id: 10,
    title: "کدام متد در جاوااسکریپت برای اجرای کد پس از زمان مشخصی است؟",
    options: ["setTimeout", "setInterval", "clearTimeout"],
    answer: "setTimeout",
  },
];

const questionTitle = document.querySelector(".question");
const questionsOptionsContainer = document.querySelector(".questions");
const currentQuestionElem = document.querySelector(".current");
const totalQuestionsElem = document.querySelector(".total");
const nextQuestionsBtn = document.querySelector(".next");
const resultButton = document.querySelector(".result-button");
const modal = document.querySelector(".modal-screen");
const finalResultText = document.querySelector(".final-result");
const resultStatus = document.querySelector(".result");
const closeBtn = document.querySelector(".close");
const continueBtn = document.querySelector(".continue");

let currentQuestionIndex = 0;
let score = 0;

totalQuestionsElem.innerHTML = questions.length;

function showQuestion() {
  const question = questions[currentQuestionIndex];

  questionTitle.innerHTML = question.title;
  currentQuestionElem.innerHTML = currentQuestionIndex + 1;

  questionsOptionsContainer.innerHTML = "";

  question.options.forEach(function (option) {
    const randomId = Math.floor(Math.random() * 1000);

    questionsOptionsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <article class="quest option">
          <input type="radio" value="${option}" name="questbox" class="answer-option" id="quest-${randomId}" />
          <label for="quest-${randomId}" class="answer-title">${option}</label>
        </article>
      `
    );
  });

  setActiveOnOption();
}

function setActiveOnOption() {
  const options = document.querySelectorAll(".option");

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      const selectedOption = document.querySelector(".selected");

      if (selectedOption) {
        selectedOption.classList.remove("selected");
      }

      option.classList.add("selected");
    });
  });
}

function checkAnswer() {
  const question = questions[currentQuestionIndex];
  const answerOptions = document.querySelectorAll(".answer-option");

  answerOptions.forEach(function (answerOption) {
    if (answerOption.checked && answerOption.value === question.answer) {
      score++;
    }
  });
}

function showScore() {
  finalResultText.innerHTML = `شما تونستید ${score} پاسخ صحیح از ${questions.length} سوال بدید.`;

  if (score > 3) {
    resultStatus.classList.remove("bad");
    resultStatus.classList.add("good");
    resultStatus.innerHTML = "خوب";
  } else {
    resultStatus.classList.remove("good");
    resultStatus.classList.add("bad");
    resultStatus.innerHTML = "بد";
  }

  modal.classList.remove("hidden");
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  modal.classList.add("hidden");
  nextQuestionsBtn.style.display = "inline-block";
  resultButton.classList.add("hidden");
  resultStatus.classList.remove("good", "bad");
  showQuestion();
}

nextQuestionsBtn.addEventListener("click", function () {
  checkAnswer();
  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length - 1) {
    nextQuestionsBtn.style.display = "none";
    resultButton.classList.remove("hidden");
  }

  showQuestion();
});

resultButton.addEventListener("click", function () {
  checkAnswer();
  showScore();
});

closeBtn.addEventListener("click", resetQuiz);
continueBtn.addEventListener("click", resetQuiz);