import * as React from 'react';
import { ISalicProps } from './ISalicProps';
import App from './App/App';

export default class Salic extends React.Component<ISalicProps, {}> {
  public render(): React.ReactElement<ISalicProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      name,
      serverRelativeURL,  
      context,
      spWebUrl
    } = this.props;

    return (
      <App {...this.props} />
    );
  }
}
