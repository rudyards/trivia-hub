const BASE_URL = 'https://opentdb.com/api.php?';

export function getAllCategories(){
    return fetch('https://opentdb.com/api_category.php', {mode: "cors"}).then(res => res.json());
}