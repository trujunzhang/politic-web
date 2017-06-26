import React from 'react'

/**
 * @return {null}
 */
const MailTo = ({className = "black", title = "", email, value = ""}) => {
  if (!!email) {
    return (
      <a className={className} title={title ? title : email} href={"mailto:" + email}>{value ? value : email}</a>
    )
  }
  return (<strong>{"-" }</strong>);
};


export default MailTo
