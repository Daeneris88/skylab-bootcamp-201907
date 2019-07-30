class HomePage extends Component{
    constructor(container){
        super(container)
    }
    onNavInitial(expression) {
        const homePageBack = this.container.getElementsByClassName("back")[0];
        homePageBack.addEventListener("click", function (event) {
            event.preventDefault();
            clear();
            expression();
        });
    }
    onDuckSearch(expression) {
        const duckSearch = this.container.getElementsByClassName("backSearch")[0];
        duckSearch.addEventListener("submit", function (event) {
            event.preventDefault();
            let query = event.target.query.value;
            expression(query);
        });
    }
}



