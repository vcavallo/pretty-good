import React from 'react';
import Masthead from 'renderer/window1/mastheads/curatedListsMasthead';
import LeftNavbar1 from 'renderer/window1/navbars/leftNavbar1/universalNavbar';
import LeftNavbar2 from 'renderer/window1/navbars/leftNavbar2/curatedLists/contentCuration/creators';
import { updateMainColWidth, updateMastheadCenter } from 'renderer/window1/lib/pg/ui';

export default class ContentCurationHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Content Creators';
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
            <div className="h4">Content Creators</div>
            <div>
              Pick a topic (and seed user) and view the list of profiles who CREATE that content.
              Just like all lists: accepted, rejected, pending.
            </div>
          </div>
        </div>
      </>
    );
  }
}
