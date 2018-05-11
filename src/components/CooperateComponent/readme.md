## usage
```
    import CooperateComponent from '../CooperateComponent';
    import Calendar from '../Calendar';
    <CooperateComponent calendar={Calendar} />
    
    打开组件：
        window.COMPONENT.open("calendar", connfig);
```

## 要求
承载的组件必须自己控制*组件的显示和影藏*且 必须包含*open,close,update*这三个操作API