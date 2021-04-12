import React from 'react';
import ReactDOM from 'react-dom'
import styles from './index.css'

const opt = document.body;

class Puppy extends React.Component {
    constructor(props) {
      super(props);
      // 创建一个容器标签
    //   this.el = document.createElement("div");
    //   this.el.setAttribute("class",`${styles.optStyle}`)
    // this.props.children.setAttribute('style',this.props.style)
    }
  
    componentDidMount() {
        // 把容器标签挂到 catRoot DOM下
        //opt.append(this.props.children);
    }
  
    componentWillUnmount() {
        // this.props.par.current?.removeChild();
        //opt.removeChild(this.props.children);
    }
  
    render() {
        // 利用portal把Puppy的内容放到容器里
      return ReactDOM.createPortal(this.props.children,opt);
    }
  }

  export default Puppy
