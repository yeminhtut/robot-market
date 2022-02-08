import forEach from 'lodash/forEach'
import { actions as productActions } from './modules/product/action'

function generateReduxActions(actionArrays) {
    const actions = {},
        actionTypes = {}

    forEach(actionArrays, action => {
        const { namespace } = action
        const moduleActions = action.actions
        actionTypes[namespace] = Object.keys(moduleActions).reduce(
            (types, type) => ({ ...types, [type]: `${namespace}_${type}` }),
            {}
        )
        actions[namespace] = Object.keys(moduleActions).reduce(
            (allActions, type) => ({
                ...allActions,
                [type]: (...args) => {
                    return moduleActions[type](`${namespace}_${type}`, ...args)
                }
            }),
            {}
        )
    })
    return {
        actions,
        actionTypes
    }
}

const { actions, actionTypes } = generateReduxActions([
    {
        namespace: 'PRODUCT',
        actions: productActions
    }
])

export { actions, actionTypes }
