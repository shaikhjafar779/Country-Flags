import React, { useState, useEffect } from 'react';
import axios from 'axios';

const XCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay to see the loading state
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get('https://xcountries-backend.azurewebsites.net/all');
        setCountries(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {error && <p style={{ textAlign: "center", width: '100%' }}>Error fetching data: {error.message}</p>}
      <div className="country-grid">
        {countries.map((country, index) => (
          <div key={index + country.name} className="country-item">
            <img 
              src={country.flag} 
              alt={`Flag of ${country.name}`} 
              loading="lazy" 
              className="country" 
            />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default XCountries;
