#使用方法   
```
let props = {
            title: '日历',                    // string or component,
            leftIconClass: 'icon i-back',     //icon
            leftBtnTxt: '取消',               // 文本，与icon二选一
            leftBtnClick: function,          //回调方法
            rightBtnTxt: '完成',              
            rightIconClass: 'icon i-finish',
            rightBtnClick: function, //回调方法
            extClass: 'special-header'    //额外的样式class
        };
        return (
            <div>
                <Header {...props}/>
            </div>
        )
```
#箭头符号大全
单程: ⇀
往返：⇌
←↑→↓↔↕↖↗↘↙↚↛↜↝↞↟↠↡↢↣↤↥↦↧↨↩↪↫↬↭↮↯↰↱↲↳↴↵↶↷↸↹↺↻↼↽↾↿⇀⇁⇂⇃
⇄⇅⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇚⇛⇜⇝⇞⇟⇠⇡⇢⇣⇤⇥⇦⇧⇨⇩⇪
➔➘➙➚➛➜➝➞➟➠➡➢➣➤➥➦➧➨➩➪➫➬➭➮➯➱➲➳➴➵➶➷➸➹➺➻➼➽➾