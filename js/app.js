
// превращаем div в input
const input = document.querySelectorAll('.input');
for(let i=0;i<input.length; i++){
    let el = input[i]
    el.setAttribute('contenteditable', 'true');
};

// drop-down input
const drop_down__wraper = document.querySelectorAll('.drop_down__wraper');
for(let i=0;i<drop_down__wraper.length; i++){
    var el = drop_down__wraper[i];
    const drop_down = el.querySelectorAll('.input');
    for (let i=0;i<drop_down.length;i++){
        let e = drop_down[i];
        e.setAttribute('contenteditable', 'false');
        let drop_down__menu = el.querySelector('.drop_down__menu');
        drop_down__menu.style.display = 'none';
        e.onclick = function(){ 
            drop_down__menu.style.display ='block';
            createDropMenuContent();
            chooseYear(drop_down__menu);
        };
    };
};

//создание drop down для года
function createDropMenuContent(){
    let i =0
    const drop_down__years = document.getElementById('drop_down__years');
    function createDivYear(){
        let createdDiv = document.createElement('div');
        createdDiv.innerHTML = i;
        createdDiv.className = 'year';
        return createdDiv;
    };
    // возрастные ограничения по набору людей по анкете через переменные
    // минимальный возраст 
    let minAge = 15;
    // максимальный возраст
    let maxAge = 40;
    // получаем сегодняшнюю дату
    let today = new Date();
    let NowYear = today.getFullYear();
    let minDateBirth = NowYear - minAge;
    let maxDateBirth = NowYear - maxAge;
    for (i = maxDateBirth; i<= minDateBirth; i++){
        drop_down__years.appendChild(createDivYear());
    };
};

// выбор года и закрытие dropdownmenu после выбора
function chooseYear(elF){
    const birthDate = document.getElementById('Birth_date');
    let allYears = document.querySelectorAll('.year');
    for (let i=0; i<allYears.length;i++){
        let oneYear = allYears[i];
        oneYear.addEventListener('click', function(){
            birthDate.innerHTML = oneYear.innerHTML;
            elF.style.display ='none';
        });
    };
};

// превращаем div в checkbox
const checkbox = document.querySelectorAll('.checkbox');
for(let i=0;i<checkbox.length;i++){
    let el = checkbox[i];
    el.setAttribute('onclick','checked()');
};
function checked(){
    let checkboxTarget = event.target;
    if (checkboxTarget.hasAttribute('value')){
        checkboxTarget.removeAttribute('value');
        checkboxTarget.className = 'checkbox';
    }
    else{
        checkboxTarget.setAttribute('value', 'know');
        checkboxTarget.className = 'checkbox checked';
    };

};

// двигаем ползунок
let js_level;
const pointer = document.getElementById('measure__pointer');
const range = document.getElementById('measure__range');
const rangeCover = document.getElementById('range_cover');
let rangeLeftX = range.getBoundingClientRect().left;
pointer.ondragstart = function() {
    return false;
};


// управление js ползунком сенсерно
pointer.ontouchstart = function(e) {
     //отследить нажатие
    moveAt(e);
    //перемещать по экрану
    document.ontouchmove = function(e) {
        moveAt(e);    
    };
    // передвинуть указатель под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
        let pointerCoordsZero = rangeLeftX - pointer.offsetWidth/2;
        let pointerCoords = e.targetTouches[0].pageX - pointerCoordsZero- pointer.offsetWidth/2;
        if (pointerCoords < range.offsetWidth && pointerCoords > 0){
            pointer.style.left = pointerCoords + 'px';
            rangeCover.style.left = pointerCoords + 'px';
            js_level= (pointerCoords/range.offsetWidth*100);
            JSLevelSHOW(js_level);
        };
    };
    //отследить окончание переноса
    pointer.ontouchend = function() {
        document.ontouchmove = null;
        pointer.ontouchend = null;   
    };
}

