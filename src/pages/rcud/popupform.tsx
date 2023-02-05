import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from '@apollo/client';
import { CREATE_LEAD } from './queries';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const CreateLead = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [formState, setFormState] = useState({
      Name: '',
      email: '',
      Source: '',
      Status: '',
      Notes : ''
  });
  const [CreateLead] = useMutation(CREATE_LEAD);
    
    
  const handleSubmit = (e) =>{
      e.preventDefault();
      console.log('performing');
      CreateLead( {
        variables:{ 
         data:{
          Name: formState.Name,
          email: formState.email,
          Source:formState.Source,
          Status : formState.Status,
          Notes : formState.Notes
         }
        }
      });
      window.alert('New Lead Created')
      console.log("done");
   }
   const client = new ApolloClient({
    uri: 'https://apidev4.sapien.systems/graphql',
    cache: new InMemoryCache()
  });
    return (
      <ApolloProvider client={client}>
        <Button variant="primary" className='inline' size="lg" onClick={handleShow}>
            Add Lead +
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>LEAD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
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
        </ApolloProvider>
    );
}
 
export default CreateLead;