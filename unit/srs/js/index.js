/*
var total = 0;
var resultArea = document.getElementById("result");
for (var i = 0; i < 16; i++) {
    if (i == 8 || i == 13) { continue; }

var first = Math.floor((Math.random() * 6) + 1); 
var second = Math.floor((Math.random() * 6) + 1); 

resultArea.innerHTML += "Первая кость: " + first + " Вторая кость: " + second +  "<br>";
    if ( first === second ) {
        resultArea.innerHTML += "Выпал дубль. Число " + first + "<br>";
    } else if (first < 3 && second > 4){
        resultArea.innerHTML += "Большой разброс между костями. Разница составляет " + (second - first) + "<br>";
    }
    total += first + second;
 }
resultArea.innerHTML += "Результат " + total + "<br>";
resultArea.innerHTML += (total > 100 ) ? " Победа, вы набрали очков " + "<br>" : " Вы проиграли, у вас очков "+ "<br>";
*/
/*
Домашнее задание №1:
Цель задания: научиться базовым приемам работы с функциями.
Названия всех функций даны для справки. Вы можете придумать свои.

Все то что было реализовано в прошлом задании необходимо перевести на работу с функциями.
1.
Создать главную функцию run() в которой будет выполняться основной код (цикл)
Так же эта функция должна содержать в себе вызовы всех остальных функций.
2.
Сделать функцию для получения случайных чисел (getRndNumber).
Значение каждой переменной, в которую мы записываем, какая выпала кость получать с помощью вызова этой функции
3.
Сделать одну функцию которая будет печатать строки (print). Она должна принимать только один аргумент. Строку текста которую надо напечатать.
(если у вас выводите данные не только в div с id result а возможно еще в какой то другой div, тогда функция должна принимать 2 аргумента: id и Строку)
4.
Сделать функцию для определения совпадений. (isNumbersEqual). Она должна содержать в себе проверку на совпадение и внутри себя вызывать функцию для печать данных в HTML (print)
5.
Сделать функцию для определения разницы. (isBigDifference). Она должна содержать в себе соответствующую проверку и внутри себя вызывать функцию для печать данных в HTML (print)
6.
Сделать функцию для вычисления результата total. Функция должна вычислить результат и вернуть его. То есть вернуть строку. Полученное из функции значение необходимо потом напечатать с помощью функции (print)
*/
/*
var total = 0;
var resultArea = document.getElementById("result");

function getRndNumbers() {
    return Math.floor((Math.random() * 6) + 1);
}
function showTextInResult(text) {
    resultArea.innerHTML += text;
}
function showNumbInResult(first, second) {
    showTextInResult("Первая кость: " + first + " Вторая кость: " + second + "<br>");
}
function isNumbEqual(first, second) {
    if (first === second) {
        showTextInResult("Выпал дубль. Число " + first + "<br>");
    }
}
function isNumbDiff(first, second) {
    if (first < 3 && second > 4) {
        showTextInResult("Большой разброс между костями. Разница составляет " + (second - first) + "<br>");
    }
}
function getFinalNumb(total) {
    return showTextInResult("Результат " + total + "<br>");
}
function showWhoWin(total) {
    return (total > 100) ? 'Победа, вы набрали очков ' + total + "<br>" : 'Вы проиграли, у вас очков ' + total + "<br>";
}
function runGame() {
    for (var i = 0; i < 16; i++) {
        if (i == 8 || i == 13) { continue; }

        var first = getRndNumbers();
        var second = getRndNumbers();

        showNumbInResult(first, second);
        isNumbEqual(first, second);
        isNumbDiff(first, second);
        total += first + second;
    }
    getFinalNumb(total);
    showTextInResult(showWhoWin(total));
}
runGame();
*/
/*
Домашнее задание №2: «Камень ножницы бумага»
Цель задания: научиться использовать функции, реализовывать алгоритмы похожие на реальные задачи.
Названия всех функций даны для справки. Вы можете придумать свои.

Условие.

У вас есть 2 игрока которые играют в игру. У каждого может выпасть камень, ножницы или бумага.
На самом деле у вас есть функция (getPlayerResult) которая возвращает случайные числа от 1 до 3
1 — камень
2 — ножницы
3 — бумага
В заготовке реализован следующий функционал.
По нажатии на кнопку получаем случайное число и выводим его в соответствующий div элемент.

1.
Вместо того чтоб выводить на екран случайное число как в примере вам необходимо
добавить функцию (getNameById) которая будет принимать это число и возвращать слово «камень», «ножницы», или «бумага»
согласно словарю указанному выше.

2.
На экран вывести полученную текстовую строку для каждого из игроков.

3.
Написать функцию (determineWinner), которая будет принимать два числа, предварительно полученные в функции getPlayerResult и принимать решение который из игроков выиграл.

4.
Результатом выполнения функции determineWinner должно быть число, номер игрока, который выиграл.
То есть эта функция должна возвращать номер игрока который выиграл

5.
Функция printResult должна принять номер игрока, который выиграл и напечатать в div Id result текстовое сообщение типа: «выиграл первый игрок» номер игрока надо вывести словами.
*/
/*
var btn = document.getElementById("play");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var result = document.getElementById("result");

function getPlayerResult() {
    return Math.floor((Math.random() * 3) + 1);
}

function showTextInResult(text) {
    result.innerHTML = text;
}

function getNameById(number) {
    var nameNumbers = ["", "Камень", "Ножницы", "Бумага"];
    return nameNumbers[number];
}

function determineWinner(player1Hand, player2Hand) {
    var winner;
    var battle = +(String(player1Hand) + String(player2Hand));
    switch (battle) {
        case 12:
        case 32:
        case 23:
            winner = 1;
            break;
        case 21:
        case 13:
        case 31:
            winner = 2;
            break;
        case 11:
        case 22:
        case 33:
            winner = 0;
            break;
    }
}

function printResult(winner) {
    switch (winner) {
        case 1:
            showTextInResult("Выйграл первый игрок!" + "</br>");
            break;
        case 2:
            showTextInResult("Выйграл второй игрок!" + "</br>");
            break;
        case 0:
            showTextInResult("Ничья!" + "</br>");
            break;
    }
}


function runGame() {
    var player1Hand = getPlayerResult();
    var player2Hand = getPlayerResult();

    player1.innerHTML = getNameById(player1Hand);
    player2.innerHTML = getNameById(player2Hand);

    printResult(determineWinner(player1Hand, player2Hand));

}
btn.addEventListener("click", runGame);
*/



