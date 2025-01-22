/*
MIT License
Copyright (c) [2025] [Luiz-hh]
Permissão para usar, copiar, modificar e distribuir este software para qualquer
propósito com ou sem taxa é concedida, desde que o aviso acima seja incluído
em todas as cópias ou partes substanciais do software.
O software é fornecido "como está", sem qualquer garantia de qualquer tipo.
*/

// Cria os seletores.
const $txtInicio = document.querySelector(".inicio");
const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $answers = document.querySelectorAll(".answer");

const $prevQuestionButton = document.createElement("button"); // Criando botão de voltar
$prevQuestionButton.classList.add("prev-question", "hide");
$prevQuestionButton.textContent = "Voltar";
$questionsContainer.parentNode.insertBefore(
  $prevQuestionButton,
  $questionsContainer
);

const $nextQuestionButton = document.createElement("button");
$nextQuestionButton.classList.add("next-question", "hide");
$nextQuestionButton.textContent = "Próxima";
$questionsContainer.parentNode.insertBefore(
  $nextQuestionButton,
  $questionsContainer
);

const $finishQuizButton = document.querySelector(".finish-quiz");

let currentQuestionIndex = 0;
let totalCorrect = 0;

// Criar o contêiner para os botões de navegação
const $controlsContainer = document.querySelector(".controls-container");
// Adicionar os botões ao contêiner
$controlsContainer.appendChild($nextQuestionButton);
$controlsContainer.appendChild($prevQuestionButton);

// Adiciona um evento de click ao botão.
$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);
$prevQuestionButton.addEventListener("click", goToPreviousQuestion);
$finishQuizButton.addEventListener("click", displayNextQuestion);

// Função para iniciar o Jogo.
function startGame() {
  $txtInicio.classList.add("hide");
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  $nextQuestionButton.classList.remove("hide");
  displayNextQuestion();
}

// Função para ir á PRÓXIMA pergunta.
function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  $questionText.textContent = questions[currentQuestionIndex].question;

  // Criar respostas com radio buttons
  questions[currentQuestionIndex].answers.forEach((answer, index) => {
    const newAnswerContainer = document.createElement("div");
    const newAnswer = document.createElement("input");
    const newLabel = document.createElement("label");

    newAnswer.type = "radio";
    newAnswer.name = "answer"; // Garantir que apenas uma resposta seja selecionada por vez
    newAnswer.id = `answer-${currentQuestionIndex}-${index}`;
    newAnswer.value = answer.text;
    newLabel.setAttribute("for", newAnswer.id);
    newLabel.textContent = answer.text;

    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }

    newAnswerContainer.appendChild(newAnswer);
    newAnswerContainer.appendChild(newLabel);
    $answersContainer.appendChild(newAnswerContainer);

    newAnswer.addEventListener("change", selectAnswer);
  });

  // Mostrar os botões de navegação
  $nextQuestionButton.classList.remove("hide");
  $prevQuestionButton.classList.remove("hide");

  // Se for a última pergunta, mostre o botão de finalizar
  if (currentQuestionIndex === questions.length - 1) {
    $finishQuizButton.classList.remove("hide");
    $prevQuestionButton.classList.remove("hide");
    $nextQuestionButton.classList.add("hide");
  }
}

// Função para ir à pergunta anterior
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    resetState();
    displayNextQuestion();
  }
}

// Função para refazer o Quiz
function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $finishQuizButton.classList.add("hide");
  $nextQuestionButton.classList.add("hide");
  $prevQuestionButton.classList.add("hide");
}

//Função para identificar e somar questões corretas e incorretas.
function selectAnswer(event) {
  const answerClicked = event.target;

  // Verifica se a resposta está correta.
  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  // Desabilita todas as respostas e marca as corretas e incorretas.
  document.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.disabled = true;
  });

  if (currentQuestionIndex < questions.length - 1) {
    $nextQuestionButton.classList.remove("hide");
  } else {
    $finishQuizButton.classList.remove("hide");
  }

  $prevQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

