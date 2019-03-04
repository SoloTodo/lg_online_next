import {ApiResourceObject, filterApiResourceObjectsByType} from "./react-utils/ApiResource";
import {formatCurrency} from "./react-utils/utils";
import {settings} from './settings'

export function getImportantCategories(apiResourceObjects) {
  const categories = filterApiResourceObjectsByType(apiResourceObjects, 'categories');
  const importantCategories = [];

  for (const category of categories) {
    const categoryMetadata = settings.categoriesMetadata[category.id];

    if (!categoryMetadata) {
      continue
    }

    importantCategories.push({
      ...category,
      ...categoryMetadata
    })
  }

  return importantCategories
}

export function lgonlineStateToPropsUtils(state, ownProps) {
  const countries = filterApiResourceObjectsByType(state.apiResourceObjects, 'countries');
  const stores = filterApiResourceObjectsByType(state.apiResourceObjects, 'stores').filter(store => settings.storeIds.includes(store.id));
  const categories = filterApiResourceObjectsByType(state.apiResourceObjects, 'categories');
  const currencies = filterApiResourceObjectsByType(state.apiResourceObjects, 'currencies');
  const importantCategories = getImportantCategories(state.apiResourceObjects);

  const chileCountry = countries.filter(country => country.id === settings.chileCountryId)[0];
  const clpCurrency = new ApiResourceObject(currencies.filter(currency => currency.id === settings.clpCurrencyId)[0]);

  const priceFormatter = value => formatCurrency(
      value,
      clpCurrency,
      null,
      '.',
      ','
  );

  return {
    categories,
    importantCategories,
    countries,
    stores,
    chileCountry,
    priceFormatter,
  };
}