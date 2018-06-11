/**
 * Created by yidi.zhao on 2018/6/11.
 */
export const actions = {
    SHOW_CHANGE_ALERT: 'home.showChangeAlert'
}

export function showChangeAlert(flag){
    return {
        type: actions.SHOW_CHANGE_ALERT,
        payload: flag
    }
}