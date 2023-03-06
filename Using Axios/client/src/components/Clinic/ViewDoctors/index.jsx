import React from 'react';
import Doctors from './Doctors';

export const ViewDoctors = ({contract}) => {
  return (
    <div>
        <Doctors contract = {contract}/>
    </div>
  )
}

export default ViewDoctors;
