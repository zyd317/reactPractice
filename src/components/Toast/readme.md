###使用
    ```
    初始化组件
    <Components toast={AnimateToast}/>
    ```
###配置  
    支持配置toast，show的text和时间
```
config = {
    text: '',
    time: 1000
};

// 显示
COMPONENT.open('toast');

// 更新配置, 传入弹出toast和配置
COMPONENT.update('toast', config);

// 隐藏
COMPONENT.close('toast');

```