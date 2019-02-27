import React from 'react';
import { withRouter } from 'next/router'
import {loadRequiredProducts} from "../redux/actions";
import Did from "../components/Landings/Did/Did";
import InstantPartySummer
  from "../components/Landings/InstantPartySummer/InstantPartySummer";
import TwinWash from "../components/Landings/TwinWash/TwinWash";

class Landing extends React.Component {
  static async getInitialProps(ctx) {
    const { reduxStore } = ctx;
    const productEntries = reduxStore.getState().productEntries;

    if (!productEntries) {
      await reduxStore.dispatch(loadRequiredProducts);
    }

    return {}
  }

  render() {
    const landingComponentsDict = {
      did: Did,
      instantpartysummer: InstantPartySummer,
      twinwash: TwinWash,
    };

    const LandingComponent = landingComponentsDict[this.props.router.query.landing];

    return <React.Fragment>
      <LandingComponent />
    </React.Fragment>
  }
}

export default withRouter(Landing);