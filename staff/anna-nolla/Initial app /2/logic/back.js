function clear(){
    for(let i = 0; i < input.length; i++){
        input[i].value = "";
    }
    let feedbackR = document.getElementsByClassName("input")[0];
    feedbackR.innerText = "";

    let feedbackL = document.getElementsByClassName("input")[2];
    feedbackL.innerText = "";
}