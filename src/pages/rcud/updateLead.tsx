import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UPDATE_LEAD } from './queries';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
const UpdateLead = (props) => {
  const shows = props.shows ; 
    const [show, setShow] = useState(shows);
    const handleClose = () => setShow(false);
    const [formState, setFormState] = useState({
        Name: '',
        email: '',
        Source: '',
        Status: '',
        Notes : '',
        id:''
    });
    const [UpdateLead] = useMutation(UPDATE_LEAD);
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log('performing');
      UpdateLead( {
        variables:{ 
          id : formState.id ,
         data:{
          Name: formState.Name,
          email: formState.email,
          Source:formState.Source,
          Status : formState.Status,
          Notes : formState.Notes,
          
         }
        }
      });
      window.alert('Lead Updated')
      console.log("done");
   }
    return ( 
        <div>
            <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>LEAD</Modal.Title>
          </Modal.Header>
          <p>Enter the ID and then update the values , type values as it is if no update is required . </p>
            <p>press (x) or close button to cancel</p>
          <Modal.Body>
            <Form >
            <Form.Label>ID </Form.Label>
                <Form.Control
                  type="number"
                  autoFocus
                  value={formState.id}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    id: e.target.value
                  })
                }
                />
                <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status </Form.Label>
                    <Form.Control as="select" aria-label="Default select example" value={formState.Status} 
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    Status: e.target.value
                  })
                } >
                    <option>Open this select menu</option>
                    <option value="New">New</option>
                    <option value="Interested">Interested</option>
                    <option value="Follow_up">Follow_up</option>
                    <option value="Negative">Negative</option>
                    <option value="Enrolled">Enrolled</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="source">
                <Form.Label>Source </Form.Label>
                    <Form.Control as="select" aria-label="Default select example" value={formState.Source} 
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    Source: e.target.value
                  })
                }>
                    <option>Open this select menu</option>
                    <option value="website">website</option>
                    <option value="google">google</option>
                    <option value="my_app">my_app</option>
                    <option value="word_of_mouth">word_of_mouth</option>
                    </Form.Control>
                </Form.Group>
                <h2>Lead Details</h2>
                <div style={{
                    background: 'black',
                    height: '3px',
                    }}/>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name </Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  value={formState.Name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    Name: e.target.value
                  })
                }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="notes"
              >
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} value={formState.Notes} 
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    Notes: e.target.value
                  })
                } />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit' onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
    );
}

export default UpdateLead;