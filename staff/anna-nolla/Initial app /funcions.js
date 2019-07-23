
var mailComp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function registerF(name, surname, email, password){
    var errors = "";
    
    if(!name.trim()){
        errors += "Wrong name.\n";
    }
    if(!surname.trim()){
        errors += "Wrong surname.\n";
    }
    if(!email.trim()){
        errors += "Wrong e-mail.\n";
    }
    if(!password.trim()){
        errors += "Wrong password.\n";
    }
    if(errors){
        throw new Error(errors);
    }
    if(new RegExp(mailComp).test(email) === false){
        throw new Error("This e-mail is not a valid e-mail.");
    }
    else{    
        if(findR(email) === false){ 
            throw new Error("E-mail already registered.");
        }
        else{
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
            });
        }
    }      
}

function findR(email){
    for (var i= 0; i < users.length; i++){
        if(users[i].email === email) return false; 
    }
    return true;
}

function findL(email, password){
    for (var i= 0; i < users.length; i++){
        if(users[i].email === email){
            if(password && users[i].password === password){
                return true;
            }
        else return false;
        }
    }
}

function clear(){
    for(var i = 0; i < inputt.length; i++){
        inputt[i].value = "";
    }
    var feedback = register.children[1];
    feedback.innerText = "";

    var feedbackL = register.children[1];
    feedbackL.innerText = "";
}


function goButtomF(email, password){

    if(new RegExp(mailComp).test(email) !== true){
        throw new Error("This e-mail is not a valid e-mail.");
    }
    else{
        if(findL(email, password) === true){
            //nombre del container
        }
        else { throw new Error("Wrong e-mail and/or password!");}
    }
}




