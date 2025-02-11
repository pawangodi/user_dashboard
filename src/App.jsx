import React, { Component } from 'react';
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: true,
    error: null,
    showForm: false,
    selectedUser: null,
    currentPage: 1,
    usersPerPage: 5
  };


  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    try {
      const { currentPage, usersPerPage } = this.state;
      const start = (currentPage - 1) * usersPerPage;

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${usersPerPage}`
      );

      const formattedUsers = response.data.map(user => ({
        id: user.id,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: user.company?.name || "Protocian Technology"
      }));

      this.setState({
        users: formattedUsers,
        loading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        error: 'Failed to fetch users. Please try again later.',
        loading: false
      });
    }
  };

  handleAddUser = async (userData) => {
    try {
      this.setState({ loading: true });
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        userData
      );

      // Simulate adding to state since JSONPlaceholder doesn't persist
      this.setState(prevState => ({
        users: [...prevState.users, { ...userData, id: response.data.id }],
        showForm: false,
        loading: false
      }));
    } catch (error) {
      this.setState({
        error: 'Failed to add user. Please try again.',
        loading: false
      });
    }
  };

  handleUpdateUser = async (userData) => {
    try {
      this.setState({ loading: true });
      await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userData.id}`,
        userData
      );

      this.setState(prevState => ({
        users: prevState.users.map(user =>
          user.id === userData.id ? userData : user
        ),
        showForm: false,
        selectedUser: null,
        loading: false
      }));
    } catch (error) {
      this.setState({
        error: 'Failed to update user. Please try again.',
        loading: false
      });
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      this.setState({ loading: true });
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      this.setState(prevState => ({
        users: prevState.users.filter(user => user.id !== userId),
        loading: false
      }));
    } catch (error) {
      this.setState({
        error: 'Failed to delete user. Please try again.',
        loading: false
      });
    }
  };

  handleFormSubmit = (userData) => {
    console.log("userData.id" , userData.id)
    if (userData.id) {
      this.handleUpdateUser(userData);
    } else {
      this.handleAddUser(userData);
    }
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage }, this.getUserData);
  };

  render() {
    const {
      users,
      loading,
      error,
      showForm,
      selectedUser,
      currentPage,
      usersPerPage
    } = this.state;

    if (loading) {
      return <div className="loading flex flex-col justify-center items-center h-[100vh] ">Loading...</div>;
    }

    return (
      <ErrorBoundary >
        <div className="app  ">
          <h1 className='hover:translate-x-4 duration-[1s] font-bold text-4xl text-center mt-8 font-sans'>User Dashboard</h1>

          <div className='flex justify-end'>
            <button
              className="button add-button   "
              onClick={() => this.setState({ showForm: true, selectedUser: null })}
            >
              Add User
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <UserForm
              user={selectedUser}
              isEditing={!!selectedUser}
              onSubmit={this.handleFormSubmit}
              onCancel={() => this.setState({ showForm: false, selectedUser: null })}
            />
          )}

          <UserList
            users={users}
            onEdit={(user) => this.setState({ showForm: true, selectedUser: user })}
            onDelete={this.handleDeleteUser}
          />
          
            <div className="pagination ">
              <button
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={users.length < usersPerPage}
              >
                Next
              </button>
            </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
