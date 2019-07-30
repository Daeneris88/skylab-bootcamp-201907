class Register extends Component{
    constructor(container){ 
        super(container)
    }
    onNavRegisterSuccess(expression){
        const registerForm = this.container.getElementsByClassName("registerButton")[0];
        registerForm.addEventListener("submit", function(event){
            event.preventDefault();
            let name = event.target.name.value;
            let surname = event.target.surname.value;
            let email = event.target.email.value;
            let password = event.target.password.value;
            
            expression(name, surname, email, password);
        });
    }  
    onNavInitial(expression){
        const registerBack = this.container.getElementsByClassName("back")[0];
        registerBack.addEventListener("click", function(event){
            event.preventDefault();
            clear();
            expression();
        });
    }
}