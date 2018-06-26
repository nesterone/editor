import './index.css';

import * as React from 'react';
import { ChevronDown, ChevronUp, X } from 'react-feather';
import SplitPane from 'react-split-pane';

import DataViewer from '../data-viewer';
import ErrorBoundary from '../error-boundary';
import ErrorPane from '../error-pane';
import Renderer from '../renderer';
import Toolbar from '../toolbar';

interface Props {
  errorPane?: boolean;

  showErrorPane: () => void;
}

interface State {
  errorLogs: boolean;
}

export default class VizPane extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      errorLogs: true,
    };
  }
  public render() {
    const container = (
      <div className="chart-container">
        <div className="debug-pane-header" onClick={e => this.props.showErrorPane()}>
          <ul className="tabs-nav">
            <li
              className={this.state.errorLogs ? 'active-tab' : ''}
              onClick={e => {
                if (this.props.errorPane) {
                  e.stopPropagation();
                }
                this.setState({ errorLogs: true });
              }}
            >
              Error Logs
            </li>
            <li
              className={this.state.errorLogs ? '' : 'active-tab'}
              onClick={e => {
                if (this.props.errorPane) {
                  e.stopPropagation();
                }
                this.setState({ errorLogs: false });
              }}
            >
              Data Viewer
            </li>
          </ul>
          {this.props.errorPane ? <ChevronDown className="icon" /> : <ChevronUp className="icon" />}
        </div>
        <ErrorBoundary>
          <Renderer />
        </ErrorBoundary>
        <Toolbar />
      </div>
    );
    if (this.props.errorPane) {
      return (
        <SplitPane split="horizontal" defaultSize={window.innerHeight * 0.6} paneStyle={{ display: 'flex' }}>
          {container}
          <div className="debug-pane">
            <span onClick={e => this.props.showErrorPane()} className="close">
              <X />
            </span>
            {this.state.errorLogs ? <ErrorPane /> : <DataViewer />}
          </div>
        </SplitPane>
      );
    } else {
      return container;
    }
  }
}
