import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/pages/UserDetails.css'
import { useNavigate,Navigate } from 'react-router-dom';

const UserDetails = (props) => {

  const location = useLocation();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);


  let subtitle;

  const navigate = useNavigate();
  const { user } = location.state;

  const [userD, setUser] = useState(user);

 
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

  function openModal1() {
    setIsOpen1(true);
  }

  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'red';
    
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  const deleteUser = async () => {
    const id = user.id;
    try {
      const response = await fetch(`https://users-beta.vercel.app/api/users/${id}/`, {
        method: 'DELETE',
      }).then(response => {
        console.log(response)
        if (response.ok) {
           navigate("/", { replace: true });
          
        }

        // do something if the request was successful
      })

    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    let user_details = {
      "username": e.target.username.value,
      "first_name": e.target.first_name.value,
      "last_name": e.target.last_name.value,
      "phone_number": e.target.phone_number.value,
      "email": e.target.email.value,
      // "password": e.target.password.value
    }

    const id = user.id;
  
    try {
      console.log(user_details)
      const response = await fetch(`https://users-beta.vercel.app/api/users/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_details)
      });
      if (response.ok) {
        setIsOpen(false);
        // navigate("/", { replace: true });
        const updateData = await response.json()
        console.log("this",updateData)
        setUser(updateData)
      } else if (response.status === 404) {
        throw new Error('User not found');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.error(error);
   
    }
  }
  
  return (
    <div className='maincont'>
      <button className='back-button' onClick={() => navigate(-1)}>
      <span className="btn-icon">
      <i className="fa fa-chevron-circle-left"></i>
      </span>
      Back
      </button>
          <div className='btn'>
    <button onClick={openModal1} className='addbtn1'>
      <span className="btn-icon">
      <i className="fa fa-trash"></i>
      </span>
      Delete
    </button>
    <button onClick={openModal} className='addbtn'>
      <span className="btn-icon">
      <i className="fa fa-pencil-square"></i>
      </span>
      Update User Details
    </button>
    
    </div>
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className='modal-title' ref={(_subtitle) => (subtitle = _subtitle)}>Update User Details</h2>
        <button className='close-btn' onClick={closeModal}>X</button>
        <div className='modal-content'>
        <form className="user-details-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" defaultValue={userD.email} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" defaultValue={userD.username}  />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first_name" defaultValue={userD.first_name}  />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last_name" defaultValue={userD.last_name}  />
          </div>
          <div className="form-group">
            <label htmlFor="phone-number">Phone Number</label>
            <input type="text" id="phone-number" name="phone_number" defaultValue={userD.phone_number}  />
          </div>
          
          <button className='submit-btn' type='submit'>Update</button>
      </form>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className='modal-title' ref={(_subtitle) => (subtitle = _subtitle)}>Delete User</h2>
        <button className='close-btn' onClick={closeModal1}>X</button>
        <div className='modal-content'>
            <form onSubmit={(event) => event.preventDefault()}>
                <p className='context'> Are you certain you want to delete {userD.username}?</p>
                <div className='conbtn'>
                <button className='submit-btn' onClick={closeModal1}>No</button>
                <button className='submit-btnx' onClick={deleteUser}>Yes</button>
                
                </div>

            </form>
        </div>
      </Modal>
      <div className="user-card">
          <div className="user-card-header">
            <h3>{userD.username}</h3>
          </div>
          <div className="user-card-body">
            <div className="user-card-info">
              <p><strong>Email:</strong> {userD.email}</p>
              <p><strong>First Name:</strong> {userD.first_name}</p>
              <p><strong>Last Name:</strong> {userD.last_name}</p>
              <p><strong>Phone Number:</strong> {userD.phone_number}</p>
            </div>
          </div>
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

export default UserDetails