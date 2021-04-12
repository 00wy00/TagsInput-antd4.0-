# TagsInput-antd4.0-
运用antd组件编写
运用了react-dom中的portal方法，把操作层放到了根节点上，不会影响到整个dom结构的重绘和重排，
设计结构   分为一个大的div包裹着一个ul和一个input标签组件，在展现层表现为一个类似于大的input的样子。
能够进行
onChang（）
verificationMethod（用来做校验的，详细看代码）等方法的运用，传参都为tags（数组）形式，
width（传入string类型，例如“300px”）有默认值为500px
tags（可传入，默认为空[]）
isRepetition（表示input输入的值是否可与tags中的数组重复，参数为Boolean值，默认为false）


