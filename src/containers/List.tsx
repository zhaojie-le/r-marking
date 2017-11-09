import * as React from 'react';
import * as actions from '../actions/list';
// import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import './List.scss';

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
    render() {
      const { name, enthusiasmLevel = 1 } = this.props;
  
      if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
      }

      return (
        <div className="hello">
          <Button>22</Button>
          <div className="greeting">
            let‘s begin do {name + getExclamationMarks(enthusiasmLevel)}
          </div>
        </div>
      );
    }
  }

export function mapStateToProps(state: any) {
  console.log(state);
  return {
    enthusiasmLevel: state.list.enthusiasmLevel,
    name: state.list.languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List as any));
