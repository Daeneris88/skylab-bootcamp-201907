

    var panels = document.getElementsByClassName("panel");
    var inputt = document.getElementsByClassName("inputt");
    var initial = panels[0];
    var register = panels[1];
    var login = panels[3];
    var registerSuccess = panels[2];
    var page = panels[4];
    
    
    var users = [{null: null}];
    
    var registerLink = initial.children[1];
    var loginLink = initial.children[2];
    var goButtom = login.children[0];
    var registerBack = login.children[2];
    var registerForm = register.children[0];
    var registerBackLink = register.children[2];
    var log = registerSuccess.children[1];
    
registerLink.addEventListener("click", function(event){
        event.preventDefault();

        initial.classList.remove("panel--show");
        initial.classList.add("panel--hide");
        
        register.classList.remove('panel--hide');
        register.classList.add('panel--show');
    });

registerBackLink.addEventListener("click", function(event){
    event.preventDefault();
    
    clear();

    register.classList.remove("panel--show");
    register.classList.add("panel--hide");

    initial.classList.remove("panel--hide");
    initial.classList.add("panel--show");
});

registerBack.addEventListener("click", function(event){
    event.preventDefault();
    
    clear();

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

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    debugger
    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;

    try{
        registerF(name, surname, email, password);

        register.classList.remove('panel--show');
        register.classList.add('panel--hide');
        
        registerSuccess.classList.remove('panel--hide');
        registerSuccess.classList.add('panel--show');

    } catch(error){
        var feedback = register.children[1];
        feedback.innerText = error.message;
    }   
});

goButtom.addEventListener("submit", function(event){
    event.preventDefault();
    
    var email = event.target.email.value;
    var password = event.target.password.value;

    try{
        goButtomF(email,password);

        login.classList.remove("panel--show");
        login.classList.add("panel--hide");

        page.classList.remove("panel--hide");
        page.classList.add("panel--show");
    } catch(error){
        var feedbackL = login.children[1];
        feedbackL.innerText = error.message;
    }
});

log.addEventListener("click", function(event){
    event.preventDefault();

    registerSuccess.classList.remove("panel--show");
    registerSuccess.classList.add("panel--hide");

    login.classList.remove("panel--hide");
    login.classList.add("panel--show");
});

