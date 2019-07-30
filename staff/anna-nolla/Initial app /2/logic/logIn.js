function logInF(email, password){
    let errors = '';

    if (!email.trim()) {
        errors += "E-mail is empty or blank.\n";
    } 
    if (!password.trim()) {
        errors += "Password is empty or blank.\n";
    }
    if (errors) throw new Error(errors);
        
    let user = users.find(function (user) {
        return user.email === email && user.password === password;
    });

    if (!user) throw new Error('Wrong credentials.');
}