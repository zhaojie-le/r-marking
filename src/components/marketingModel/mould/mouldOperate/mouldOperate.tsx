import * as React from 'react';
import './style.scss';
import {
    Row,
    Col,
    Button,
} from 'antd';

namespace layout {
    export const rowStyle = {
        marginBottom: 0
    };
}

interface ChatNumberProp {
    onChange: (value: any) => any;
    onShiftUp: () => any;
    onShiftDown: () => any;
    onDelete: () => any;
    value?: any;
    first?: any;
    last?: any;
    stage?: number;
    showDelete?: boolean;
}

export default (param: {title: string}) => <T extends ChatNumberProp>(WrappedComponent) => {
    return class HOC extends React.Component<T, {}> {
        constructor(props: any, context: any) {
            super(props, context);
        }

        generateShiftUpBtn = () => {
            const { first } = this.props;
            return first ?  <Col span={3}/> :
                (
                <Col span={3}>
                    <Button onClick={(e) => this.props.onShiftUp()}>上移</Button>
                </Col>
                );
        }

        generateShiftDownBtn = () => {
            const { last } = this.props;
            return last ? <Col span={3} offset={1}/> :
                (
                    <Col span={3} offset={1}>
                        <Button onClick={(e) => this.props.onShiftDown()}>下移</Button>
                    </Col>
                );
        }

        generateDeleteBtn = () => {
            const { showDelete = true } = this.props;
            return showDelete ? 
                (
                    <Col span={3} offset={1}>
                        <Button onClick={(e) => this.props.onDelete()}>删除</Button>
                    </Col>
                ) : <Col span={3} offset={1}/>;
        }

        generateByCurrentStage = () => {
            const { stage } = this.props;
            return stage !== 1 ? 
                (
                    <Row style={layout.rowStyle}>
                        <Col span={5}>{param.title}</Col>
                        { 
                            this.generateShiftUpBtn() 
                        }
                        { 
                            this.generateShiftDownBtn() 
                        }
                        { 
                            this.generateDeleteBtn() 
                        }
                    </Row>
                ) : (
                    <Row style={layout.rowStyle}>
                            <Col span={4}>{param.title}</Col>
                    </Row>
                );
        }

        render() {
            return (
                <div className="Operator"> 
                    {
                        this.generateByCurrentStage()
                    }
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
};