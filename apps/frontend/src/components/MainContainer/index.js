import React from 'react';
import './index.scss';
import image1 from '../../assets/pic_1.jpg';
import image2 from '../../assets/pic_2.jpg';
import image3 from '../../assets/pic_3.jpg';
import image4 from '../../assets/pic_4.jpg';

function Index() {
  return (
    <div className="main_base">
      <div className="main_base_reels_base">
        <div className="main_base_reels_base_container">
          <div className="main_base_reels_base_container_content">
            <span role="link" className="Image_container">
              <img
                className="Image_container_content"
                alt="profile picture"
                src={image1}
              />
              <i className="Image_container_text">Something</i>
            </span>
          </div>
        </div>
        <div className="main_base_reels_base_container">
          <div className="main_base_reels_base_container_content">
            <span role="link" className="Image_container">
              <img
                className="Image_container_content"
                alt="profile picture"
                src={image2}
              />
              <i className="Image_container_text">Something</i>
            </span>
          </div>
        </div>
        <div className="main_base_reels_base_container">
          <div className="main_base_reels_base_container_content">
            <span role="link" className="Image_container">
              <img
                className="Image_container_content"
                alt="profile picture"
                src={image3}
              />
              <i className="Image_container_text">Something</i>
            </span>
          </div>
        </div>
        <div className="main_base_reels_base_container">
          <div className="main_base_reels_base_container_content">
            <span role="link" className="Image_container">
              <img
                className="Image_container_content"
                alt="profile picture"
                src={image4}
              />
              <i className="Image_container_text">Something</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
