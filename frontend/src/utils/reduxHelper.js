import forEach from 'lodash/forEach'
import capitalize from 'lodash/capitalize'

const API_ACTION_TYPES = ['GET_ALL', 'GET', 'CREATE', 'DELETE', 'UPDATE', 'EXPORT', 'IMPORT', 'DOWNLOAD', 'UPLOAD']

export function generateReduxActions(actionArrays) {
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

export function getLoadingStateName(entityName, action) {
    const actionName = action
        .split('_')
        .map(capitalize)
        .join('')
    return `isLoading${actionName}${capitalize(entityName)}`
}

export function generateApiActions(entityName, actions) {
    entityName = entityName.toUpperCase()
    return actions
        .map(action => {
            action = action.toUpperCase()
            if (API_ACTION_TYPES.indexOf(action) < 0) {
                // eslint-disable-next-line no-console
                console.warn(`Action name: ${action} is invalid.`)
            }

            return {
                [`${entityName}_${action}_REQUEST`]: (type, payload = {}) => {
                    return { type, payload }
                },

                [`${entityName}_${action}_RESPONSE`]: (type, error, payload) => {
                    return { type, payload, error }
                }
            }
        })
        .reduce(
            (result, action) => ({
                ...result,
                ...action
            }),
            {}
        )
}

export function generateDefaultState(entityName, actions) {
    entityName = entityName.toLowerCase()
    return actions
        .map(action => {
            if (API_ACTION_TYPES.indexOf(action.toUpperCase()) < 0) {
                // eslint-disable-next-line no-console
                console.warn(`Action name: ${action} is invalid.`)
            }

            return {
                [getLoadingStateName(entityName, action)]: false
            }
        })
        .reduce(
            (result, action) => ({
                ...result,
                ...action
            }),
            {
                [entityName]: {},
                [`${entityName}List`]: []
            }
        )
}

export function handleGeneratedApiActions(state, action, moduleStateName) {
    const pattern = /^([^_]+)_([^_]+)_(.+)_(REQUEST|RESPONSE)$/
    if (!pattern.test(action.type)) {
        return state
    }

    // eslint-disable-next-line no-unused-vars
    let [fullName, moduleName, entityName, actionName, actionState] = pattern.exec(action.type)
    const loadingStateName = getLoadingStateName(entityName, actionName)
    entityName = entityName.toLowerCase()

    if (moduleStateName && moduleName !== moduleStateName.toUpperCase()) {
        return state
    }

    if (actionState === 'REQUEST') {
        return {
            ...state,
            [loadingStateName]: true,
            error: null
        }
    }

    return {
        ...state,
        [loadingStateName]: false,
        error: action.error
    }
}
