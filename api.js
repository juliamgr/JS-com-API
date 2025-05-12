document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const randomBtn = document.getElementById('random-btn');
    const countryInput = document.getElementById('country-input');

    searchBtn.addEventListener('click', () => {
        console.log('Botão "Buscar" clicado');
        searchCountry();
    });

    randomBtn.addEventListener('click', () => {
        console.log('Botão "Aleatório" clicado');
        getRandomCountry();
    });

    countryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchCountry();
    });

    async function searchCountry() {
        const countryName = countryInput.value.trim();
        if (!countryName) return;

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
            const data = await response.json();

            if (response.ok && data.length > 0) {
                displayCountryInfo(data[0]);
            } else {
                showError();
            }
        } catch (error) {
            console.error('Erro:', error);
            showError();
        }
    }

    async function getRandomCountry() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            const randomIndex = Math.floor(Math.random() * countries.length);
            displayCountryInfo(countries[randomIndex]);
        } catch (error) {
            console.error('Erro:', error);
            showError();
        }
    }

    function displayCountryInfo(country) {
        document.getElementById('error-message').classList.add('hidden');

        const countryInfo = document.getElementById('country-info');
        countryInfo.classList.remove('hidden');

        document.getElementById('country-name').textContent = country.name.common;
        document.getElementById('country-flag').src = country.flags.png;
        document.getElementById('country-flag').alt = `Bandeira de ${country.name.common}`;
        document.getElementById('country-capital').textContent = country.capital?.[0] || 'N/A';

        document.getElementById('country-population').textContent =
            country.population.toLocaleString();

        document.getElementById('country-region').textContent = country.region;

        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        document.getElementById('country-languages').textContent = languages;

        let currencies = 'N/A';
        if (country.currencies) {
            currencies = Object.values(country.currencies)
                .map(currency => `${currency.name} (${currency.symbol || '—'})`)
                .join(', ');
        }
        document.getElementById('country-currencies').textContent = currencies;
    }

    function showError() {
        document.getElementById('country-info').classList.add('hidden');
        document.getElementById('error-message').classList.remove('hidden');
    }
});