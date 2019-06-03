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
import LgWeek from "../components/Landings/LgWeek/LgWeek";
import Modernizate from "../components/Landings/Modernizate/Modernizate";
import EspecialLavado
  from "../components/Landings/EspecialLavado/EspecialLavado";
import SaltateLaFilaProducts
  from "../components/Landings/SaltateLaFila/SaltateLaFilaProducts";
import DuplaPerfectaLG
  from "../components/Landings/DuplaPerfectaLG/DuplaPerfectaLG";

const landingComponentsDict = {
  did: Did,
  instantpartysummer: InstantPartySummer,
  twinwash: TwinWash,
  oportunidadesdelasemana: OportunidadesDeLaSemana,
  instaviewbundle: NeoChef,
  neobundle: NeoChef,
  planperfecto: PlanPerfecto,
  oledn1: OledN1,
  lgweek: LgWeek,
  modernizate: Modernizate,
  especial_lavado: EspecialLavado,
  saltatelafila: SaltateLaFilaProducts,
  saltatelafilalanding: SaltateLaFilaProducts,
  DuplaPerfectaLG: DuplaPerfectaLG,
};

class Landing extends React.Component {
  static async getInitialProps(ctx) {
    const { reduxStore } = ctx;
    const productEntries = reduxStore.getState().productEntries;

    if (!productEntries) {
      await reduxStore.dispatch(loadRequiredProducts);
    }

    const LandingComponent = landingComponentsDict[ctx.query.landing];

    let landingProps = {};

    if (LandingComponent.getInitialProps) {
      landingProps = await LandingComponent.getInitialProps(ctx)
    }

    return {
      landingProps
    }
  }

  render() {
    const LandingComponent = landingComponentsDict[this.props.router.query.landing];

    return <React.Fragment>
      <LandingComponent {...this.props.landingProps} />
    </React.Fragment>
  }
}

export default withRouter(Landing);