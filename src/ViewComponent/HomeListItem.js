import React, { Component } from 'react'

import moment from 'moment';

import './HomeListItem.css'

import { 
    WingBlank, 
    WhiteSpace ,
    Card,
    SwipeAction
} from 'antd-mobile';

export default class HomeListItem extends Component {
  render() {
    return (
        <SwipeAction
            autoClose={true}
            right={[
                {
                    text:this.props.isFinish?'标记未完成':'标记已完成',
                    style:{
                        backgroundColor:this.props.isFinish?'yellow':'green',
                    },
                    onPress:()=>{
                        if(this.props.toggleFinish){
                            this.props.toggleFinish(this.props.id);
                        }
                    }
                },
                {
                    text:'删除',
                    style:{
                        backgroundColor:'red'
                    },
                    onPress:()=>{
                        if(this.props.del){
                            this.props.del(this.props.id);
                        }
                    }
                },
            ]}

        >
            {this.itemBody()}
        </SwipeAction>
    )
  }

  itemBody = ()=>{
      return(
            <WingBlank>
                <WhiteSpace/>
                <Card>
                    <Card.Header
                        title={this.props.title}
                        extra={this.props.isFinish?'已完成':'未完成'}
                    />
                    <Card.Body>
                        <span>
                        {this.props.content}
                        </span>
                    </Card.Body>
                    <Card.Footer
                        content={moment(this.props.createdAt).format('YYYY-MM-DD HH:mm')}
                    />
                </Card>
                <WhiteSpace/>
            </WingBlank>
      )
  }
}
