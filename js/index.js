// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления



// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);




/*** ОТОБРАЖЕНИЕ ***/



// отрисовка карточек
const display = () => {
  while (fruitsList.firstChild) fruitsList.removeChild(fruitsList.firstChild);

  for (let i = 0; i < fruits.length; i++) {
    let li = document.createElement('li'); 
    let div = document.createElement('div');
    let fruitsLi = fruitsList.appendChild(li);
    let fruit_info = fruitsLi.appendChild(div);
    let indexOfFruit = fruits.indexOf(fruits[i]);
    fruit_info.appendChild(document.createTextNode('Index:' + indexOfFruit));
    div.className = ('fruit__info');
    div.classList.add('fruit__info');
    li.className = 'fruit__item';
    li.classList.add('fruit__item'); 
      if(fruits[i].color === 'фиолетовый'){
      li.classList.add('fruit_violet')
    }
      if(fruits[i].color === 'зеленый'){
      li.classList.add('fruit_green')
    }
      if(fruits[i].color === 'розово-красный'){
      li.classList.add('fruit_carmazin')
    }
      if(fruits[i].color === 'желтый'){
      li.classList.add('fruit_yellow')
    }
      if(fruits[i].color === 'светло-коричневый'){
      li.classList.add('fruit_lightbrown')
    }




    for (k = 0; k < Object.keys(fruits[i]).length; k++){
      let div2 = document.createElement('div');
      let divFruit = fruit_info.appendChild(div2);
      const fruitsKey = Object.keys(fruits[i])[k];
      const fruitsVal = Object.values(fruits[i])[k];
      divFruit.appendChild(document.createTextNode(fruitsKey + ': ' + fruitsVal));
    }
};


   
  
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
    
// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  while (fruits.length > 0) {
    let randomElement = getRandomInt(0, fruits.length - 1);
    let getElemFromFruits = fruits.splice(randomElement, 1)[0];
    result.push(getElemFromFruits);
    console.log(result);
  }
  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    alert(`После перемешивания массива все элементы остались на своих местах!`)
  } else {
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let mixedFruits = fruits.filter((item) => {
    const maxweight = document.querySelector('.maxweight__input');
    const minweight = document.querySelector('.minweight__input');  
    return item.weight >= minweight.value && item.weight <= maxweight.value;  
  });
  fruits = mixedFruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки



const comparationColor = (a, b) => {
  const priority = ['желтый', 'зеленый', 'фиолетовый', 'светло-коричневый', 'розово-красный']
  const priority1 = priority.indexOf(a.color);
  const priority2 = priority.indexOf(b.color);
  console.log(priority1 > priority2);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
      for (let j = 0; j < n-1-i; j++) { 
        if (comparation(arr[j], arr[j+1])) { 
            let temp = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = temp; 
        }
      }
    }   
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} мс`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  
  sortTimeLabel.textContent = 'сортировка...';
  setTimeout(() => {  
    const sort = sortAPI[sortKind];
    sortAPI.startSort(sort, fruits, comparationColor);
    display();
    sortTimeLabel.textContent = sortTime;
  }, 1000);

});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
