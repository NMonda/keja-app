import React, { useEffect, useState } from 'react';
import Listing from './Listing';
import User from './User';

function Home() {
  const [listings, setListings] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch listings from backend API
    fetch('/api/listings')
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error));

    // Fetch users from backend API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Welcome to KEJA App!</h1>
      <h2>Listings</h2>
      {listings.map(listing => <Listing key={listing.id} listing={listing} />)}
      <h2>Users</h2>
      {users.map(user => <User key={user.id} user={user} />)}
    </div>
  );
}

export default Home;
