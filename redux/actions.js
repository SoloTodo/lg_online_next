import {fetchJson} from '../react-utils/utils'
import {isIe} from "../utils";
import desiredProducts from "../products";
import {settings} from '../settings';

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
};

export const serverRenderClock = isServer => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
};

export const startClock = dispatch => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
};

export const incrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.INCREMENT })
};

export const decrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.DECREMENT })
};

export const resetCount = () => dispatch => {
  return dispatch({ type: actionTypes.RESET })
};

export const loadRequiredProducts = dispatch => {
  const desiredProductsDict = {};

  const slices = isIe() ? 2 : 1;
  const desiredProductsCount = desiredProducts.length;

  const promises = [];

  for (let i = 0; i < slices; i++) {
    let endPointUrl = 'products/available_entities/?page_size=300&';

    const startIndex = Math.floor(desiredProductsCount * i / slices);
    const endIndex = Math.ceil(desiredProductsCount * (i + 1) / slices);

    for (const productEntry of desiredProducts.slice(startIndex, endIndex)) {
      endPointUrl += `ids=${productEntry.productId}&`;
      desiredProductsDict[productEntry.productId] = productEntry
    }

    for (const storeId of settings.storeIds) {
      endPointUrl += `stores=${storeId}&`;
    }

    promises.push(fetchJson(endPointUrl))
  }

  return Promise.all(promises).then(values => {
    const productEntries = [];

    for (const rawProductEntries of values) {
      for (const productEntry of rawProductEntries.results) {
        const entities = productEntry.entities
          .filter(entity => entity.active_registry.cell_monthly_payment === null)
        if (!entities.length) {
          continue
        }

        productEntries.push({
          product: productEntry.product,
          entities,
          customFields: desiredProductsDict[productEntry.product.id]
        })
      }
    }

    dispatch({
      type: 'setProductEntries',
      productEntries: productEntries
    });
  });
};