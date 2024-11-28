let films = document.getElementById('films');
let btnSS = document.querySelector('.starships-show');
let starships = document.querySelector('#starships');

btnSS.addEventListener('click', starshipsShow);

let k = 0;




document.addEventListener('DOMContentLoaded', initApp);
//выводит фильмы
function starshipsShow() {
    if (k == 0) {
        getAllSs().then(function (valuess) {
            const resultSs = valuess.results;
            resultSs.forEach(film => printSS(film));
        }
        )
        k = 1;
    }
}
//выводит корабли
function printSS({ name, lenght }) {
    let ship = document.createElement('div');
    ship.innerHTML = `<h5>${name}<h5>`;
    let lenShit = document.createElement('span');
    lenShit.innerHTML = "Len ship " + lenght;

    ship.append(lenShit);

    starships.append(ship);
}
//асинхронная функция полученния всех кораблей
async function getAllSs() {
    const response = await fetch('https://swapi.dev/api/starships/')
    const data = await response.json();
    return data;
}
//асинхронная функция полученния всех героев определенного фильма
async function getFilm(url) {
    const response = await fetch(url)
    const data = await response.json();
    return data;

}
//асинхронная функция полученния всех имен
async function getPersonsName(charactersUrl) {
    const response = await fetch(charactersUrl)
    const data = await response.json();
    return data;
}

// async logic 

async function getAllFilms() {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    return data;
}


// event logic 
function initApp() {
    getAllFilms().then(
        function (valuess) {
            const resultFilms = valuess.results;
            resultFilms.forEach(film => printFilms(film));
        }
    )
}

// print logic 

function printFilms({ title, episode_id, release_date, url }) {
    let divFilm = document.createElement('div');
    divFilm.classList.add("film");
    divFilm.innerHTML = `<h4>${title}</h4>`;
    let spanFilm = document.createElement('span');
    spanFilm.innerHTML = 'Number of episode: ' + episode_id;
    divFilm.append(spanFilm);

    let dateFilms = document.createElement('span');
    dateFilms.innerHTML = release_date;




    let btnPerson = document.createElement('div');
    btnPerson.innerHTML = `<span onclick="showPers('${url}',this)">show persons</span>`;
    divFilm.append(btnPerson);
    

    films.append(divFilm);


}
//функция кнопки для показа геров фильма
function showPers(url, btnShowPers) {

    const btnParentDiv = btnShowPers.closest('.film');
    
    getFilm(url).then(function (values) {
        const resultCharacters = values.characters;
        resultCharacters.forEach(charactersUrl => getPersonsName(charactersUrl)
            .then(function (person) {
                const name = person.name;
                let personDiv = document.createElement('div');
                personDiv.innerHTML = person.name;

                btnParentDiv.append(personDiv);
            })
        );
    }
    )




} 