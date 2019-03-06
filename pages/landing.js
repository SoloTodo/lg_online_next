import React from 'react';
import { withRouter } from 'next/router'
import {loadRequiredProducts} from "../redux/actions";
import Did from "../components/Landings/Did/Did";
import InstantPartySummer
  from "../components/Landings/InstantPartySummer/InstantPartySummer";
import TwinWash from "../components/Landings/TwinWash/TwinWash";
import OportunidadesDeLaSemana
  from "../components/Landings/OportunidadesDeLaSemana/OportunidadesDeLaSemana";
import NeoChef from "../components/Landings/NeoChef/NeoChef";
import PlanPerfecto from "../components/Landings/PlanPerfecto/PlanPerfecto";
import OledN1 from "../components/Landings/OledN1/OledN1";

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
      oportunidadesdelasemana: OportunidadesDeLaSemana,
      instaviewbundle: NeoChef,
      neobundle: NeoChef,
      planperfecto: PlanPerfecto,
      oledn1: OledN1
    };

    const LandingComponent = landingComponentsDict[this.props.router.query.landing];

    return <React.Fragment>
      <LandingComponent />
    </React.Fragment>
  }
}

export default withRouter(Landing);