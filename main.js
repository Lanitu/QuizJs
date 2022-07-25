const questions = [
	{
		question: "What language works in the browser?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does it mean CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does it mean HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "What year was it created JavaScript?",
		answers: ["1996", "1995", "1994", "All answers doesn't correct"],
		correct: 2,
	},
];

// Found elements
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Quiz variables
let score = 0;
let questionIndex = 0;

// Calling the function to clear the page and generate a question
clearPage();
showQuestions();
submitBtn.onclick = checkAnswer;

// Cleaning up HTMl
function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// Question render 
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

// Check question
function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']){
		score++;
	}

	// Last or no question in the quiz
	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestions();
		return;
	} else {
		clearPage();
		showResults();
	}

	// If doesn't check
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	};
}

// Show results
function showResults(){
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;

	// Answer options
	if(score === questions.length){
		title = 'Congratulations!';
		message = 'You answered all questions correctly!';
	}else if((score * 100) / questions.length >= 50 ){
		title = 'Not a bad result!';
		message = 'You gave more than half of the correct answers!';
	}else{
		title = 'Need to get more knowledge and try more(';
		message = 'So far, less than half of the correct answers!';
	}

	// Results
	let result = `${score} из ${questions.length}`;

	// Final answer
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result', result);

	headerContainer.innerHTML = finalMessage;

	// Button replacement
	submitBtn.blur();
	submitBtn.innerHTML = 'Restart';
	submitBtn.onclick = () =>{history.go()};
}