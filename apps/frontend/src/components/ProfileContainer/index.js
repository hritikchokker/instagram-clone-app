import React from 'react';
import './index.scss';
import profile from '../../assets/profile_pic.jpg';

function Index() {
  return (
    <div className="profile_base">
      <div className="profile_base_container">
        <div>
          <img src={profile} alt="" className="profile_base_container_logo" />
        </div>
        <div className="profile_base_container_text">
          <p>Profile name</p>
        </div>
      </div>
    </div>
  );
}

export default Index;
