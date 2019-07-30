class DucDetail extends HomePage{
    constructor(container){
        super(container)
    }
    onNavDuckList(expression){
        backSearch.addEventListener("click", function(event){
            event.preventDefault();
            expression();
        });
    }
}