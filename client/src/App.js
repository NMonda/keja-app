import React, { useState, useEffect } from 'react';

// be sure to have this as an env var(I will let you figure this out)
const BACKEND_BASE_URL = 'http://localhost:5500';

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BACKEND_BASE_URL}/api/listings`);
      const listingsData = await response.json();
      setListings(listingsData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>KEJA APP</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing._id}>
              <td>{listing.title}</td>
              <td>{listing.price}</td>
              <td>{listing.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