/*
Домашнее задание:
Цель: потренироваться в работе с массивами и объектами.

ЧИТАТЬ ВНИМАТЕЛЬНО, МНОГО ДЕТАЛЕЙ!

Вам необходимо из массива данных, который находится в файле data.js создать новый выполнив серию преобразований.
Новый массив объектов необходимо вывести в консоль. Функционал для этого уже есть. Скачайте заготовку и нажмите на кнопку.
Затем откройте консоль.
Файл data.js уже подключен, по этому просто пишите код вашей программы, массив должен быть доступен.

Внимание: если какое то преобразование сделать не удается. Пропускаете его и и двигайтесь дальше.

1.
Задайте переменную в которой укажите сколько элементов вы будете обрабатывать.
В оригинальном массиве 15 элементов. В вашей переменной должно быть число которое показывает сколько элементов будет в новом массиве. Остальные отсекаются.
То есть допустим было 15 а в результирующем будет 7. Остальные отбрасываем.

2.
Используем функцию forEach.
Внутри forEach задаем условие таким образом, чтоб выбирать то количество элементов, которое указано в переменной что мы задали выше.
То есть создаем новый массив объектов с нужным количеством. Остальное отбрасываем.
Кроме того в процессе создания нового массива объектов, избавляемся то ключа id.
То есть в вашем новом массиве не должно быть id в конкретных объектах.
Подсказка:

data.forEach(function(item, index){
    var newArr = [];
    if(count<=index){
        newArr.push({
            name: item.name
            ////.....
        })
    }
})
3.
По новому массиву объектов, полученному с помощю функции forEach проходимся с помощю map

4.
На каждой итерации цикла мы получаем один объект из массива объектов. Берем этот объект и преобразовываем его поля по следующим правилам.
Вам пригодится документация по дате и по стрингам.

5.
Для поля Name: с помощью функций работы со стрингами делаете первую букву большой, остальные маленькие (ДЖИП -> Джип)

6.
Для поля url: добавить перед ним «http://»

7.
Для поля Description: с помощью функций работы со стрингами делаете обрезание до 15 символов. После добавляем многоточие (…) Остальное отбрасывете.

8.
Для поля date: создать объект даты из заданных милисекунд и потом отобразить в виде «2015/07/02 14:15»
Для этого надо открыть документацию по дате. Ссылка есть в конце презентации.
Пример как преобразовывать дату. Можно использовать и другой подход. Главное чтоб он не был более громоздким и сложным.

var date = 1422153200637;
var newDate = function(date){
    var tmpDate = new Date(date);
    return tmpDate.getFullYear() + "/" +
           tmpDate.getMonth() + "/" +
           tmpDate.getDate() + " " +
           tmpDate.getHours() + ":" +
           tmpDate.getMinutes();
};
9.
Для поля params: из значений ключей сформировать стрингу типа «true=>80». Для выполнения задания можно обращаться к полям объект params напрямую.
То есть params.status и params.progress

10.
После всех преобразований функция map вернет вам новый массив, который вы в результате печатаете. Для печати используем отдельную функцию как в прошлых заданиях. То есть вынесете console.log в отдельную функцию.

11.
Пример результата (количество элементов в результате должно быть не два а сколько укажете 
    в переменной):

var data = [{
	url: "http://desktopwallpapers.org.ua/mini/201507/40069.jpg",
	name: "CHEVROLET",
	params : "true=>80",
	description : "be conveyed to ...",
	date : "2015/01/25 14:15"
},{
	url: "http://desktopwallpapers.org.ua/mini/201507/40068.jpg",
	name: "DEWOO",
	params : "true=>88",
	description : "sing color to a...",
	date : 2015/12/18 15:35"
}]
*/
/*
var btn = document.getElementById("play");
// Создание массива
function createArr(data) {
    var count = 5;
    var array = [];
    data.forEach(function(item, index){
        if(count > index){
            array.push({
                url: item.url,
                name: item.name,
                params: item.params,
                description: item.description,
                date: item.date
            });
        }
    });
    return array;   
}
// Изменение регистра
function editName(name) {
    return name[0] + name.substring(1).toLowerCase();    
}
// Добавление "http://"
function editUrl(url) {
    return "http://"+url;    
}

// Обрезаем до 15 символов и добавляем (...)
function editDescription(description) {
    return description.slice(0, 15) + "...";
}
// Настройка отображения времени 
function editData(date) {
        var tmpDate = new Date(date);
        return tmpDate.getFullYear() + "/" +
               tmpDate.getMonth() + "/" +
               tmpDate.getDate() + " " +
               tmpDate.getHours() + ":" +
               tmpDate.getMinutes();
}
// Сформировать стрингу типа «true=>80»
function editParams(params) {
    return params.status + "=>" + params.progress;
}
// Работа с массивом через map
function editArr(arr) {
    var newArr =  arr.map(function(item, index){
        return {
            name: editName(item.name),
            url: editUrl(item.url),
            description: editDescription(item.description),
            date: editData(item.date),
            params: editParams(item.params)    
        }    
    });
    return newArr;  
}

// Вывод массива в консоле 
function print(someText) {
    console.log(someText);
}

function transform() {
    var array = createArr(data);
    var result = editArr(array);
    print(result);
}

btn.addEventListener("click", transform);
*/

