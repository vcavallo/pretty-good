import React from 'react';
import { NavLink } from 'react-router-dom';

export default class LeftNavbar2 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNav2Panel leftNav2PanelPrettyGood">
          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodSettings"
          >
            settings
          </NavLink>

          <hr/>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/PrettyGoodHelloWorld"
          >
            Hello World
          </NavLink>

          <hr/>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/VisjsHelloWorld"
          >
            Vis.js
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/VisjsHelloWorldMultiGraph"
          >
            Vis.js: multi graph
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/DataTablesHelloWorld"
          >
            dataTables
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/ReactDataTableComponentHelloWorld"
          >
            React Data Table Component
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNav2Button leftNav2ButtonActive" : "leftNav2Button" }
            end to="/PrettyGoodHome/ExploreNostrNotesByKind"
          >
            Explore Nostr Notes by Kind
          </NavLink>

        </div>
      </>
    );
  }
}
