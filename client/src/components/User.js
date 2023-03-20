import React from 'react';

function User(props) {
  const { user } = props;

  return (
    <div className="user">
      <h2>{user.name}</h2>
      <img src={user.avatarUrl} alt={user.name} />
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </div>
  );
}

export default User;
