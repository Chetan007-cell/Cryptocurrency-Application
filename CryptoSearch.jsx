import React, { Component } from 'react';

class CryptoSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
    };
  }

  componentDidMount() {
    this.fetchCryptoData();
  }

  fetchCryptoData = () => {
    const { searchTerm } = this.state;
    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const filteredResults = data.filter(coin =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({ results: filteredResults });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  handleInputChange = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.fetchCryptoData();
    });
  };

  render() {
    const { results } = this.state;

    return (
      <div>
        <input
          type="text"
          id="search"
          placeholder="Search cryptocurrencies"
          onChange={this.handleInputChange}
        />
        <div id="results">
          {results.map(coin => (
            <div key={coin.id} className="result">
              <h2>{coin.name}</h2>
              <p>Price: ${coin.current_price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CryptoSearch;
