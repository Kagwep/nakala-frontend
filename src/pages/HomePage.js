import React, {useState,useEffect} from 'react'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/HomePage.css'


const UsersPage = () => {

  //state to store all our users
  let [users, setUsers] = useState(null);
  let [errors, setErrors] = useState(null);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // endpoint to get all users
  let url = 'https://users-beta.vercel.app/api/users/'

  // Define a useEffect hook to fetch the data when the component mounts or when the user details change
  
    async function fetchData() {
      try {
        // Send the GET request to fetch users
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Throw an error if the API response is not successful
        if (!response.ok) {
          throw new Error('Failed to fetch data from API endpoint');
        }

        // Parse the response JSON and set it to the users state variable
        let data = await response.json();
        setUsers(data);
      } catch (error) {
        // Handle any errors that may occur during the request process
        console.error(error);
      }
    }


      function openModal() {
        setIsOpen(true);
      }

      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#0096FF';
        
      }

      function closeModal() {
        setIsOpen(false);
      }

      // navigate to user details on row click
      function handleClick(user) {
        navigate(`/user/${user.id}`, { state: { user } });
      }


      // add user function
      let addUser = async (e) => {
        e.preventDefault()
        setLoading(true);
    
        // get user details and store it in an object
        let user_details = {
          "username": e.target.username.value,
          "first_name": e.target.first_name.value,
          "last_name": e.target.last_name.value,
          "phone_number": e.target.phone_number.value,
          "email": e.target.email.value,
          "password": e.target.password.value
          }
    
          console.log(user_details)
        try {
          // make call to endpoint
          let response = await fetch('https://users-beta.vercel.app/api/users/',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(user_details)
          })

          // if respose is okay close model and update users
          if(response.ok){
              console.log("this",response)
              setLoading(false);
              setIsOpen(false);
              fetchData();
              setErrors(null)
            }else{
              // set errors gotten
              const errorData = await response.json();
              setErrors(errorData)
              console.log(errorData)
            }       
          
          
          
        } catch (error) {
          // Handle any errors that may occur during the request process
          console.error(error);
        }

      }

      // fetch data when component mounts
      useEffect(() => {
        fetchData();
      }, []);

 
      
  return (
    <div className='maincont'>
      <div className='btn'>
        {/* add user button */}
      <button onClick={openModal} className='addbtn'>
        <span className="btn-icon">
        <i className="fa fa-user-plus"></i>
        </span>
        Add User
      </button>
      
      </div>
      {/* show add user modal */}
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className='modal-title' ref={(_subtitle) => (subtitle = _subtitle)}>Add User</h2>
          <button className='close-btn' onClick={closeModal}>X</button>
          
        {errors &&
          <div className="error-notification">
            <ul>
              {Object.values(errors)
                .flat()
                .map((errorMessage, index) => (
                  <li key={index}>{errorMessage}</li>
                ))}
            </ul>
          </div>
              }
                
          <div className='modal-content'>
              <form onSubmit={addUser}>
                  <input type="text" name="username" placeholder='Username' />
                  <input type="text" name="first_name" placeholder='First Name' />
                  <input type="text" name="last_name" placeholder='Last Name' />
                  <input type="number" name="phone_number" placeholder='Phone Number' />
                  <input type="email" name="email" placeholder='email' />
                  <input type="password" name="password" placeholder='Password' />
                  <button className='submit-btn' type='submit'>Submit</button>
              </form>
          </div>
        </Modal>
        <h3 className="headertext">A list of All Users</h3>
          <div className='holdtable'>
          {/* if users are being fetched show loading */}
          {users ? ( 

            <>

             {/* if no users show the message */}
            {users.length > 0 ? (
  
            <table className="users">
                <thead>
                    <tr className='tabheader'>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                

                  
                <tbody>

                  {/* show all the users details in a table */}
                
                    {users && users.map(user =>
                    
                        // click on row to navigate to user details
                        <tr key={user.id} onClick={() => handleClick(user)}>
                            <td>{user.username} </td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone_number}</td>

                        </tr>
                     
                    )
                    }
                </tbody>
  
            </table>
            ) :( 
              // message displayed when there are no users
            <div className="message">
              <p>Hello there! Currently, there are no users on the platform. However, you can add a new user by clicking on the "Add User" button.</p>
            </div>
          )}
            </>
            ) : (
              // message displayed when users are being fetched form APi
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
            )}

          </div> 

  </div>
  )
}


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    padding: '2rem',
    width: '50%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    border: 'none'
  },
};

export default UsersPage;