import React from 'react';
import { NavLink } from 'react-router-dom';

export default class PrettyGoodLeftNavbar1 extends React.PureComponent {
  render() {
    return (
      <>
        <div className="leftNavPanel leftNavPanelPrettyGood">
          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            style={{ marginBottom: '20px' }}
            to="/PrettyGoodHome"
          >
            <div style={{ fontSize: '12px' }}>PG</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            to="/NostrHome"
          >
            <div style={{ fontSize: '12px' }}>Nostr</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            to="/GrapevineHome"
          >
            <div style={{ fontSize: '12px' }}>Grapevine</div>
          </NavLink>

          <NavLink
            className={({ isActive }) => isActive ? "leftNavButton leftNavButtonActive" : "leftNavButton" }
            to="/ConceptGraphHome"
          >
            <div style={{ fontSize: '12px' }}>Concept Graph</div>
          </NavLink>
        </div>
      </>
    );
  }
}
