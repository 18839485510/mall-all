import {CHNAGE_TAB_BAR_ACTIVE} from './types'

export default {
    [CHNAGE_TAB_BAR_ACTIVE](state,payload){
         state.active = payload
    }
}