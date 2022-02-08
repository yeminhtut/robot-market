import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import _map from "lodash/map";

import { actionTypes, actions } from "../../AppActions";
import * as productApi from "../../modules/product/api";

export const getTenantList = (action$) =>
  action$.pipe(
    ofType(actionTypes.PRODUCT.PRODUCT_GET_ALL_REQUEST),
    switchMap((action) =>
      from(productApi.getProductList(action.payload)).pipe(
        map((data) => {
          return actions.PRODUCT.PRODUCT_GET_ALL_RESPONSE(null, {list: data});
        }),
        catchError((err) => of(actions.PRODUCT.PRODUCT_GET_ALL_RESPONSE(err, {})))
      )
    )
  );
