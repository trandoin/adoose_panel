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
  const [account,setAccount]=useState()
  useEffect(() => {
    async function fetchData() {
     await axios.get('http://localhost:5000/user/getAllUsers')
      .then(res=>{
           console.log(res.data);
           setUsers( res.data);
      }).catch(err=>{ 
        console.log(err);
      })
      
    }
    fetchData()
  }, [])
  async function fetchAccount(user){
     
    await axios.get('http://localhost:5000/account/getDetails')
      .then(res=>{
        console.log(res.data);
        const temp_rows = [];
            for(let ele of res.data) {
               if(ele.Recipient_Name==user){
                alert( 'Country: ' + temp_rows.Recipient_Name + "\n" + 
                'Gas: ' + temp_rows.Acc_No + "\n" +
                'Size: ' + temp_rows.IFSC  + "\n")
               }
                //temp_rows.push(createData(ele.Recipient_Name,ele.Acc_No,ele.IFSC))
                
            }
            //setAccount(temp_rows)
           /* Alert.alert( 'Country: ' + temp_rows.Recipient_Name + "\n" + 
       'Gas: ' + temp_rows.Acc_No + "\n" +
       'Size: ' + temp_rows.IFSC  + "\n"*/
      //);
      }).catch(err=>{
        console.log(err)
      })
  }
  async function fetchOrder(user){
      let request={Username:user,};
      console.log(request);
      await axios.post('http://localhost:5000/orders/GetOrders',request)
        .then(res=>{
          console.log(res.data);
          
        }).catch(err=>{
          console.log(err)
        })
    }
    
  
  

  return (
    <>
      {!localStorage.getItem("userInfo") && (
        <Redirect to="/auth/login"></Redirect>
      )}
      
      <h2>All Users</h2>
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
                    <th scope="col">Account TYpe</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Stars</th>
                    <th scope="col">Account Details</th>
                    <th scope="col">Active</th>
                    <th scope="col">Filled</th>
                    <th scope="col">Orders</th>
                  </tr>
                </thead>
                <tbody>
                 
                {users.map((curElem)=>{
                  let user=curElem.Name;
                  return(
                    
                   <tr>
                    <th scope="row">{curElem.AccountType}</th>
                    <td>{curElem.Email}</td>
                    <td>{curElem.Name}</td>
                    <td>{curElem.Stars}</td>
                    
                    <td>
                      <button onClick={()=>fetchAccount(user)}> View</button>
                    </td>
                    <td>{curElem.active}</td>
                    <td>{curElem.filled}</td>
                    <td><button onClick={()=>fetchOrder(user)}>View</button></td>
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
