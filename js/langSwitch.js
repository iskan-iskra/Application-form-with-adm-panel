// потратил 3 часа!!!!!!!!!!!!




// сам переключатель языка
var lang = lang_ru;   
var ru_location = location.pathname + "#RU";
var en_location = location.pathname + "#EN";


// поиск всех слов с переводом по атрибуту key
// нельзя в forEach так как getelement выдает nodelist а не array,
// queryselector выдает уже array
function findkey(){
    
    // для перевода титульника страницы
    let titleName = document.getElementById('titleName');
    let titleKey = titleName.getAttribute('key');
    titleName.innerHTML = lang[titleKey];

    // для перевода внутренней части div
    let list1 = document.getElementsByTagName('div');
    for (let i=0; i< list1.length; i++){
        let item = list1[i];
        if (item.hasAttribute('key')
        && item.getAttribute('class') != 'input'){
            let key = item.getAttribute('key');
            let key_value = lang[key];
            item.innerHTML = key_value;
        };
    };
    // для перевода "placeholder" в inputs 
    let list2 = document.querySelectorAll('.input');
    for (let i=0; i< list2.length; i++){
        let el = list2[i];
        if (el.hasAttribute('key')){
            let key = el.getAttribute('key');
            let key_value = lang[key];
            el.setAttribute('data-text',key_value);
        };
    };
};

// переключатель кнопки смены языка
function lang_button_switch(){
    let button_Ru = document.querySelector('.lang__button_Ru');
    let button_En = document.querySelector('.lang__button_En');
    let hash = window.location.hash;
    hash = hash.substring(1);
    if (hash == 'EN'){
        lang=lang_en;
        button_En.style.display='none';
    }
    else{
        lang=lang_ru;
        button_Ru.style.display='none';
    };
};

// функция для нажатия кнопки перевода на русский язык
function langSwitchRu(){
    location.href = ru_location;
    location.reload();
};

// функция для нажатия кнопки перевода на английский язык
function langSwitchEn(){
    location.href = en_location;
    location.reload();
};

// фукнция загрузки изменений
function pageCheck(){
    lang_button_switch();
    findkey();
};

// подгрузка изменений при запуске странички
pageCheck();


if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))
    {
        let buttons = document.querySelectorAll('.button');
        for (let i=0;i< buttons.length; i++){
            let button = buttons[i];
            button.style.display = 'none'
        }
    };