import React from 'react';

function Listing(props) {
  const { listing } = props;

  return (
    <div className="listing">
      <h2>{listing.title}</h2>
      <img src={listing.imageUrl} alt={listing.title} />
      <p>{listing.description}</p>
      <p>{listing.price}</p>
    </div>
  );
}

export default Listing;