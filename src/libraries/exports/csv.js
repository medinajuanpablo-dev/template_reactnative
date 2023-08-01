import React from 'react';
import { CSVLink } from 'react-csv';
import { guid }  from 'libraries/utils';

export default class CSVExportButton extends React.Component {
  render() {
    const { title = 'DOWNLOAD', headers = null, data, filename = guid() + '.csv', className = null, onClick = () => {}} = this.props
    return (
      <CSVLink
        headers={headers}
        data={data}
        filename={filename}
        className={className !== null ? className : ''}
        target="_blank"        
        onClick={onClick}
      >
        {title}
      </CSVLink>
    )    
  }
}

