import React, { Component } from 'react';
import { MdEnergySavingsLeaf } from 'react-icons/md';


class UserForm extends Component {

  state = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      department: ''
    },
    errors: {}
  };


  componentDidUpdate(prevProps) {
    if (this.props.user && this.props.user !== prevProps.user) {
      const { id, firstName, lastName, email, department } = this.props.user;
      this.setState({
        formData: { id, firstName, lastName, email, department }
      });
    }
  }

  validateForm = () => {
    const { formData } = this.state;
    let errors = {};
    let isValid = true;

    const requiredFields = ["firstName" , "lastName" , "email" , "department"];
     
    requiredFields.forEach((field) =>{
      const value = formData[field]?.trim();
      
      if(!value){
        errors[field] =`${field.replace(/^\w/ ,(c) => c.toUpperCase())} is required`; 
        isValid = false
      }else if(value.length < 3 && field !== 'email'){
        errors[field] = "Error: Length of characters should be at least 3";
        isValid= false;
      }
        
    });

    // email validation 
  
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.onSubmit(this.state.formData);
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  render() {
    const { formData, errors } = this.state;
    const { isEditing } = this.props;

    return (
      <div className=' flex justify-center '>
        <div className="bg-gray-100 rounded-[10px] p-8 w-[60%]">
          <h2 className='text-lg font-bold mb-2'>{isEditing ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={this.handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={this.handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={this.handleChange}
                className={errors.department ? 'error' : ''}
              />
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>

            <div className="form-actions flex justify-end gap-1 mt-4">
              <button type="submit" className='button bg-sky-500 hover:font-bold duration-300 text-white'>
                {isEditing ? 'Update User' : 'Add User'}
              </button>
              <button className='button bg-gray-600 text-white' type="button" onClick={this.props.onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;