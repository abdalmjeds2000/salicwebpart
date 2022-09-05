import * as React from 'react';
import { INewSalicProps } from './INewSalicProps';
import { escape } from '@microsoft/sp-lodash-subset';
import axios from 'axios';
import App from './App/App';


export default class NewSalic extends React.Component<INewSalicProps, {}> {

  public render(): React.ReactElement<INewSalicProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      name,
      serverRelativeURL,  
      context,
    } = this.props;
    
    return (
      <App {...this.props} />
    );
  }
}
