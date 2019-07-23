

    var panels = document.getElementsByClassName("panel");
    var initial = panels[0];
    var register = panels[1];
    var login = panels[3];
    var registerSuccess = panels[2];
    var page = panels[4];

    var registerLink = initial.children[1];
    var loginLink = initial.children[2];

    var users = [{null: null}];
    var inputt = document.getElementsByClassName("inputt");


registerLink.addEventListener("click", function(event){
        event.preventDefault();

        initial.classList.remove("panel--show");
        initial.classList.add("panel--hide");

        register.classList.remove("panel--hide");
        register.classList.add("panel--show");
    });

var registerBackLink = register.children[2];


registerBackLink.addEventListener("click", function(event){
    event.preventDefault();
    
    for(var i = 0; i < inputt.length; i++){
        inputt[i].value = "";
    }
    
    register.classList.remove("panel--show");
    register.classList.add("panel--hide");

    initial.classList.remove("panel--hide");
    initial.classList.add("panel--show");
});

var registerBack = login.children[1];

registerBack.addEventListener("click", function(event){
    event.preventDefault();
    
    for(var i = 0; i < inputt.length; i++){
        inputt[i].value = "";
    }

    login.classList.remove("panel--show");
    login.classList.add("panel--hide");

    initial.classList.remove("panel--hide");
    initial.classList.add("panel--show");

});

loginLink.addEventListener("click", function(event){
        event.preventDefault();

        initial.classList.remove("panel--show");
        initial.classList.add("panel--hide");

        login.classList.remove("panel--hide");
        login.classList.add("panel--show");
    });

var registerForm = register.children[0];
var feedback = register.children[1];

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.mail.value;
    var password = event.target.password.value;

    if(!name.trim()){
        feedback.innerText = "Wrong name.\n";
    }
    if(!surname.trim()){
        feedback.innerText = "Wrong surname.\n";
    }
    if(!email.trim()){
        feedback.innerText = "Wrong e-mail.\n";
    }
    if(!password.trim()){
        feedback.innerText = "Wrong password.\n";
    }
    else {
        for (var i= 0; i < users.length; i++){
            if(users[i].email !== email){
        
                users.push({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                });
                register.classList.remove('panel--show');
                register.classList.add('panel--hide');
                
                registerSuccess.classList.remove('panel--hide');
                registerSuccess.classList.add('panel--show');
                break;
            }
        }
    }
});

var goButtom = login.children[0];

goButtom.addEventListener("submit", function(event){
    event.preventDefault();

    var email = event.target.mail.value;
    var password = event.target.password.value;

    if(email !== undefined || password !== undefined){

        for(var i = 0; i < users.length; i++){
            if(users[i].email === email && users[i].password === password){
          
                login.classList.remove("panel--show");
                login.classList.add("panel--hide");

                page.classList.remove("panel--hide");
                page.classList.add("panel--show");
                break;
            }
            else {
                alert("Wrong e-mail and/or password!");
                break;
            }
        }
    }
    else {
        alert("introduce e-mail and password!");
    }
});

var log = registerSuccess.children[1];

log.addEventListener("click", function(event){
    event.preventDefault();

    registerSuccess.classList.remove("panel--show");
    registerSuccess.classList.add("panel--hide");

    login.classList.remove("panel--hide");
    login.classList.add("panel--show");
});

