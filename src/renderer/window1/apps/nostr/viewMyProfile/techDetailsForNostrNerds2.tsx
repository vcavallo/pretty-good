import { useSelector } from 'react-redux';

const TechDetailsForNostrNerds = ({myNostrProfile}) => {
  const { devMode3 } = useSelector((state) => state.myNostrProfile.devModes);
  let devElemClass = 'devElemHide';
  if (devMode3) {
    devElemClass = 'devElemShow';
  }
  const elem_id = "technicalDetailsForNostrDevsContainer2"; // add event_id or some other unique identifier if multiple details per page
  const toggleViewDetails = () => {
    const e = document.getElementById(elem_id);
    const currentState = e.style.display;
    if (currentState == 'none') {
      e.style.display = 'block';
    }
    if (currentState == 'block') {
      e.style.display = 'none';
    }
  };
  return (
    <>
      <div className={devElemClass}>
        <div>
          <span style={{ fontSize: '10px' }}>

          </span>
          <button
            type="button"
            onClick={() => toggleViewDetails()}
            className="doSomethingButton techDetailsToggleButton"
          >
            🤓
          </button>
        </div>
        <div
          id={elem_id}
          style={{
            display: 'none',
            fontSize: '12px',
            border: '1px dashed grey',
            padding: '3px',
            height: '200px',
            overflow: 'auto',
          }}
        >
          <div>myNostrProfile: my active profile as stored in redux</div>
          <pre>{JSON.stringify(myNostrProfile,null,4)}</pre>
        </div>
      </div>
    </>
  );
};
export default TechDetailsForNostrNerds;
