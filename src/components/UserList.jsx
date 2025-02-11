import React, { Component } from 'react';

// react icons
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

class UserList extends Component {
  render() {
    const { users, onEdit, onDelete } = this.props;

    if (users?.length === 0) {
      return <div className="no-users">No users found</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className='border-collapse w-full mt-[20px]'>
          <thead className='font-bold bg-[#f4f4f4]'>
            <tr className='table-row' >
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className='table-row  hover:bg-[#f5f5f5] hover:font-semibold'>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td >
                  <button 
                    className=" p-[10px] cursor-pointer mr-1 hover:bg-gray-300 hover:rounded-full duraion-500"
                    onClick={() => onEdit(user)}
                  >
                    <CiEdit  w={24} title = "Edit" />
                  </button>
                  <button 
                    className=" p-[10px] cursor-pointer  hover:bg-gray-300 hover:rounded-full duration-500"
                    onClick={() => onDelete(user.id)}
                  >
                    <MdDeleteOutline title='Delete' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