// управление js ползунком мышкой
pointer.onmousedown = function(e) { 
    //отследить нажатие
    moveAt(e);
    //перемещать по экрану
    document.onmousemove = function(e) {
        moveAt(e);    
    };
    // передвинуть указатель под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(e) {
        let pointerCoordsZero = rangeLeftX - pointer.offsetWidth/2;
        let pointerCoords = e.pageX - pointerCoordsZero- pointer.offsetWidth/2;
        if (pointerCoords < range.offsetWidth && pointerCoords > 0){
            pointer.style.left = pointerCoords + 'px';
            rangeCover.style.left = pointerCoords + 'px';
            js_level= (pointerCoords/range.offsetWidth*100);
            JSLevelSHOW(js_level);
        };
    };
    //отследить окончание переноса
    pointer.onmouseup = function() {
        document.onmousemove = null;
        pointer.onmouseup = null;   
    };
    range.onmouseout = function() {
        document.onmousemove = null;
        pointer.onmouseout = null;   
    };
};
// передвинуть указатель под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования



// оценка уровня js

function JSLevelSHOW(el){
    const js_level_0 = document.getElementById('js_level_0');
    const js_level_1 = document.getElementById('js_level_1');
    const js_level_2 = document.getElementById('js_level_2');
    const js_level_3 = document.getElementById('js_level_3');
    // сравнивание уровня
    switch(true){
        case el>=0 && el<25:
            jsLevelSelect(js_level_0);
        break;  
        case el>=25 && el<50:  
            jsLevelSelect(js_level_1);
        break;  
        case el>=50 && el<75:   
            jsLevelSelect(js_level_2);
        break; 
        case el>=75 && el<=100:   
            jsLevelSelect(js_level_3);
        break;
        default:
    };
    // подсвечиваем нужный уровень
    function jsLevelSelect(e){
        let levels = document.querySelectorAll('.level');
        for (var i=0;i<levels.length;i++){
            let item = levels[i];
            item.setAttribute('class', 'level');
        };
        e.setAttribute('class', 'level selected');
    };
};






// scroll по нажатию 
function changeScroll(el){
    const scrollTarget = el;
    let scrollTargetCoor = getCoords(scrollTarget);
    window.scrollTo({
        top: scrollTargetCoor,
        left: 0,
        behavior: 'smooth'
      });
    if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))
    {
        window.scroll(0,scrollTargetCoor); 
    };
};
function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    let top = box.top + pageYOffset;
    return top;
};

// подсветка пунктов в меню при скроле

function lightObject(){
    const main_parts = document.querySelectorAll('.part');
    for (let i=0;i<main_parts.length;i++){
        let main_part = main_parts[i];
        let main_part_id = main_part.id;
        let svg_part = main_part.querySelector('path');
        let heading_part =main_part.querySelector('.heading2');
        let main_partCoorMin = getCoords(main_part)-80;
        let main_partCoorMax = getCoords(main_part)+main_part.offsetHeight;
        let part_link = document.querySelector('.'+ main_part_id);
        part_link.style.color = 'rgb(28, 28, 28)';
        heading_part.style.color = 'rgb(28, 28, 28)';
        svg_part.setAttribute('fill','rgb(158, 158, 158)');
        if (window.pageYOffset >= main_partCoorMin && window.pageYOffset <= main_partCoorMax){
            part_link.style.color = 'rgb(51, 89, 151)';
            heading_part.style.color = 'rgb(51, 89, 151)';
            svg_part.setAttribute('fill','rgb(51, 89, 151)');
        };

    };
};
// получаем динамические координаты скролинга
window.addEventListener('scroll', lightObject);

// кнопка меню на адаптивной верстке
const header_wraper = document.querySelector('.wraper');
const button_wraper_open = document.querySelector('.button_wraper_open');
const button_wraper_close = document.querySelector('.button_wraper_close');

function open_headerWraper(){
    header_wraper.style.display = 'flex';
    button_wraper_open.style.display = 'none';
    button_wraper_close.style.display = 'block';
};
function close_headerWraper(){
    header_wraper.style.display = 'none';
    button_wraper_open.style.display = 'block';
    button_wraper_close.style.display = 'none';
};