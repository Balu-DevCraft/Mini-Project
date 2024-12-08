import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import employee from './Employee';
import { useNavigate } from 'react-router-dom'



function Edit() {

  const [id, setId] = useState(0)
  const [uname, setUname] = useState('')
  const [age, setAge] = useState(0)
  const [desig, setDesig] = useState('')
  const [salary, setSalary] = useState(0)

  useEffect(() => {
    setId(JSON.parse(localStorage.getItem("id")))
    setUname(localStorage.getItem("uname"))
    setAge(JSON.parse(localStorage.getItem("age")))
    setDesig(localStorage.getItem("desig"))
    setSalary(JSON.parse(localStorage.getItem("salary")))
  }, [])


  var index=employee.map((item)=>item.id).indexOf(id)
  let history=useNavigate()

  const handleUpdate =(e)=>{
    e.preventDefault()

  let emp=employee[index]
  emp.name=uname
  emp.age=age
  emp.desig=desig
  emp.salary=salary

  history('/Mainpage')

  }

  // console.log(id);
  // console.log(uname);

  return (
    <>
      <h1 className='text-center mt-5'>Update Item</h1>
      <p className='mt-4 text-center'>Edit</p>

      <Row>

        <Col md={3}>
          <img
            src=''
          />
        </Col>

        <Col md={6}>

          <Form className='mt-5 p-4 border border'>
            <Form.Group className="mb-3" controlId="formBasicEmail">

              <Form.Label>Certificate number</Form.Label>
              <Form.Control value={uname} type="text" onChange={(e) => setUname(e.target.value)} />

              <Form.Label>Year</Form.Label>
              <Form.Control value={age} type="number" onChange={(e) => setAge(e.target.value)} />

              <Form.Label>Description</Form.Label>
              <Form.Control value={desig} type="text" onChange={(e) => setDesig(e.target.value)} />

              <Form.Label>Price</Form.Label>
              <Form.Control value={salary} type="number" onChange={(e) => setSalary(e.target.value)} />

            </Form.Group>

            <Button onClick={(e)=>handleUpdate(e)} variant="primary" type="submit">
              Submit
            </Button>

          </Form>
        </Col>

      </Row>
    </>
  )
}

export default Edit