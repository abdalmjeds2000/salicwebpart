import {WebPartContext} from '@microsoft/sp-webpart-base';  

export interface ISalicProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  name: string;  
  context: WebPartContext; 
  spWebUrl: any
}
