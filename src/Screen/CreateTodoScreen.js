import React, { Component } from 'react'

import { 
    Button,
    Toast,
    NavBar,
    WingBlank, 
    WhiteSpace ,
    List,
    InputItem,
    Icon,
    TextareaItem,
    Modal
} from 'antd-mobile';

import todoManager from '../DataServer/TodoManager';
import userManager from '../DataServer/UserManager';


export default class CreateTodoScreen extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         title:'',
         content:''
      }
    }

    componentWillMount(){
        if(!userManager.isLogin()){
            this.props.history.replace('/');
        }
    }
    

  render() {
    return (
      <div>
        <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() => {this.props.history.goBack()}}
        >添加事项</NavBar>
        <WhiteSpace/>
        <List>
            <InputItem
                type={'text'}
                value={this.state.title}
                onChange={(title)=>{this.setState({title})}}
                placeholder={'请输入事项标题'}
            >
                标题
            </InputItem>
            <TextareaItem
                type={'text'}
                value={this.state.content}
                onChange={(content)=>{this.setState({content})}}
                placeholder={'请输入内容'}
                autoHeight={true}
            />
        </List>
        <WhiteSpace/>
        <WingBlank>
            <Button
                type={'primary'}
                onClick={this.sendTodo}
            >
                提交
            </Button>
        </WingBlank>
      </div>
    )
  }

  sendTodo = async ()=>{
    Toast.loading('内容上传中...',0);
    const result = await todoManager.postTodo(this.state.title,this.state.content);
    Toast.hide();
    if(result.success === false){
        Toast.fail(result.errorMessage);
        if(result.errorCode === 10004){
            userManager.logout();
            this.props.history.replace('/');
        }
        return;
    }
    Modal.alert('提交成功','点击确认键返回',[{
        text:'确认',
        onPress:()=>{this.props.history.goBack()}
    }])
  }
}
