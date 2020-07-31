//Class to places and functions
class Places {

    constructor() {
        this.contAllCountries = document.getElementById('allCountries');
    }

    async getAllCountries() {
        const response = await fetch('https://restcountries.eu/rest/v2/all');
        const countries = await response.json();
        this.listAllCountries(countries);
    }

    listAllCountries(countries) {
        let self = this;
        countries.forEach(country => {
            console.log(country);
            self.contAllCountries.innerHTML += `
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
    }

}


const places = new Places();

if (places.contAllCountries) {
    places.getAllCountries();
}