import {fetchJson} from '../react-utils/utils'
import {isIe} from "../utils";
import desiredProducts from "../products";
import {settings} from '../settings';

export const loadRequiredProducts = dispatch => {
  const desiredProductsDict = {};

  const slices = isIe() ? 2 : 1;
  const desiredProductsCount = desiredProducts.length;

  const promises = [];

  for (let i = 0; i < slices; i++) {
    let endPointUrl = 'products/available_entities/?serializer=minimal&exclude_with_monthly_payment=1&page_size=300&';

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
        const entities = productEntry.entities;
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