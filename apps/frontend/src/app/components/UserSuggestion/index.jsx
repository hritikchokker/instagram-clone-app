import React from 'react';
import ProfileCard from './ProfileCard';
import './index.scss';
function UserSuggestion() {
  return (
    <div className="suggestion_wrapper">
      <ProfileCard />
      <div className="suggestion_wrapper_info">
        <h3>Suggestions for you</h3>
        <p>See all</p>
      </div>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </div>
  );
}

export default UserSuggestion;
