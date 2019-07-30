
const mailComp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function registerF(name, surname, email, password){
    let errors = "";
    
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
    else {
        let user = users.find(function (user) {
            return user.email === email;
        });

        if (user) throw new Error('E-mail is already registered.');

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    }      
}