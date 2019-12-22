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
        }
    }
    handleDelete = () => {
        this.setState({ text: '' })
    }
    handleSubmit = () => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'http://127.0.0.1:8080/test', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify({ content: this.state.inputValue }));
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {//验证请求是否发送成功
                let index = JSON.parse(httpRequest.responseText).index;//获取到服务端返回的数据
                console.log(typeof(index))
                this.props.onPress(index)
                this.setState({ text: '' })
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }
    render() {
        return (
            <div className="text-area">
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
