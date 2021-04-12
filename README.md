# TagsInput封装注意事项 
###### **设计思想：**
1. 将整个TgsInput分为两个层次：操作层和展示层
2. 在展示层中，当有外部传入的tags数组的时候则运用ul标签套上antd中Tag来实现展示层的应用，当没有外部传入的时候则采用一个大的div来撑开展示层。
3. 在操作层中，则设计成一个大的div中包含了一个ul标签和一个input标签来模拟呈现，所有div中的焦点事件都绑定在input标签中，并将操作层放置在根节点上，这样当应用在例如form表单已经table标签内，不会由于添加tags而造成整个dom结构的重绘和重排
###### **API：**
1. onChange：onChange={(arr)=>{}} 可以实时获取当前输入修改tags数组后得到的新的数组内容。
2. verificationMethod：verificationMethod={(v)=>{}}（对单个tags数组内容做校验）
3. width（传入string类型，例如“300px”）有默认值为500px
4. tags（可传入，默认为空[]）
5. isRepetition（表示input输入的值是否可与tags中的数组重复，返回值为Boolean值，默认为false）
