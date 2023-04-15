import { useRef } from 'react';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { useSelector, useDispatch } from 'react-redux';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { updateNostrEvents } from 'renderer/window1/redux/features/nostr/settings/slice';
import { addNote } from 'renderer/window1/redux/features/nostr/notes/slice';
import {
  setTwoBackSteps,
  setCurrentPage,
} from 'renderer/window1/redux/features/prettyGood/settings/slice';
import { addNostrNoteToSql } from 'renderer/window1/lib/pg/sql';
import Post from 'renderer/window1/apps/nostr/components/post';
import MainFeedTypeSelector from './mainFeedTypeSelector';
import WelcomeBox from './welcomeBox';
import Posts from './posts';
import GlobalFeedFetchPostsInBackground from './globalFeedFetchPostsInBackground';
import GlobalFeedDisplayFromRedux from './globalFeedDisplayFromRedux';

const GlobalFeed = () => {
  const devMode = useSelector((state) => state.prettyGoodGlobalState.devMode);
  let devModeClassName = 'devModeOff';
  if (devMode) {
    devModeClassName = 'devModeOn';
  }
  const dispatch = useDispatch();
  dispatch(setTwoBackSteps());
  dispatch(setCurrentPage('mainFeed'));

  const myNostrProfile = useSelector((state) => state.myNostrProfile);
  const aFollowing = myNostrProfile.following;
  const aExtendedFollowing = myNostrProfile.extendedFollowing;

  const mainNostrFeedFilter = useSelector(
    (state) => state.nostrSettings.mainNostrFeedFilter
  );

  const now = useRef(new Date()); // Make sure current time isn't re-rendered
  const currentTime = dateToUnix(now.current);
  const filter = { kinds: [1] };
  switch (mainNostrFeedFilter) {
    case 'following':
      filter.authors = aFollowing;
      filter.since = currentTime - 2 * 24 * 60 * 60; // 2 * 24 * 60 * 60 = fetch messages as old as two days
      break;
    case 'eFollowing':
      filter.authors = aExtendedFollowing;
      filter.since = currentTime - 2 * 24 * 60 * 60; // 2 * 24 * 60 * 60 = fetch messages as old as two days
      break;
    case 'firehose':
      // all authors
      filter.since = currentTime - 30 * 60; // 60 * 60 = fetch messages as old as one hour
      break;
    case 'grapevine':
      // all authors
      filter.since = 0; // since forever ago
      filter['#g'] = ['grapevine'];
      filter.kinds = [1971];
      break;
    default: // 60 * 60 = fetch messages as old as one hour
      filter.since = currentTime - 30 * 60;
      break;
  }
  // <GlobalFeedFetchRecentPostsInBackground filter={filter} />
  if (mainNostrFeedFilter == 'following') {
    // show notes from redux
    return (
      <>
        <pre className={devModeClassName}>
          filter: {JSON.stringify(filter, null, 4)}
        </pre>
        <div style={{ position: 'relative', height: '40px' }}>
          <div className="mainFeedTypeSelector">
            <MainFeedTypeSelector
              following={aFollowing}
              extendedFollowing={aExtendedFollowing}
            />
          </div>
        </div>
        <WelcomeBox />
        <pre className={devModeClassName}>
          aFollowing: {JSON.stringify(aFollowing, null, 4)}
        </pre>
        <GlobalFeedFetchPostsInBackground
          mainNostrFeedFilter={mainNostrFeedFilter}
          filter={filter}
        />
        <GlobalFeedDisplayFromRedux
          mainNostrFeedFilter={mainNostrFeedFilter}
          filter={filter}
        />
      </>
    );
  }
  // if extendedFollowing or firehose, show notes as they arrive
  const { events } = useNostrEvents({
    filter,
  });
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
      <pre className={devModeClassName}>
        filter: {JSON.stringify(filter, null, 4)}
      </pre>
      <div style={{ position: 'relative', height: '40px' }}>
        <div className="mainFeedTypeSelector">
          <MainFeedTypeSelector
            following={aFollowing}
            extendedFollowing={aExtendedFollowing}
          />
        </div>
      </div>
      <WelcomeBox />
      <pre className={devModeClassName}>
        aFollowing: {JSON.stringify(aFollowing, null, 4)}
      </pre>
      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          return (
            <><Post event={event} /></>
          );
        }
      })}
    </>
  );
};

export default GlobalFeed;
