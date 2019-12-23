import React, { Component } from 'react'
import "../App.css"
// import { Input } from 'antd'
// import { Button } from 'antd'
import { Input, Button } from 'reactstrap'
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
        const httpRequest = new XMLHttpRequest();
        this.setState({ display: '正在提交...' })
        httpRequest.open('POST', 'http://10.24.9.203:4555/result', true);
        httpRequest.setRequestHeader("content-type", "application/json");
        httpRequest.send(JSON.stringify({"content": this.state.text }));
        // httpRequest.send(JSON.stringify({
        //     "content": "The New York Times is an American newspaper based in New York City with worldwide influence and readership. "
        // }));
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {//验证请求是否发送成功
                let index = this.mapResultToId.get(JSON.parse(httpRequest.responseText).index-1)//获取到服务端返回的数据
                console.log(index)
                this.props.onPress(index)
                let display = '分类的结果是' + this.props.mapIdtoText.get(index)
                this.setState({ text: '', display: display })
            }
        }
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
