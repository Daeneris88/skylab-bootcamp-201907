function searchDucks (query, expression) {
// TODO validate query, expression

    call('http://duckling-api.herokuapp.com/api/search?q=' + query, expression);
    }


function retrieveDuck (id, expression) {
        // TODO validate id, expression

    call('http://duckling-api.herokuapp.com/api/ducks/' + id, expression);
    }