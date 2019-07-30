class Login extends Component{
    constructor(container){ 
        super(container)
    }
    onNavInitial(expression) {
        const loginBack = this.container.getElementsByClassName("back")[0];
        loginBack.addEventListener("click", function (event) {
            event.preventDefault();
            clear();
            expression();
        });
    }
    onNavHomePage(expression) {
        const goButtom = this.container.getElementsByClassName("go")[0];
        goButtom.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = event.target.email.value;
            let password = event.target.password.value;
    
            expression(email, password);
        });
    }
}