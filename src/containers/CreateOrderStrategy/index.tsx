import * as React from 'react';
import * as actions from '../../actions/list';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Layout, Breadcrumb, Button } from 'antd';
import './index.scss';

const { Content, Footer } = Layout;
const FormItem = Form.Item;

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    form?: any;
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

class List extends React.Component<Props, object> {
    constructor(props: Props, context: any) {
        super(props, context);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
    }

    render() {
        const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
        const { getFieldDecorator } = this.props.form;

        if (enthusiasmLevel <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div id="orderStrategy">
                <Layout className="layout">
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item><Link to="/">营销管理平台</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>创建策略</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="wrapperContainer">
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem {...formItemLayout} label="E-mail" hasFeedback={false}>
                                    {getFieldDecorator('email', {
                                        rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                        required: true, message: 'Please input your E-mail!',
                                        }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Form>
                        </div>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <div className="greeting">
                                let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
                            </div>
                            <Button onClick={onDecrement}>-</Button>
                            <Button onClick={onIncrement}>+</Button>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </div>
        );
    }
  }

export function mapStateToProps(state: StoreState) {
    return {
        enthusiasmLevel: state.list.enthusiasmLevel,
        name: state.list.languageName,
    };
}

export const mapDispatchToProps = (dispatch: Dispatch<actions.EnthusiasmAction>) => bindActionCreators(
    {
        onIncrement: actions.incrementEnthusiasm,
        onDecrement: actions.decrementEnthusiasm
    }, 
    dispatch
);

const WrappedRegistrationForm = Form.create()(List as any);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm as any));
