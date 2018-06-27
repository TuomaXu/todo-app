import React, { Component } from 'react'

import { 
    Toast,
    NavBar,
    ListView,
} from 'antd-mobile';

import todoManager from '../DataServer/TodoManager';
import userManager from '../DataServer/UserManager';

import HomeListItem from '../ViewComponent/HomeListItem';


export default class HomeScreen extends Component {

    async componentDidMount(){

        if(userManager.isLogin() === false){
            this.props.history.replace('/');
            return;
        }

        const result = await todoManager.getTodos();

        if(result.success === false){
            Toast.fail(result.errorMessage);
            if(result.errorCode === 10004){
                userManager.logout();
                this.props.history.replace('/');
            }
            return;
        }

        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result.data)
            }   
        })

    }

    constructor(props) {
        super(props)

        const dataSource = new ListView.DataSource({
            rowHasChanged:(row1, row2) => row1 !== row2,
        })

        this.state = {
            dataSource,
        }
    }

    onToggleFinish = async (id)=>{
        Toast.loading('操作中',0);
        const result = await todoManager.finishTodo(id);
        Toast.hide();

        if(result.success === false){ 
            Toast.fail(result.errorMessage);
            if(result.errorCode === 10004){
                userManager.logout();
                this.props.history.replace('/');
            }
            return;
        }
        Toast.loading('刷新数据',0);
        const result1 = await todoManager.getTodos();
        Toast.hide();

        if(result1.success === false){
            Toast.fail(result1.errorMessage);
            if(result.errorCode === 10004){
                userManager.logout();
                this.props.history.replace('/');
            }
            return;
        }

        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result1.data)
            }   
        })
    }

    onDel = async (id)=>{
        Toast.loading('操作中',0);
        const result = await todoManager.deleteTodo(id);
        Toast.hide();

        if(result.success === false){
            Toast.fail(result.errorMessage);
            if(result.errorCode === 10004){
                userManager.logout();
                this.props.history.replace('/');
            }
            return;
        }

        Toast.loading('刷新数据',0);
        const result1 = await todoManager.getTodos();
        Toast.hide();

        if(result1.success === false){
            Toast.fail(result1.errorMessage);
            if(result.errorCode === 10004){
                userManager.logout();
                this.props.history.replace('/');
            }
            return;
        }

        this.setState((preState)=>{
            return{
                dataSource:preState.dataSource.cloneWithRows(result1.data)
            }   
        })
    }
    
    
  render() {
    return (
      <div>
        <NavBar
            mode="dark"
            leftContent={[
                <span
                    key={1}
                    onClick={()=>{
                        this.props.history.replace('/');
                        userManager.logout();
                    }}
                >退出</span>
            ]}
            rightContent={[
                <span
                    key={2}
                    onClick={()=>{
                        this.props.history.push('/CreateTodoScreen');
                    }}
                >添加</span>
            ]}
        >备忘录</NavBar>
        <ListView
            useBodyScroll={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
        />
      </div>
    )
  }

  renderRow = (todo)=>{
    return(
        <HomeListItem 
            {...todo} 
            toggleFinish={this.onToggleFinish}
            del={this.onDel}
        />
    )
  }
}
