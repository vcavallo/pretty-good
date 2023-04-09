import React from 'react';
import { asyncSql } from 'renderer/window1/lib/pg/asyncSql';
import List from './list';

export default class ListsWithScores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aListsData: [],
      oMyNostrProfileData: {},
      oNostrProfilesData: {},
    };
  }

  async componentDidMount() {
    const sql1 = ` SELECT * FROM curatedLists `;
    const aListsData = await asyncSql(sql1);
    this.setState({ aListsData });

    const sql2 = ' SELECT * FROM myNostrProfile WHERE active = true ';
    const oMyNostrProfileData = await asyncSql(sql2, 'get');
    this.setState({ oMyNostrProfileData });

    const sql3 = ' SELECT * FROM nostrProfiles ';
    const aNostrProfilesData = await asyncSql(sql3);
    const oNostrProfilesData = {};
    for (let p = 0; p < aNostrProfilesData.length; p++) {
      const oNostrProfileData = aNostrProfilesData[p];
      oNostrProfilesData[oNostrProfileData.pubkey] = oNostrProfileData;
    }
    this.setState({ oNostrProfilesData });
  }

  render() {
    return (
      <>
        <div className="h3">List with Scores</div>
        {this.state.aListsData.map((oListData) => {
          return (
            <>
              <List
                oListData={oListData}
                oMyNostrProfileData={this.state.oMyNostrProfileData}
                oNostrProfilesData={this.state.oNostrProfilesData}
              />
            </>
          )
        })}
      </>
    );
  }
}
