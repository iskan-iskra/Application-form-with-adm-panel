
const mainWraper = document.querySelector('main');
function getUsers(e){
    var users = e;
    console.log(users);
    for (let i=0;i<users.length; i++){
        var user            =users[i];
        let userID          = user.id;
        let userName        = user.name;
        let userDatebirth   = user.age;
        let userLocation    = user.location;
        let userSkype       = user.skype;
        let userEmail       = user.email;
        let userSkills      = user.skills;
        let userJslevel     = user.jslevel;
        let userComment     = user.comment;
        var userWraper = document.createElement('div');
        userWraper.setAttribute('class','userWraper');
        mainWraper.append(userWraper);
        HTMLbuild  (userID,
                    userName,
                    userDatebirth,
                    userLocation,
                    userSkype,
                    userEmail,
                    userSkills,
                    userJslevel,
                    userComment,
                    userWraper);
    };
};
function HTMLbuild(a1,a2,a3,a4,a5,a6,a7,a8,a9,userWraper){
    const button_delete = document.createElement('button');
    let divHeading = document.createElement('div');
    divHeading.setAttribute('class','userHeading');
    let divContent = document.createElement('div');
    divContent.setAttribute('class','userContent');
    userWraper.append(divHeading);
    userWraper.append(divContent);
    divHeading.append  (createDiv(a2),
                        createDiv("ID="+a1));
    divContent.append  (createDiv('Birth date: '+a3), 
                        createDiv('Location: '+a4),
                        createDiv('Skype: '+a5),
                        createDiv('Email: '+a6),
                        createDiv('Candidate knows: '+a7),
                        createDiv('JavaScript: '+a8),
                        createDiv('Candidate motivation : '+a9),
                        button_delete);
    button_delete.innerHTML = 'Delete';
    button_delete.setAttribute('onclick',`objectDelete(${a1})`);
    divHeading.addEventListener('click', function(){
        let x = divContent;
        if (x.style.display === "flex") {
            x.style.display = "none";
          } else {
            x.style.display = "flex";
          }
    });
};
function createDiv(el){
    let createdDiv = document.createElement('div');
    createdDiv.innerHTML = el;
    return createdDiv;
};

function reloadPage(){
    location.reload();
};

