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

import { useState,useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from 'axios';
// reactstrap components

const Posts = () => {
  const[post,setPost]=useState([])
  useEffect(() => {
      async function fetchData() {
        await axios.get('http://localhost:5000/feed/getAllPosts')
        .then(res=>{
          console.log(res.data);
          setPost(res.data)
        }).catch(err=>{
          console.log(err)
        })
       
      }
      fetchData()
  }, [])

    return (
      <div>

      <p>Posts Here</p>
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
                    <th scope="col">Offer Type</th>
                    <th scope="col">Date</th>
                    <th scope="col">Created By Username</th>
                    <th scope="col">Valid From</th>
                    <th scope="col">Valid to</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Delete Button</th>
                  </tr>
                </thead>
                <tbody>
                  
                 {post.map((curEle)=>{
                   return(
                     <tr>
                    <th scope="row">{curEle.Type}</th>
                    <td>{curEle.Date}</td>
                    <td>{curEle.Username}</td>
                    <td>{curEle.ValidFrom}</td>
                    <td>{curEle.ValidUpto}</td>
                    <td>{curEle.Heading}</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                    </tr>
                   )  
                })}
                </tbody>
               </Table>
            </Card>
          </Col>
        </Row>                
      </div>
    )
};

export default Posts;
