const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные опроса
let score = 0;
let questionIndex = 0;

//Вызов функции очистки страницы и генерации вопроса
clearPage();
showQuestions();
submitBtn.onclick = checkAnswer;

// Очищаем html
function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// Рендер вопроса 
function showQuestions() {
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	headerContainer.innerHTML = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']){
		
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;		
	
		const answerHTML = questionTemplate
				.replace('%answer%',answerText)
				.replace('%number%', answerNumber)

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	}

	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestions();
		return;
	} else {
		clearPage();
		showResults();
	}

	// Если не выбран
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	};
}

function showResults(){
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;

	//Варианты ответов
	if(score === questions.length){
		title = 'Поздравляю!';
		message = 'Вы ответили верно на все вопросы!';
	}else if((score * 100) / questions.length >= 50 ){
		title = 'Не плохой результат!';
		message = 'Вы дали более половины правильных ответов!';
	}else{
		title = 'Стоит постараться(';
		message = 'Пока меньше половины правильных ответов!';
	}

	// Результаты
	let result = `${score} из ${questions.length}`;

	// Финальный ответ
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result', result);

	headerContainer.innerHTML = finalMessage;

	// Замена кнопки
	submitBtn.blur();
	submitBtn.innerHTML = 'Начать занаво';
	submitBtn.onclick = () =>{history.go()};
}