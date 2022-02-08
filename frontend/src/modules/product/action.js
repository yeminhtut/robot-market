import { generateApiActions } from '../../utils/reduxHelper'
export const actions = {
    ...generateApiActions('product', ['GET_ALL']),
}