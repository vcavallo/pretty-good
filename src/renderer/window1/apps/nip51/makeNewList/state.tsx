import { useState } from 'react';
import MakeNewListFunctions from './functions';

const MakeNewListState = () => {
  const [newListKind, setNewListKind] = useState(0);
  const [newListName, setNewListName] = useState('');
  const [newItemGroup, setNewItemGroup] = useState('nip19identifier'); //  plainText (tag: t) vs nip19identifier (tag: e or p)
  const [newItemText, setNewItemText] = useState(''); // the text field entered by the user, whether t, e, or p item type
  const [newItemType, setNewItemType] = useState(''); // '', 'npub', 'nprofile', 'note', 'nevent'
  const [newItemData, setNewItemData] = useState(''); // string (may be stringified JSON depending on newItemDataType)
  const [newItemDataType, setNewItemDataType] = useState(''); // '', 'string' or 'object'
  const [newItemHex, setNewItemHex] = useState(''); // '' or a string generated by nip19 function
  const [isNewItemValid, setIsNewItemValid] = useState('no'); // '', 'no', or 'yes'
  const [whichStep, setWhichStep] = useState(0); // whether or not to show new items panel
  const [aItems, setAItems] = useState([]); // an array of all items in the current list
  return (
    <>
      <div>
        <div
          id="aItemsContainer"
          data-aitems={JSON.stringify(aItems)}
          style={{ display: 'none' }}
        >
          aItems: {JSON.stringify(aItems)};<br />{' '}
          {aItems.map((item) => {
            return (
              <>
                <div>{JSON.stringify(item)}</div>
              </>
            );
          })}
        </div>

        <div style={{display: "none", fontSize: "12px"}}>
          <div>newListKind: {newListKind}</div>
          <div>newListName: {newListName}</div>
          <div>newItemGroup: {newItemGroup}</div>
          <div>newItemText: {newItemText}</div>
          <div>newItemType: {newItemType}</div>
          <div>newItemData: {newItemData}</div>
          <div>newItemDataType: {newItemDataType}</div>
          <div>newItemHex: {newItemHex}</div>
          <div>isNewItemValid: {isNewItemValid}</div>
          <div>whichStep: {whichStep}</div>
          <div>aItems: {JSON.stringify(aItems)}</div>

        </div>

        <MakeNewListFunctions
          setNewListKind={setNewListKind}
          setNewListName={setNewListName}
          setNewItemGroup={setNewItemGroup}
          setNewItemText={setNewItemText}
          setNewItemType={setNewItemType}
          setNewItemData={setNewItemData}
          setNewItemDataType={setNewItemDataType}
          setNewItemHex={setNewItemHex}
          setIsNewItemValid={setIsNewItemValid}
          setWhichStep={setWhichStep}
          setAItems={setAItems}

          newListKind={newListKind}
          newListName={newListName}
          newItemGroup={newItemGroup}
          newItemText={newItemText}
          newItemType={newItemType}
          newItemData={newItemData}
          newItemDataType={newItemDataType}
          newItemHex={newItemHex}
          isNewItemValid={isNewItemValid}
          whichStep={whichStep}
          aItems={aItems}
        />
      </div>
    </>
  );
};
export default MakeNewListState;
