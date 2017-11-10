import * as React from 'react';
import * as actions from '../../actions/list';
import { StoreState } from '../../types/index';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import './index.scss';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

class List extends React.Component<Props, object> {
    constructor(props: Props, context: any) {
      super(props, context);
    }
    render() {
      const { name, enthusiasmLevel = 1, onIncrement, onDecrement } = this.props;
  
      if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
      }

      return (
        <div className="hello">
          <div className="greeting">
            let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
          </div>
          <Button onClick={onDecrement}>-</Button>
          <Button onClick={onIncrement}>+</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List as any));
