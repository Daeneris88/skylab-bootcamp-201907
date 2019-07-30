class RegSuccess extends Component{
    constructor(container){ 
        super(container)
    }
    onNavInitial(expression) {
        const registerBack = this.container.getElementsByClassName("back")[0];
        registerBack.addEventListener("click", function (event) {
            event.preventDefault();
            clear();
            expression();
        });
    }
    onNavLogin(expression) {
        const logRegister = this.container.getElementsByClassName("logButton")[0];
        logRegister.addEventListener("click", function (event) {
            event.preventDefault();
            expression();
        });
    }

}