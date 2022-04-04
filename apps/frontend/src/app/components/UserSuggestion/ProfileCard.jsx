import React from 'react';

import './index.scss';
function ProfileCard() {
  return (
    <div className="card_wrapper">
      <div className="card_wrapper_image">
        <img src="/assets/profile_pic.jpg" alt="d020dk2" />
      </div>
      <div className="card_wrapper_texts">
        <h3>chokkerhritik</h3>
        <p>hritik chokker</p>
      </div>
      <div className="card_wrapper_action">
        <button> Switch</button>
      </div>
    </div>
  );
}

export default ProfileCard;