// Função para mostrar a porcentagem de acertos e erros.
function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 80:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `;
}

// ARRAY de perguntas e respostas.
const questions = [
  {
    question:
      "1 - Quais foram as principais inovações técnicas que Turing implementou em sua máquina para decifrar os códigos da Enigma?",
    answers: [
      { text: " Ela usava painéis solares para funcionar.", correct: false },
      {
        text: "Ela podia ser operada manualmente sem eletricidade.",
        correct: false,
      },
      {
        text: " Ela automatizava a verificação de milhares de combinações por segundo.",
        correct: true,
      },
      {
        text: "Ela traduzia as mensagens diretamente para inglês sem intervenção humana.",
        correct: false,
      },
    ],
  },
  {
    question:
      "2 - Como o filme aborda os temas de discriminação e aceitação através da história de Alan Turing?",
    answers: [
      {
        text: "Mostrando Turing recebendo prêmios internacionais por seu trabalho.",
        correct: false,
      },
      {
        text: "Focando apenas em seu sucesso profissional e ignorando sua vida pessoal.",
        correct: false,
      },
      {
        text: "Explorando a perseguição que ele sofreu por ser homossexual e como isso afetou sua vida.",
        correct: true,
      },
      {
        text: "Apresentando Turing como um espião que vive em segredo.",
        correct: false,
      },
    ],
  },
  {
    question:
      "3 - Por que o trabalho de decifração dos códigos da Enigma permaneceu um segredo por tanto tempo após o fim da guerra?",
    answers: [
      {
        text: " Para continuar usando as técnicas de decifração em futuras guerras.",
        correct: true,
      },
      {
        text: "Para proteger a identidade dos criptoanalistas.",
        correct: false,
      },
      {
        text: "Para evitar que outros países soubessem da tecnologia utilizada.",
        correct: false,
      },
      {
        text: " Para proteger os segredos comerciais da Alemanha.",
        correct: false,
      },
    ],
  },
  {
    question:
      "4 - Como o trabalho de Turing e sua equipe influenciou o resultado da Segunda Guerra Mundial?",
    answers: [
      { text: "Foi usado apenas para espionagem interna.", correct: false },
      { text: "Não teve impacto significativo na guerra.", correct: false },
      { text: "Prolongou a guerra em pelo menos dois anos.", correct: false },
      {
        text: "Ajudou a encurtar a guerra e salvar milhões de vidas ao antecipar os movimentos alemães.",
        correct: true,
      },
    ],
  },
  {
    question:
      "5 - Quais foram as consequências legais e sociais que Turing enfrentou devido à sua orientação sexual?",
    answers: [
      {
        text: "Ele foi promovido a chefe da equipe de criptoanálise.",
        correct: false,
      },
      {
        text: "Ele foi preso e condenado por 'indecência grave'.",
        correct: true,
      },
      {
        text: "Ele recebeu um prêmio de reconhecimento público.",
        correct: false,
      },
      { text: "Ele foi nomeado ministro da Defesa.", correct: false },
    ],
  },
  {
    question:
      "6 - Por que a criação de Turing, a máquina que decifrava a Enigma, é considerada um precursor dos computadores modernos?",
    answers: [
      {
        text: "Porque ela era portátil e usada em campo de batalha.",
        correct: false,
      },
      {
        text: "Porque ela tinha uma interface gráfica como os computadores modernos.",
        correct: false,
      },
      {
        text: "Porque ela automatizava a solução de problemas complexos usando algoritmos",
        correct: true,
      },
      {
        text: "Porque ela era usada principalmente para comunicações de rádio.",
        correct: false,
      },
    ],
  },
  {
    question:
      "7 - Como Joan Clarke contribuiu para o sucesso da equipe de criptoanalistas liderada por Alan Turing?",
    answers: [
      {
        text: "Ela era uma talentosa criptoanalista que ajudou a resolver complexos problemas matemáticos.",
        correct: true,
      },
      {
        text: "Ela inventou a máquina que substituiu a Enigma.",
        correct: false,
      },
      {
        text: "Ela supervisionou a logística militar na Bletchley Park.",
        correct: false,
      },
      {
        text: "Ela foi responsável por desenvolver o código de batalha alemão.",
        correct: false,
      },
    ],
  },
  {
    question:
      "8 - Qual foi o principal desafio enfrentado por Alan Turing e sua equipe ao tentar decifrar os códigos da máquina Enigma?",
    answers: [
      {
        text: "Decifrar as mensagens sem acesso direto à máquina Enigma.",
        correct: false,
      },
      {
        text: "Desvendar os segredos dos planos de batalha dos Aliados.",
        correct: false,
      },
      {
        text: "Construir uma máquina que pudesse testar todas as combinações possíveis dos códigos da Enigma.",
        correct: true,
      },
      {
        text: "Convencer os militares a adotarem táticas de guerra diferentes.",
        correct: false,
      },
    ],
  },
];
