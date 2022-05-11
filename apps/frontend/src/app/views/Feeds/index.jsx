import React from 'react';
import UserSuggestion from '../../components/UserSuggestion';
import './index.scss';
const ReelsOverview = React.lazy(() =>
  import('../../components/ReelsOverview')
);
const PostsList = React.lazy(() => import('../../components/PostsList'));
const Feeds = () => {
  return (
    <div className="reels_wrapper w-65">
      <React.Suspense fallback={<h1>...loading</h1>}>
        <div>
          <ReelsOverview />
          <React.Suspense fallback={<h1>....loading</h1>}>
            <PostsList />
          </React.Suspense>
        </div>
      </React.Suspense>
      <UserSuggestion />
    </div>
  );
};

export default Feeds;
