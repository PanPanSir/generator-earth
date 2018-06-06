function createListingPage(formActionStr, tableActionStr) {
    return function (previousState = {
        formData: {},
        tableData: {},
    }, action) {
        
        switch (action.type) {
            case formActionStr:
                return Object.assign( {}, previousState, {formData: action.payload} )
            
            case tableActionStr:
                return Object.assign( {}, previousState, {tableData: action.payload} )
            
            default:
                return previousState
        }
    
    }
}



function createItemPage(pupolateActionStr, resetActionStr) {
    return function (previousState = {
        formData: {},
    }, action) {
        
        switch (action.type) {
            case pupolateActionStr:
                return {formData: action.payload}
            
            case resetActionStr:
                return {formData: {}}
            
            default:
                return previousState
        }
    
    }
}



function createNormalObj(...items) {
    
    function _initState() {
        let o = {}
        items.forEach( item => {
            o[item.key] = item.defVal
        } )
        return o
    }
    
    function _k2action(k) {
        for (let i=0;i<items.length;i++) {
            if (k===items[i].key)
                return items[i].reducedBy
        }
        throw new Error('No action name matched. Check the reducer.')
    }
    
    return function (previousState = _initState(), action) {
        
        for (let k in previousState) {
            if (_k2action(k)===action.type) {
                return Object.assign( {}, previousState, {[k]: action.payload} )
            }
        }
        return previousState
    }
}



export default {
    createListingPage,
    createItemPage,
    createNormalObj,
}
