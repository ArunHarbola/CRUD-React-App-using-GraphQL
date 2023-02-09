import  { useState , useEffect} from 'react';
// import { Container, Row, Col } from "react-bootstrap";
import { useQuery , useMutation } from '@apollo/client';
import {GET_LEADS , DELETE_LEAD} from './queries';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateLead from './updateLead';
import Sidebar from './Sidebar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { MDBCol, MDBIcon } from "mdbreact";
import CreateLead from './popupform';
import { flattenObj } from '../../components/utils/responseFlatten';
import { MDBTable, MDBTableHead, MDBTableBody , MDBBadge , MDBBtn } from 'mdb-react-ui-kit';
export default function Read() {
    const [leads, setLeads] = useState([]);
    let [shows,setShows] = useState(true) ;
     function FetchData() {
        useQuery(GET_LEADS, {
          onCompleted: (res) => {
            let leadsList = flattenObj(res.leads.data)
              .map(a => {
                a.id = Number(a.id);
                return a;
              })
            setLeads(leadsList);
          }
        });
      }
      function FetchSortedData() {
        useQuery(GET_LEADS, {
          onCompleted: (res) => {
            let leadsList = flattenObj(res.leads.data)
              .map(a => {
                a.id = Number(a.id);
                return a;
              })
              .sort((a, b) => (a.id - b.id));
            setLeads(leadsList);
          }
        });
      }
      
      let sorted = false ; 
      if(sorted === false){
        FetchData();
      }else{
        FetchSortedData();
      }
      function SortedData(){
        sorted=true ; 
        
      }
      const [deleteLead] = useMutation(DELETE_LEAD);
      const handleDelete = (id) =>{
        const item = document.getElementById(id);
        console.log(item?.id);
        deleteLead( {
          variables:{ 
            id: item?.id
          }
        });
        item?.remove();
      };
      const ViewLead = (id) =>{
        const item = document.getElementById(id);
        console.log(item?.id);
        console.log(item?.innerText);
        window.alert(item?.innerText);
        // const ps = item?.getElementsByTagName('p');
        // console.log(ps.innerText);
      };
      
      const updateLead = (id) => {
        //  let item = document.getElementById('update') ; 
        //  item?.style.display = "block";
        setShows(true);
        
        // <UpdateLead shows={shows}/>
      };
      useEffect(()=>{
        console.log('wow');
        console.log(shows);
      },[shows]);
      const RenderLeads = () => {
        return (
          leads.map((item: any) => {
            return <tr key={item.id} id={item.id} >
                <td>
                    <p className='fw-bold mb-1'>{item.id}</p>
                    </td>
                <td>
                    <p className='fw-bold mb-1'>{item.createdAt}</p>
                    </td>
                    <td>
                    <p className='text-muted mb-0'>{item.Name}</p>
                    </td>
                    <td>
                    <p className='text-muted mb-0'>{item.email}</p>
                    </td>
                    <td>
                    <p className='fw-bold mb-1'>{item.Source}</p>
                    </td>
                    <td><p className='fw-bold mb-1'>{item.updatedAt}</p></td>
                    <td><MDBBadge color='primary' pill>{item.Status}</MDBBadge></td>
                    <td>

               
                        <Dropdown className="dropdown  dropdown-kebab-pf">
                        <Dropdown.Toggle  className="btn btn-link dropdown-toggle" variant="light" id="dropdown-basic" size="sm">
                        <span className="fa fa-ellipsis-v"></span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>updateLead(item.id)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={()=>ViewLead(item.id)}>View</Dropdown.Item>
                            <Dropdown.Item onClick={()=>handleDelete(item.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                        </Dropdown>
                    </td>                
            </tr >
          })
    
        )
      };
      
    return (
        <div>
            <Sidebar/>
            <br />
            <h1>Clients</h1>
            
            <div>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="https://sapien.systems/">Sapien Systems</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/rcud">Clients</Nav.Link>
                   
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
                {/* <Tabs defaultActiveKey="clients" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="clients" title="Clients"/>
                    <Tab eventKey="tab2" title="Tab 2"/>
                    <Tab eventKey="tab3" title="Tab 3" />
                </Tabs> */}
               
                <div
                    style={{
                    background: 'black',
                    height: '3px',
                    }}/>
            </div>
            <div>
            <MDBCol md="6">
                <form className="form-inline mt-4 mb-4">
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                    <CreateLead/>
                </form>
                </MDBCol>
                <Button>Sort</Button>
            </div>
            <div id='update' >
              <UpdateLead shows={shows} />
            </div>
            <div>
                        <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Lead Date</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Source</th>
                    <th scope='col'>Last Updated</th>
                    <th scope='col'>Status</th>
                    <th scope='col'></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody >
                    {RenderLeads()}
                </MDBTableBody>
                </MDBTable>
            </div>
        </div>
    )
}
