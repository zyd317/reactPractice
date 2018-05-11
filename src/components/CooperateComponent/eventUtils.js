/**
 * Created by yidi.zhao on 2018/5/11.
 */
export function createEvent(name, data) {
    let event, createEvent = document.createEvent
        ? function(name, data){
            event = document.createEvent('HTMLEvents');
            event.initEvent(name, true, true);
            event.detail = data;
            return event;
        }
        : function(name, data){
            event = document.createEventObject();
            event.eventType = name;
            event.detail = data;
            return event;
        };
    return createEvent(name, data);
}

export function dispatchEvent(element, event) {
    var triggerEvent = document.createEvent
        ? function(element, event){
            element.dispatchEvent(event);
        }
        : function(element, event){
            element.fireEvent('on' + event.eventType, event);
        };
    return triggerEvent(element, event);
}

export function trigger(name, data){
    var eve = createEvent(name, data);
    dispatchEvent(document, eve);
}