/**
 * Created by yidi.zhao on 2018/6/11.
 */
export const actions = {
    UPDATE_QUERY: 'home.updateQuery'
};

export function updateQuery(flag){
    return {
        type: actions.UPDATE_QUERY,
        payload: flag
    }
}