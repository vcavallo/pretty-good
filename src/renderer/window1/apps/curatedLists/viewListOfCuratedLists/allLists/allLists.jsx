import { useSelector, useDispatch } from 'react-redux';
import { useNostrEvents, dateToUnix } from 'nostr-react';
import { doesEventValidate } from 'renderer/window1/lib/nostr/eventValidation';
import { addCuratedListEventToSql } from 'renderer/window1/lib/pg/sql';
import SourceToggleSwitch from 'renderer/window1/components/toggleSwitchSmall';
import { updateViewListsLoadStoredData } from 'renderer/window1/redux/features/curatedLists/settings/slice';
import List from './list';

const AllLists = () => {
  const viewListsLoadStoredData = useSelector((state) => state.curatedListsSettings.viewListsLoadStoredData);
  const dispatch = useDispatch();
  if (viewListsLoadStoredData) {
    // LOAD DATA FROM SQL
  }
  if (!viewListsLoadStoredData) {
    // LOAD DATA FROM NOSTR
  }
  const kind0 = 9901;
  /*
  // tags used to create lists, and used to filter them
  const aTag0 = ["c","concept-graph-testnet-901"];
  const aTag1 = ["t","createInstance"]; // t for type of concept graph event
  const aTag2 = ["s","nostrCuratedList"]; // if t = createInstance; s for slug of the parent concept of the instance (alternate: e for the event id of the parent concept)
  */
  const { events } = useNostrEvents({
    filter: {
      since: 0,
      kinds: [kind0],
      '#c': ['concept-graph-testnet-901'],
      '#t': ['createInstance'],
      '#s': ['nostrCuratedList'],
    },
  });
  let toggleSwitchLabel = "viewListsLoadStoredData";
  let initState = viewListsLoadStoredData;
  const processStateChange = (newState) => {
    console.log("processStateChange; newState: "+newState);
    dispatch(updateViewListsLoadStoredData(newState))
  }
  events.sort((a, b) => parseFloat(b.created_at) - parseFloat(a.created_at));
  return (
    <>
    <div style={{float:"right"}}>
      load stored data:{' '}
      <SourceToggleSwitch
        label={toggleSwitchLabel}
        processStateChange={(newState) => processStateChange(newState)}
        initState={initState}
      />
    </div>

      {events.map((event, index) => {
        if (doesEventValidate(event)) {
          addCuratedListEventToSql(event);
          return (
            <>
              <List event={event} />
            </>
          );
        }
      })}
    </>
  );
};

export default AllLists;
