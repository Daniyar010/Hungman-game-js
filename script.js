//Ссылки
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Допустимые слова
let options = {
  fruits: [ "Apple", "Blueberry", "Mandarin", "Pineapple", "Pomegranate", "Watermelon" ],
  animals: [ "Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra" ],
  countries: [ "India", "Hungary", "Kyrgyzstan", "Switzerland", "Zimbabwe", "Dominica" ],
};

//Счетчик
let winCount = 0;
let count = 0;

let chosenWord = "";

//Параметры кнопок
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Блокировка всех кнопок
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Отключение всех опций
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Все кнопки не кликабельные 
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Генератор слов
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Если значение параметра совпадает с содержимым элемента кнопки, то кнопка выделится.
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //Начальное состояние букв скрыто
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Выберите рандомное слово
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //Заменить каждую букву тире
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Отображать каждый элемент
  userInputSection.innerHTML = displayItem;
};

//Начальная функция вызывается при загрузки страницы
const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For - для создания буквенных кнопок
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //[A-Z]
    button.innerText = String.fromCharCode(i);
    
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //Если массив содержит выбранный вами элемент, то выведется на экран за место нижнего тире.
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //Если символ совпадает с символом елемента массива
          if (char === button.innerText) {
            //За место нижнего подчеркивания появится буква
            dashes[index].innerText = char;

            winCount += 1;
            //Если winCount равен длине слова, то есть вы угадали слово тогда выйдет сообщение "Вы выйграли"
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //Блокировка кнопопк
              blocker();
            }
          }
        });
      } else {
        //Счетчик попыток
        count += 1;
        //Для рисования человека
        drawMan(count);
        //Если счетчик попыток равен 6, тогда выйдет сообщение игра окончена, "Вы проиграли"
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable button - не кликабельная кнопка
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  
  let { initialDrawing } = canvasCreator();
  
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //Рисунок линий
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  
  const initialDrawing = () => {
    //Стереть 
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //Нижняя линия
    drawLine(10, 130, 130, 130);
    //Левая линия
    drawLine(10, 10, 10, 131);
    //Большая верхняя линия
    drawLine(10, 10, 70, 10);
    //маленькая верхняя линия
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//Рисунок человека
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//Кнопка новая игра
newGameButton.addEventListener("click", initializer);
window.onload = initializer;