class Landing extends Component{
    constructor(container){ 
        super(container)
    }
    onNavRegister(expression) {
        const registerLink = this.container.getElementsByClassName("regButton")[0];
        registerLink.addEventListener('click', function(event) {
            event.preventDefault();
            expression();
        });
    }

    onNavLogIn(expression){
        const loginLink = this.container.getElementsByClassName("logButton")[0];
        loginLink.addEventListener("click", function (event) {
            event.preventDefault();
            expression();
        });
    }
}