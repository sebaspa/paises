//Class to places and functions
class Places {

    constructor() {
        this.apiUrl = 'https://restcountries.eu/rest/v2/';
    }

    async getAllCountries() {
        const response = await fetch(this.apiUrl + 'all');
        const countries = await response.json();
        this.listAllCountries(countries);
    }

    listAllCountries(countries) {

        ui.contAllCountries.innerHTML = '';

        countries.forEach(country => {
            ui.contAllCountries.innerHTML += `
            <div class="col-12 col-md-4 col-lg-3">
            <div class="card mb-3">
            <img src="${country.flag}" class="card-img-top" width="100%" height="150" alt="${country.name}">
            <div class="card-body">
            <h5 class="card-title">${country.nativeName}</h5>
            <p class="card-text mb-0"><b>Capital: </b>${country.capital}</p>
            <p class="card-text mb-0"><b>Continente: </b>${country.region}</p>
            <p class="card-text mb-0"><b>Población: </b>${country.population}</p>
            <a href="#" class="btn btn-block btn-primary mt-3">Ver más</a>
            </div>
            </div>
            </div>
            `;
        });

        //Hide alert message
        ui.contAlert.innerHTML = '';
    }

    async getCountryByName(countryName) {
        const response = await fetch(this.apiUrl + `name/${countryName}`);
        const countries = await response.json();
        if (countries.status === 404) {
            ui.showAlert('No se encontraron resultados.', 'danger');
        }
        else {
            this.listAllCountries(countries);
        }
        console.log(countries);
    }

    async getCountriesByRegion(region) {
        if (region == '') {
            this.getAllCountries();
        }
        else {
            const response = await fetch(this.apiUrl + `region/${region}`);
            const countries = await response.json();
            this.listAllCountries(countries);
        }

    }

}

class UI {

    constructor() {
        //Alerts
        this.contAlert = document.getElementById('cont-alert');
        //Countries
        this.contAllCountries = document.getElementById('allCountries');
        this.inputCountrySearch = document.querySelector('#search');
        this.previousValueCountry;
        this.typingTimer;
        this.selectRegion = document.querySelector('#region');
    }

    showAlert(message, type) {
        this.contAlert.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
        `
    }

    showLoading() {
        ui.showAlert('Cargando...', 'info');
        ui.contAllCountries.innerHTML = '';
    }

    init(){
        this.showLoading();
        places.getAllCountries();
    }


    typingSearchCountry() {

        this.showLoading();

        if (this.inputCountrySearch.value !== this.previousValueCountry) {
            clearTimeout(this.typingTimer);
            if (this.inputCountrySearch.value) {
                this.typingTimer = setTimeout(() => {
                    places.getCountryByName(this.inputCountrySearch.value);
                }, 750);
            }
            else {
                places.getAllCountries();
            }
        }

    }

    onChangeRegion() {

        this.showLoading();

        places.getCountriesByRegion(this.selectRegion.value);
    }
}

const ui = new UI();
const places = new Places();

if (ui.contAllCountries) {
    ui.init();
}

//Events
ui.inputCountrySearch.addEventListener('keyup', ui.typingSearchCountry.bind(ui));
ui.selectRegion.addEventListener('change', ui.onChangeRegion.bind(ui));