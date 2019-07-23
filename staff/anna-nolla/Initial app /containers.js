function component(container){
    if(!(container instanceof HTMLElement)){ 
        throw new TypeError("not an HTML element");
        this.container = container;
    }
}
function Panel(container){
    component.call(this, container);

}

Panel.prototype = Object.create(Component.prototype);
Panel.prototype.constructor = Panel;