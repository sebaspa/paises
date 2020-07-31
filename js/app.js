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
            console.log(country);
            ui.contAllCountries.innerHTML += `
            <div class="col-12 col-md-4 col-lg-3">
            <div class="card mb-3">
            <img src="${country.flag}" class="card-img-top" width="100%" height="150" alt="${country.name}">
            <div class="card-body">
            <h5 class="card-title">${country.nativeName}</h5>
            <p class="card-text mb-0"><b>Capital: </b>${country.capital}</p>
            <p class="card-text mb-0"><b>Continente: </b>${country.region}</p>
            <p class="card-text mb-0"><b>Población: </b>${country.population}</p>
            <a href="country.php?code=${country.alpha3Code}" class="btn btn-block btn-primary mt-3">Ver más</a>
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

    async getCountryByCode(code) {
        const response = await fetch(this.apiUrl + `alpha?codes=${code}`);
        const country = await response.json();
        this.printCountry(country[0]);
    }

    printCountry(country) {
        ui.countryFlag.src = country.flag;
        ui.txtRegion.innerHTML = country.region;
        ui.txtCountryName.innerHTML = country.name;
        ui.txtCapital.innerHTML = country.capital;
        ui.txtPopulation.innerHTML = country.population;
        ui.txtCurrency.innerHTML = country.currencies[0].name;

        country.languages.forEach(language => {
            ui.listLanguages.innerHTML += `
            <span class="badge badge-primary mx-2">${language.name}</span>
            `;
        });

        country.borders.forEach(border => {
            ui.listBorders.innerHTML += `
            <a href="country.php?code=${border}"><span class="badge badge-primary mx-2">${border}</span></a>
            `;
        });
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

        //Country
        this.contCountry = document.querySelector('#cont-country');
        this.countryFlag = document.querySelector('#countryFlag');
        this.txtCapital = document.querySelector('#txtCapital');
        this.txtRegion = document.querySelector('#txtRegion');
        this.txtCountryName = document.querySelector('#txtCountryName');
        this.txtPopulation = document.querySelector('#txtPopulation');
        this.txtCurrency = document.querySelector('#txtCurrency');
        this.listLanguages = document.querySelector('#listLanguages');
        this.listBorders = document.querySelector('#listBorders');
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

    initCountries() {
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
    ui.initCountries();
    //Events
    ui.inputCountrySearch.addEventListener('keyup', ui.typingSearchCountry.bind(ui));
    ui.selectRegion.addEventListener('change', ui.onChangeRegion.bind(ui));
}

if (ui.contCountry) {
    places.getCountryByCode(location.search.split('=')[1]);
}
