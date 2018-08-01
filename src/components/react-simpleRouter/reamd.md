# react 前端路由  simpleRouter
## import组件
`import {Router, Route} from '@qnpm/react-simpleRouter';`
## 使用组件

```
render(){
    return (
        <Router path="/" component={Home} params={} transitionTime='250' showTransition={true}>     //params参数   showTransition 是否用加过渡样式
            //添加各子路由信息      path路径,可以带参数或通配   component对应组件
            <Route path="/contacterFiller/:id" component={ContacterFiller}/>                        
            <Route path="/contacterSelector" component={ContacterSelector}/>
            <Route path="/addPassenger" component={AddPassenger}/>
            <Route path="/editPassenger/:id" component={AddPassenger}/>
        </Router>
    )
}
```

若showTransition为true
在路由切换时,在transitionTime时间内当前页面和下一页面将回加上对应class
前进:
当前页面:page-go-leave
下一页面:page-go-enter

后退:
当前页面:page-back-leave
下一页面:page-back-enter
