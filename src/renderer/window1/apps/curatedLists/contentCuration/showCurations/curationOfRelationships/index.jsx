import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/contentCuration/showCurations';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';
import CurationOfRelationshipsRedux from './curationOfRelationshipsRedux';

export default class CurationOfRelationshipsMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Curation of Context Tree: Relationships';
    updateMastheadCenter(mastheadDescriptor);
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <CurationOfRelationshipsRedux />
          </div>
        </div>
      </>
    );
  }
}
