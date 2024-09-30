// Script Site Adivinhação

const apiKey = 'd24459e58cb14678969f264440d354e9' // Chave API para acessar o conteúdo do jogo

let correctGame;

let options = [];

function adivinharGames() {

    fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=150`)

    .then(response => response.json())
    .then(data => {

        const idAleatorio = Math.floor(Math.random() * data.results.length);
        correctGame = data.results[idAleatorio];

        options = [correctGame];

        while (options.length < 6) {
            const randomOption = data.results[Math.floor(Math.random() * data.results.length)];

            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        options.sort(() => Math.random() - 0.5);
        pergunta();
    })

    .catch(error => console.error('Erro', error));
};

function pergunta() { // Função 

    document.getElementById('pergunta').innerHTML = '<h3> Qual é o Jogo? </h3>';
    document.getElementById('jogo_img').src = correctGame.background_image;
    document.getElementById('jogo_img').style.display = 'block';
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ' ';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.name;
        button.classList.add('opcoes', 'glow-on-hover');
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
};

function checkAnswer(selected) { // Função para checar se a opção selecionada está correta

    const resultDiv = document.getElementById('result');
    
    if (selected.id === correctGame.id) {
        resultDiv.innerHTML = `<h4 style="color:#32CD32"> CORRETO!!! </h4> 
                               <br/> 
                               <img src="img/pinkiepie1.gif" alt="pinkie" class="pinkie">`;
    } else {
        resultDiv.innerHTML = `<h4 style="color:#FF0000"> INCORRETO!!! O jogo era: ${correctGame.name} </h4> 
                               <br/> 
                               <img src="img/pinkiepie2.gif" alt="pinkie" class="pinkie">`;
    }

    document.getElementById('proximo_jogo').style.display = 'block';
};

document.getElementById('proximo_jogo').onclick = () => {
    
    document.getElementById('result').innerHTML = '';
    document.getElementById('proximo_jogo').style.display = 'none';
    
    adivinharGames();
};

adivinharGames();