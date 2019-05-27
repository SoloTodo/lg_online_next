import React from 'react';
import {withRouter} from 'next/router'
import Select from "react-select";

import './OrderingDropdown.css'
import queryString from "query-string";

const options = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'price', label: 'Precio (menor a mayor)' },
  { value: '-price', label: 'Precio (mayor a menor)' }
];

class OrderingDropdown extends React.Component {
  constructor(props) {
    super(props);
    const initiallySelectedOption = this.parseOptionFromPath(props.router.asPath.split('?')[1]);


    this.state = {
      selectedOption: initiallySelectedOption
    }
  }

  componentDidMount() {
    this.props.router.events.on('routeChangeComplete', this.handleRouteChange)
  }

  componentWillUnmount() {
    this.props.router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  parseOptionFromPath(path) {
    const parameters = queryString.parse(path);
    return options.filter(option => option.value === parameters['ordering'])[0] || options[0];
  }

  handleRouteChange = path => {
    const newSelectedOption = this.parseOptionFromPath(path.split('?')[1]);
    this.setState({
      selectedOption: newSelectedOption
    })
  };

  handleOptionChange = newValue => {
    this.props.router.push(
      `${this.props.baseRouteHref}ordering=${newValue.value}`,
      `${this.props.baseRouteAs}ordering=${newValue.value}`
    )
  };

  render() {
    return <div className="d-flex flex-row align-items-center">
      <span className="mr-2">Ordenar por</span>
      <Select
        id="ordering_dropdown"
        options={options}
        placeholder="Ordenar por"
        value={this.state.selectedOption}
        onChange={this.handleOptionChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#a50034',
            primary75: '#f2004c',
            primary50: '#ff3f7c',
            primary25: '#ffa8c3',
          },
        })}
      />
    </div>
  }
}

export default withRouter(OrderingDropdown)