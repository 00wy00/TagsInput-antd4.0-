import React from 'react';
import { Input, Tag, message } from 'antd'
import styles from './index.less'
import Puppy from './Poppy'

type Props = {
    isRepetition:Boolean,
    tags:Array<number|string>,
    wrapWidth:string,
    onChange:(arr:Array<any>)=>Array<number|string>,
    verificationMethod:(item:String|number)=>Boolean
}
 
type State = {
    isRepetition:Boolean,
    tags:{name:string|number,id:number,newBardor:string}[],
    inputValue:string | number | readonly string[] | undefined,
    focusStyle:string | undefined,
    tagId:number,
    delStyle:number|undefined|string,
    delId:String,
    tagInputWidth:string | number|undefined,
    focusTop:number|undefined,
    focusLeft:number|undefined,
    isSpanBlock:string | undefined,
    ulMaxWidth:string | number|undefined,
}

class TagsInput extends React.Component< Props,State> {
    inputRef = React.createRef<Input>();
    blurInputRef=React.createRef<HTMLDivElement>();
    blurDivRef=React.createRef<HTMLDivElement>();
    focusDivRef=React.createRef<HTMLDivElement>();
    ulRef=React.createRef<HTMLUListElement>();
    timeout:NodeJS.Timeout
    constructor(props:Props) {
        super(props)
        this.blurInputRef = React.createRef()
        this.blurDivRef = React.createRef()
        this.focusDivRef = React.createRef()
        this.ulRef = React.createRef()
        this.state = {
            isRepetition: this.props.isRepetition || false,
            tags: [],
            inputValue: '',
            focusStyle: 'block',
            tagId: 0,
            delStyle: '10px',
            delId: 'delId',
            tagInputWidth: this.props.wrapWidth || '500px' ,
            focusTop: 0,
            focusLeft: 0,
            isSpanBlock: 'none',
            ulMaxWidth: '0px'  
        }
    }
    componentDidMount() {
        const { tagInputWidth } = this.state
        // const {tags} = this.props
        let arr:any[] = []
        let num = 0
        if(this.props.tags){
         arr = this.props.tags.map((v) => ({ name: v, id: num++, newBardor: '' })) 
        }
        this.innerVerification(arr)
        const focusDivTop = this.focusDivRef.current?.getBoundingClientRect().top
        const focusDivLeft = this.focusDivRef.current?.getBoundingClientRect().left
        let w = parseInt(String(tagInputWidth).slice(0, String(tagInputWidth).length-2))
        let maxWidth:number|string = w - 30
        setTimeout(() => {
            let ulWidth = this.ulRef.current?.offsetWidth
            if (ulWidth && w - ulWidth < 31) {
                this.setState({
                    isSpanBlock: 'block'
                })
            }
            else {
                this.setState({
                    isSpanBlock: 'none'
                })
            }
        }, 0)
        maxWidth = maxWidth + 'px'
        this.setState({
            focusStyle: 'none',
            focusTop: focusDivTop,
            focusLeft: focusDivLeft,
            ulMaxWidth: maxWidth,
            tagId: num,
            tags: arr
        })
    }
    addTags = (e:any) => {
        const { tags, isRepetition, tagId } = this.state
        if (e.target.value) {
            let arr = tags
            let value = e.target.value
            let id = tagId
            id++
            if (isRepetition) {
                this.innerVerification([...arr, { 'name': value, 'id': id, newBardor: '' }])
                this.setState({
                    inputValue: '',
                    tagId: id
                })
            } else if (isRepetition == false) {
                arr = arr.filter((item) => item.name !== value)
                this.innerVerification([...arr, { 'name': value, 'id': id, newBardor: '' }])           
                this.setState({
                    inputValue: '',
                    tagId: id
                })
            }
            if (this.props.onChange) {
                this.props.onChange([...arr, { 'name': value, 'id': id, newBardor: '' }])
            }
        } else {
            message.error('无数据')
        }
    }
    innerVerification = (arr: any[]) => {
        if (this.props.verificationMethod) {
            let isArr = arr.map((v: { name: any; }) => this.props.verificationMethod(v.name))
            for (var i = 0; i < isArr.length; i++) {
                if (isArr[i] == false) {
                    arr[i].newBardor = '1px solid red'
                }
            }
        }
        this.setState({
            tags:arr
        })
    }
    preventDefault = (id: number|string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        let j = parseInt(String(id))
        let newArr = this.state.tags.filter((item) => item.id !== j)
        this.setState({
            tags: newArr
        })
        if (this.props.onChange) {
            this.props.onChange([...newArr])
        }
        this.showSpan()
    }
    emitEmpty = () => {
        this.setState({
            tags: [],
            inputValue: '',
        })
    }
    showValue = (e: { target: { value: any; }; }) => {
        this.setState({
            inputValue: e.target.value
        })
    }
    showSpan = () => {
        const { tagInputWidth } = this.state
        const ulWidth = this.ulRef.current?.offsetWidth
        let w = parseInt(String(tagInputWidth).slice(0, String(tagInputWidth).length-2))
        if (ulWidth && w - ulWidth < 31) {
            this.setState({
                isSpanBlock: 'block'
            })
        } else {
            this.setState({
                isSpanBlock: 'none'
            })
        }
    }
    focus = () => {
        const blurDivLeft = this.blurDivRef.current?.getBoundingClientRect().left
        const clientHeight = document.body.clientHeight
        const blurDivTop = this.blurDivRef.current?.getBoundingClientRect().top
        let left = blurDivLeft
        let top = blurDivTop && blurDivTop - clientHeight
        this.setState({
            focusStyle: 'block',
            delStyle: '10px',
            focusTop: top,
            focusLeft: left,
            isSpanBlock: 'none'
        }, this.render)
        setTimeout(() => {
            if (this.inputRef.current) {
                this.inputRef.current.focus();
            }
        })
    }
    onInnerFocus = () => {
        clearTimeout(this.timeout);
        this.inputRef.current?.focus();
    }
    blurChange = (e: any) => {
        this.timeout = setTimeout(() => {
            if (document.activeElement?.parentNode?.nodeName === 'SPAN') {
                if (document.activeElement.parentNode.getAttribute('del')) {
                    this.emitEmpty()
                }
                else if (document.activeElement.parentNode.getAttribute('nums')) {
                    let id = document.activeElement.parentNode.getAttribute('nums')
                    this.preventDefault(id, e)
                }
            }
            this.showSpan()
            this.setState({
                delStyle: '100000px',
                focusStyle: 'none',
            })

        }, 100)
    }
    renderTags() {
        const { tags } = this.state
        return (
            tags.map((item) => (<li className={styles.liStyle} key={item.id} >
                <Tag closable onClose={(e) => this.preventDefault(item.id, e)} nums={item.id}  style={{ border: item.newBardor }} onFocus={this.onInnerFocus}>
                    {item.name}
                </Tag>
            </li>))
        )
    }
    render() {
        const { inputValue, focusStyle, delStyle, delId, tagInputWidth, ulMaxWidth, focusTop, tags, focusLeft, isSpanBlock } = this.state
        return (
            <div style={{ width: tagInputWidth }} >
                <div className={styles.wrap} ref={this.blurDivRef} onClick={this.focus} style={{ minWidth: '20em' }}>
                    <ul className={styles.ulNoneClass} ref={this.ulRef} style={{ maxWidth: ulMaxWidth }}>
                        {this.renderTags()}
                    </ul>
                    <span style={{ display: isSpanBlock}} className={styles.ellipsisSpan}>...</span>
                </div>
                <Puppy>
                    <div ref={this.focusDivRef}
                        className={styles.optStyle}
                        onClick={this.focus}
                        onBlur={this.blurChange}
                        onFocus={this.onInnerFocus}
                        style={{ display: focusStyle, top: focusTop, left: focusLeft, width: tagInputWidth }}
                        tabIndex={-1}>
                        <ul className={styles.ulClass} >
                            {this.renderTags()}
                            <li className={styles.inputLiStyle} style={{ float: 'left', listStyle: "none" }} >
                                <Input
                                    className={styles.inputClass}
                                    ref={this.inputRef}
                                    onPressEnter={this.addTags}
                                    style={{ width: "100%" }}
                                    onChange={this.showValue}
                                    value={inputValue}
                                />
                            </li>
                        </ul>
                        <div className={styles.delIcon} style={{ right: delStyle }}>
                            {
                                inputValue || tags.length > 0 ? <span className="ant-input-suffix" onClick={this.emitEmpty} del={delId}>
                                    <span role="button" aria-label="close-circle" tabIndex={-1} className="anticon anticon-close-circle ant-input-clear-icon">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
                                            </path>
                                        </svg>
                                    </span>
                                </span> : <span />
                            }
                        </div>
                    </div>
                </Puppy>
            </div>

        )
    }
}
export default TagsInput

