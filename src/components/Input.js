import React from "react";

import {Input, Button} from "antd"
import "antd/dist/antd.css"
const{TextArea} = Input;
class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    handleTextAreaChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    };
    handleClick = (e) => {
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'http://127.0.0.1:8080/test', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify({content: this.state.inputValue}));
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {//验证请求是否发送成功
                const i = JSON.parse(httpRequest.responseText).index;//获取到服务端返回的数据
                let cell = document.getElementById("grid").children[i];
                cell.click();
                this.setState({
                    inputValue: ''
                })
            }
        }
    };

    render() {
        const {inputValue} = this.state;
        return <div className="text-input">
            <div>
                <TextArea placeholder="Type you text" autoSize={{minRows:3,maxRows:15}}/>
                <Button type="primary">提交</Button>
            </div>
        </div>;
    }
}

export default InputComponent;