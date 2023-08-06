import { nip19 } from 'nostr-tools';

const NewItemIdentifier = ({
  processNewItemText,
  setIsNewItemValid,
  setNewItemText,
  newListKind,
}) => {
  let placeholderText = 'NIP-19 identifier for an event: nevent, note';
  if (newListKind == 10000 || newListKind == 30000) {
    placeholderText = 'NIP-19 identifier for a person: npub, nprofile';
  }
  const updateNewItemText = () => {
    const e = document.getElementById('listItemTextarea');
    if (e) {
      const item = e.value;
      processNewItemText(item);
    }
  };
  return (
    <>
      <textarea
        id="listItemTextarea"
        style={{
          height: '46px',
          padding: '5px',
          width: '100%',
          height: "50px",
          boxSizing: 'border-box',
          border: '2px solid purple',
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: 'Arial',
        }}
        onChange={updateNewItemText}
        placeholder={placeholderText}
        data-nip19data=""
        data-nip19type=""
        data-isitemvalid=""
      />
    </>
  );
};

export default NewItemIdentifier;
