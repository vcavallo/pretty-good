import React from 'react';
import Masthead from '../../mastheads/nostrMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/nostrNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class NostrHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Nostr: Home';
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
            <div className="h4">Nostr: Home</div>
          </div>
        </div>
      </>
    );
  }
}
