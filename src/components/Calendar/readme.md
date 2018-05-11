###使用
    ```
    初始化组件
    <Components calendar={AnimateCalendar}/>
    ```
###配置  
    支持单程日历选择，不区分国内国际，不请求价格
```
config = {
    startDay: '2016/06/23',     //开始日期  string or Date Objective    不传默认今天
    endDay: '2018/06/23',       //结束日期  string or Date Objective    不传默认一年后
    selectGoDay: '2016/06/23',  //上次选中的出发日期 string or Date Objective 
    useHeader: true,            //是否用header 默认true
    onSelect: function (data) { //完成回调
        console.log(data)
    },
    quickSearch: function () {  //立即搜索回调，有表示开启立即搜索
        console.log('search')
    }
};

//打开
COMPONENT.open('calendar', config);

//更新配置
COMPONENT.update('calendar', config);

//关闭
history.back();

```
###回调返回
```
 {
    isInter:false,      //是否国际
    isRoundWay:false,   //是否往返
    selectBackDate:""   //返程日期  Date Object
    selectGoDate :      //去程日期  Date Object
 }
```