const BASE_URL = 'https://opentdb.com/api.php?';

export function getAllCategories(){
    return fetch('https://opentdb.com/api_category.php', {mode: "cors"}).then(res => res.json());
}

export function getQuestions(difficulty, category){
    return fetch(`${BASE_URL}?amount=10&category=${category}&difficulty=${difficulty}`, {mode: "cors"}).then(res => res.json());
}