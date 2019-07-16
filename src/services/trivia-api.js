const BASE_URL = 'https://opentdb.com/api.php';

export function getAllCategories(){
    return fetch('https://opentdb.com/api_category.php', {mode: "cors"}).then(res => res.json());
}

export function getQuestions(difficulty, category){
    console.log(`${BASE_URL}?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
    return fetch(`${BASE_URL}?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`, {mode: "cors"}).then(res => res.json());
}