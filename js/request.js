

// получаем личные данные с html 
function get_inputData(el){
    let get_Data = '';
    let get_inputs = document.querySelectorAll('.input');
    for (let i=0;i<get_inputs.length;i++){
        let get_input = get_inputs[i];
        if (get_input.id == el){
            get_Data = get_input.innerHTML;
        };
    };
    return get_Data;
};  

// получаем данные об опыте с html
function get_checkboxData(){
    let get_Data = '';
    let get_checkboxes = document.querySelectorAll('.checkbox');
    for(let i=0;i<get_checkboxes.length; i++){
        let get_checkbox= get_checkboxes[i];
        if (get_checkbox.className.includes('checked')){
            get_Data += get_checkbox.innerHTML + ', ';
        }
    }
    return get_Data;
}

// получаем данные о навыке js с html
function get_jslevelData(){
    let get_Data ='';
    let get_jslevels = document.querySelectorAll('.level');
    for (let i=0; i<get_jslevels.length;i++){
        let get_jslevel = get_jslevels[i];
        if (get_jslevel.className.includes('selected')){
            get_Data += get_jslevel.innerHTML + ' & ';
        }
    }
    get_Data += 'level='+ Math.round(js_level) + '%';
    return get_Data;
} 

// получаем коментарий с html 
// function get_commentData(){
//     let get_Data = '';
//     let get_comment = document.getElementById('about_yourself');
//     get_Data = get_comment.innerHTML;
//     return get_Data;
// }




const button__sub = document.getElementById('Button__sub');
button__sub.addEventListener('click', function(){
    let a1 = get_inputData("Name");
    let a2 = get_inputData("Birth_date");
    let a3 = get_inputData("Location");
    let a4 = get_inputData("Skype");
    let a5 = get_inputData("Email");
    let c = get_checkboxData();
    let d = get_jslevelData();
    let a6 = get_inputData("about_yourself");
    PostData(a1,a2,a3,a4,a5,c,d,a6);
    // location.reload();
});

function PostData(
    json_name,
    json_age,
    json_location,
    json_skype,
    json_email,
    json_skills,
    json_jslevel,
    json_comment
){
    
    // post запрос на сервер
    const request = new XMLHttpRequest();
    const url = "http://localhost:8000/users";
    let params =  {
        "name":     json_name,
        "age":      json_age,
        "location": json_location,
        "skype":    json_skype,
        "email":    json_email,
        "skills":   json_skills,
        "jslevel":  json_jslevel,
        "comment":  json_comment
    }
    //	отправка json
    request.responseType =	"json";
    request.open("POST", url, true);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-type","application/json");
    request.addEventListener("readystatechange", () => {
     
        if (request.readyState === 4 && request.status === 200) {
            let obj = request.response;
            console.log(obj);       
            // обратная связь
            console.log(obj.Name);
            console.log(obj.ID);   
            }
    });
    request.send(JSON.stringify(params));
    
    if (window.location.hash.substring(1) == "EN"){
        alert('Thanks, application has post');
    }
    else{
        alert('Спасибо, анкета отправлена');
    }
    location.reload();
}


