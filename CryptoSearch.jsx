// src/CryptoPrice.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoPrice() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCryptoPrices() {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price',
          {
            params: {
              ids: 'bitcoin,ethereum,ripple', // Add more cryptocurrencies as needed
              vs_currencies: 'usd', // Change the currency as needed
            },
          }
        );
        setPrices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrency prices:', error);
      }
    }

    fetchCryptoPrices();
  }, []);

  return (
    <div>
      <h2>Cryptocurrency Prices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <li>
            Bitcoin (BTC): ${prices.bitcoin.usd}
          </li>
          <li>
            Ethereum (ETH): ${prices.ethereum.usd}
          </li>
          <li>
            Ripple (XRP): ${prices.ripple.usd}
          </li>
        </ul>
      )}
    </div>
  );
}

export default CryptoPrice;
