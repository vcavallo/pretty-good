import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Lists from './lists';

const rotate360 = keyframes`
from {
   transform: rotate(0deg);
  }

 to {
   transform: rotate(360deg);
    }
`;

export const CustomLoader = ({ aCuratedListIDs, controlPanelSettings }) => {
  const [loader, setLoader] = React.useState(true);
  const [numLists, setNumLists] = React.useState(aCuratedListIDs.length);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  if ((numLists==0) && (loader)) {
    return (
      <>
        <div style={{ padding: '24px' }}>
          <center>
            <Spinner />
            <div>Loading List data ...</div>
          </center>
        </div>
      </>
    );
  }
  return (
    <>
      <Lists controlPanelSettings={controlPanelSettings} />
    </>
  );
};

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 500px;
  height: 500px;
  border-radius: 50%;
`;

const ListsRedux = () => {
  const controlPanelSettings = useSelector(
    (state) => state.controlPanelSettings
  );

  const oCuratedLists = useSelector((state) => state.curatedLists.curatedLists);
  const aCuratedListIDs = Object.keys(oCuratedLists);

  const devMode2 = useSelector(
    (state) => state.myNostrProfile.devModes.devMode2
  );
  let devElemClass = 'devElemHide';
  if (devMode2) {
    devElemClass = 'devElemShow';
  }

  return (
    <>
      <CustomLoader aCuratedListIDs={aCuratedListIDs} controlPanelSettings={controlPanelSettings} />
    </>
  );
};

export default ListsRedux;
