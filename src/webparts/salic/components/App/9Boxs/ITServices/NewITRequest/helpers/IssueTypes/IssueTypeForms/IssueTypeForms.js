import React from 'react';
import OracleIssueForm from './Types/OracleIssueForm';

function IssueTypeForms({IssueType}) {
  if(IssueType === "Oracle") {
    return <OracleIssueForm />
  }
  return <></>
}

export default IssueTypeForms