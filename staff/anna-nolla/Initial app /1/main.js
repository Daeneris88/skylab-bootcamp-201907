
var panels = document.getElementsByClassName("panel");
var inputt = document.getElementsByClassName("inputt");
    
var initial = new Initial(panels[0]);
var register = new Register(panels[1]);
var registerSuccess = new RegisterSuccess(panels[2]);
var login = new Login(panels[3]);
var homePage = new HomePage(panels[4]);
    
    
initial.onNavRegister(function(){
        initial.hide();
        register.show();
});

register.onNavInitial(function(){
    register.hide();
    initial.show();
});

login.onNavInitial(function(){
    login.hide();
    initial.show();
});

initial.onNavLogin(function(){
        initial.hide();
        login.show();
});

register.onNavRegisterSuccess(function(name, surname, email, password) {
    try{
        registerF(name, surname, email, password);
        register.hide();
        registerSuccess.show();
    } catch(error){
        var feedback = register.container.children[1];
        feedback.innerText = error.message;
    }   
});

login.onNavHomePage(function(email,password){
    try{
        goButtomF(email,password);
        login.hide();
        homePage.show();
    } catch(error){
        var feedbackL = login.container.children[1];
        feedbackL.innerText = error.message;
    }
});

registerSuccess.onNavLogin(function(){
    registerSuccess.hide();
    login.show();
});

homePage.onNavInitial(function(){
    homePage.hide();
    initial.show();
});

homePage.onDuckSearch(function(query){
    try{
        duckling(query);
    }catch{ }
});

