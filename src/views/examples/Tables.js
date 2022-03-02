/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  
  FormGroup,
  Form,
  Input,
  
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { Redirect } from "react-router";
import axios from 'axios';
import { useEffect, useState } from "react";
const Profile = () => {
  const [users, setUsers]=useState([])
  useEffect(() => {
    async function fetchData() {
     
     await axios.get('http://localhost:5000/report/getblock') 
     
      .then(res=>{
           console.log(res.data);
           setUsers( res.data);
      }).catch(err=>{ 
        console.log(err);
      })
      
    }
    fetchData()
  }, [])
  
  const [withdraws, setWithdraws]=useState([])
  useEffect(() => {
    async function fetchData() {
     
     await axios.get('http://localhost:5000/withdraw/GetWithdraw') 
     
      .then(res=>{
           console.log(res.data);
           setWithdraws( res.data);
      }).catch(err=>{ 
        console.log(err);
      })
      
    }
    fetchData()
  }, [])
  async function changeStatus(id){
    const request={
      id:id,
    };
    await axios.put('http://localhost:5000/withdraw/UpdateStatusWithdraw',request)
    
  }
  async function deleteProfile(user){
    const request={
       Username:user
    };
    await axios.post('https://localhost:5000/profile/delete',request)
  }

  return (
    <>
      {!localStorage.getItem("userInfo") && (
        <Redirect to="/auth/login"></Redirect>
      )}
      <h2>All Reported Users</h2>
      <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Requested_by_Username</th>
                    <th scope="col">Requested_Money</th>
                    <th scope="col">Status</th>
                    <th scope="col">Allow</th>
                  </tr>
                </thead>
                <tbody>
                 
                {withdraws.map((curElem)=>{
                  let id=curElem.id
                  return(
                 
                   <tr>
                    <th scope="row">{curElem.Username}</th>
                    <td>{curElem.NetAmount}</td>
                    <td>{curElem.Status}</td>
                    <td><button onClick={()=>changeStatus(id)}>Change Status</button></td>
                  </tr>
                
               )
               })}
               </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <h3>Request For Withdrawl</h3>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Blocked_by_Username</th>
                    <th scope="col">BlockedUser</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                 
                {users.map((curElem)=>{
                  let user=curElem.BlockedUser
                  return(
                 
                   <tr>
                    <th scope="row">{curElem.Username1}</th>
                    <td>{curElem.BlockedUser}</td>
                    <td><button onClick={()=>deleteProfile(user)}>Delete</button></td>
                  </tr>
                
               )
               })}
               </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
    </>
  );
};

export default Profile;
