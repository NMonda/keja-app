import React from 'react';

function Listing({ listing }) {
  return (
    <div>
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <p>{listing.price}</p>
      <p>{listing.location}</p>
      <p>{listing.bedrooms} bedrooms, {listing.bathrooms} bathrooms</p>
    </div>
  );
}

export default Listing;
