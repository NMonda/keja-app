import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('./listings');
      setListings(response.data);
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
