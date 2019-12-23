import React, { Component } from 'react'
import "../App.css"
// import { Input } from 'antd'
// import { Button } from 'antd'
import axios from 'axios'
import { Input, Button } from 'reactstrap'
axios.defaults.timeout=5000
export default class Text extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            display: '请输入内容'
        }
    }
    mapResultToId = new Map([[0, 0], [1, 0], [2, 1], [3, 2], [4, 3], [5, 3], [6, 4], [7, 5], [8, 5], [9, 6], [10, 7], [11, 8], [12, 8], [13, 8]])
    handleDelete = () => {
        this.setState({
            text: '',
            display: '请输入内容'
        })
    }
    handleSubmit = () => {
        axios.post('http://127.0.0.1:4555/result',{"content": this.state.text}).then(res=>{
            let index = this.mapResultToId.get(res.data.index-1)
            this.props.onPress(index)
            let display = '分类的结果是:' + this.props.mapIdtoText.get(index)
                this.setState({ text: '', display: display })
        }).catch(e=>{
            console.log(e)
            this.setState({
                display:'请求错误，请重试'
            })
        })
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value,
            display: '选择提交或者清除', 
        })
    }
    render() {
        return (
            <div className="text-area">
                <div className="line">{this.state.display}</div>
                <div>
                    <Input type="textarea" rows={10} cols={30}
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <Button className="sbutton" color="primary" size="lg"
                        onClick={this.handleSubmit}
                    >提交</Button>
                    <Button className="sbutton" color="danger" size="lg"
                        onClick={this.handleDelete}
                    >清除</Button>
                </div>
            </div>
        )
    }
}
