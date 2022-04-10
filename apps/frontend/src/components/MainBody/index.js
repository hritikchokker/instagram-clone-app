import React from 'react';
import './index.scss';
import MainContainer from '../MainContainer/index';
import ProfileContainer from '../ProfileContainer/index';
function Index() {
  return (
    <div className="body_base">
      <div className="body_base_container">
        <MainContainer />
        <ProfileContainer />
      </div>
    </div>
  );
}

export default Index;
