import React from 'react';
import { NavLink } from 'react-router-dom';
import AvatarElem from './nostrAvatarElem';

export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <div className="mastheadContainer">
          <div className="mastheadLeftContainer">Grapevine</div>

          <div id="mastheadCenterContainer" className="mastheadCenterContainer">
            center
          </div>

          <div className="mastheadRightContainer">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/GrapevineHome/GrapevineProfile"
            >
              <div style={{ fontSize: '20px' }}>👤</div>
              <div style={{ fontSize: '10px' }}>profile</div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'mastheadNavButton mastheadNavButtonActive'
                  : 'mastheadNavButton'
              }
              end
              to="/GrapevineHome/GrapevineSettings"
            >
              <div style={{ fontSize: '20px' }}>⚙️</div>
              <div style={{ fontSize: '10px' }}>settings</div>
            </NavLink>
          </div>
        </div>
        <div className="mastheadSubBanner mastheadSubBannerGrapevine">
          <div>grapevine subheading</div>
        </div>
      </>
    );
  }
}
