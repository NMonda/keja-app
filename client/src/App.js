import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

// be sure to have this as an env var(I will let you figure this out)
const BACKEND_BASE_URL = 'http://localhost:5500';

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BACKEND_BASE_URL}/api/v1/listings`);
      const listingsData = await response.json();
      console.log({ listingsData });
      setListings(listingsData);
    }
    fetchData();
  }, []);

  const ListingComponent = () => {
    return (
      <div className='container'>
        <h1>KEJA APP</h1>
        <Table>
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
                <td>{listing._id}</td>
                <td>{listing.price}</td>
                <td>{listing.address}</td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
    )
  };

// conditional rendering
return (
  <div>
    {listings.length > 0 ? <ListingComponent listings={listings}/> : <p>No data Please</p>}
  </div>
)
}

export default App;
