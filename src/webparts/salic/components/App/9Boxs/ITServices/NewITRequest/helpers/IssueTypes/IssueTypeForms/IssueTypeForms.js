import React from "react";
import OracleFields from "./Types/OracleFields";
import DMSFields from "./Types/DMSFields";
import USBFields from "./Types/USBFields";
import SoftwareFields from "./Types/SoftwareFields";
import PhoneExtensionsFields from "./Types/PhoneExtensionsFields";
import NewAccountFields from "./Types/NewAccountFields";

function IssueTypeForms({ IssueType }) {
  if (IssueType === "Oracle") {
    return <OracleFields />;
  } else if (IssueType === "DMS") {
    return <DMSFields />;
  } else if (IssueType === "Unlock USB") {
    return <USBFields />;
  } else if (IssueType === "Software Subscription & Licenses") {
    return <SoftwareFields />;
  } else if (IssueType === "Phone Extensions") {
    return <PhoneExtensionsFields />;
  } else if (IssueType === "New Account") {
    return <NewAccountFields />;
  }
  return <></>;
}

export default IssueTypeForms;
