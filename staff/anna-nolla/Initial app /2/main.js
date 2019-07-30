let input = document.getElementsByClassName("input");

const landing = new Landing(document.getElementsByClassName("landing")[0]);
const register = new Register(document.getElementsByClassName("register")[0]);
const regSuccess = new RegSuccess(document.getElementsByClassName("regSuccess")[0]);
const logIn = new Login(document.getElementsByClassName("logIn")[0]);
const homePage = new HomePage(document.getElementsByClassName("homePage")[0]);

// per anar a register
landing.onNavRegister(function(){
    landing.hide();
    register.show();
});
// per anar a logIn
landing.onNavLogIn(function(){
    landing.hide();
    logIn.show();
});

//per registrerse 
register.onNavRegisterSuccess(function(name, surname, email, password){
    try{
        registerF(name, surname, email, password);
        register.hide();
        regSuccess.show();
    } catch(error){
    }
});
// per tirar enrera
register.onNavInitial(function(){
    register.hide();
    landing.show();
});

//per anar al log in
regSuccess.onNavLogin(function(){
    regSuccess.hide();
    logIn.show();
});
// per anar al landing
regSuccess.onNavInitial(function(){
    regSuccess.hide();
    landing.show();
});

// per anar a la homePage
logIn.onNavHomePage(function(email,password){
    try{
        logInF(email, password);
        logIn.hide();
        homePage.show();
    } catch(error){
    }
});
// per anar al landing
logIn.onNavInitial(function(){
    logIn.hide();
    landing.show();
});

// busqueda de patos
/*homePage.onDuckSearch(function(query){
    try{
        duckling(query);// function per buscar patos i mostrar la llista
        duckList.show();
    }catch{ 

    }
});
homePage
    // function on click al pato
    duckList.hide();
    duckDetails.show();
*/

// homePage
    // function per tornar a busqueda principal
   // duckDetails.hide();
   // duckList.show();

// per anar al landing
homePage.onNavInitial(function(){
    homePage.hide();
    landing.show();
}); 