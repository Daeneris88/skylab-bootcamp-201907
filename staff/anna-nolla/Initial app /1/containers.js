
function Component(container) {
    if (!(container instanceof HTMLElement)) {
        throw new TypeError("not an HTML element");
    }
    this.container = container;
}
/**
 * Component abstraction
 * 
 * @param {HTMLElement} container 
 */

function Panel(container) {
    Component.call(this, container);
}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;

Panel.prototype.show = function () {
    this.container.classList.remove("panel--hide");
    this.container.classList.add("panel--show");
};
Panel.prototype.hide = function () {
    this.container.classList.remove("panel--show");
    this.container.classList.add("panel--hide");
};

/*----- Landing -------*/

function Initial(container) {
    Panel.call(this, container);
}

Initial.prototype = Object.create(Panel.prototype);
Initial.prototype.constructor = Initial;

Initial.prototype.onNavRegister = function (expression) {
    var registerLink = this.container.children[1];
    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        expression();
    });
}
Initial.prototype.onNavLogin = function (expression) {
    var loginLink = this.container.children[2];
    loginLink.addEventListener("click", function (event) {
        event.preventDefault();
        expression();
    });
}

/*----- Register -------*/

function Register(container) {
    Panel.call(this, container);
}

Register.prototype = Object.create(Panel.prototype);
Register.prototype.constructor = Register;

Register.prototype.onNavInitial = function (expression) {
    var registerBack = this.container.children[2];
    registerBack.addEventListener("click", function (event) {
        event.preventDefault();
        clear();
        expression();
    });
}
Register.prototype.onNavRegisterSuccess = function (expression) {
    var registerForm = this.container.children[0];
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(name, surname, email, password);
    });
}

/*----- Login -------*/

function Login(container) {
    Panel.call(this, container);
}

Login.prototype = Object.create(Panel.prototype);
Login.prototype.constructor = Login;

Login.prototype.onNavInitial = function (expression) {
    var loginBack = this.container.children[2];
    loginBack.addEventListener("click", function (event) {
        event.preventDefault();
        clear();
        expression();
    });
}
Login.prototype.onNavHomePage = function (expression) {
    var goButtom = this.container.children[0];
    goButtom.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;

        expression(email, password);
    });
}
/*----- RegisterSuccess -------*/

function RegisterSuccess(container) {
    Panel.call(this, container);
}

RegisterSuccess.prototype = Object.create(Panel.prototype);
RegisterSuccess.prototype.constructor = RegisterSuccess;

RegisterSuccess.prototype.onNavLogin = function (expression) {
    var logRegister = this.container.children[1];
    logRegister.addEventListener("click", function (event) {
        event.preventDefault();
        expression();
    });
}
/*----- HomePage -------*/

function HomePage(container) {
    Panel.call(this, container);
}

HomePage.prototype = Object.create(Panel.prototype);
HomePage.prototype.constructor = HomePage;

HomePage.prototype.onNavInitial = function (expression) {
    var homePageBack = this.container.children[3];
    homePageBack.addEventListener("click", function (event) {
        event.preventDefault();
        clear();
        expression();
    });
}

HomePage.prototype.onDuckSearch = function (expression) {
    var duckSearch = this.container.children[1];
    duckSearch.addEventListener("submit", function (event) {
        event.preventDefault();
        var query = event.target.query.value;
        expression(query);
    });
}
