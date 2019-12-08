import React from "react";

class Input extends  React.Component{
    constructor(props){
        super(props);
        this.state={
            inputValue:''
        }
    }
    handleTextAreaChange = (e)=>{
        this.setState({
            inputValue:e.target.value
        })
    };
    handleClick = (e)=>{
        const httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', 'http://127.0.0.1:8080/test', true);
        httpRequest.setRequestHeader("Content-type","application/json");
        httpRequest.send(JSON.stringify({content:this.state.inputValue}));
        httpRequest.onreadystatechange = ()=>{
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {//验证请求是否发送成功
                const i = JSON.parse(httpRequest.responseText).index;//获取到服务端返回的数据
                let cell = document.getElementById("grid").children[i];
                cell.click()
            }
        }
    };
    render() {
        const {inputValue} = this.state;
        return <div className="text-input">
            <textarea id="text" value={inputValue} className="form-control" rows="10" onChange={(e)=>this.handleTextAreaChange(e)}/>
            <button className="btn btn-primary btn-lg" type="button" id="submitButton" onClick={(e)=>this.handleClick(e)}>提交</button>
        </div>;
    }
}
export default Input;