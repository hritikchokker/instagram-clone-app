import React from 'react';
import BodyContent from './BodyContent';
import './index.scss';
import ReelsContiner from './ReelsContiner';

function Index() {
  return (
    <div className="main_base">
      <ReelsContiner />
      <BodyContent />
      <BodyContent />
      <BodyContent />
    </div>
  );
}

export default Index;
