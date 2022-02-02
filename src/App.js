import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/courses/',
  headers: {
    'X-auth-key': 'token123'
  }
})

function App() {

  const [ courses, setCourses ] = useState({})

  useEffect(() => {
    api.get('/')
    .then(res => {
      console.log(res.data)
      setCourses({courses: res.data})
    })
  }, []);

  const createCourse = async () => {
    let res = await api.post('/', {title: "Test", id: 4, author: 'test'})
    console.log(res);
    getCourse() 
  }

  const getCourse = async () => {
    let data = await api.get('/', {
      params: {
        _limit: 3,
        _start: 2
      }
    }).then(({data}) => data)
    setCourses({courses: data})
  }

  const getCouses = async () => {
    try {
      let data = await axios({
        method: 'get',
        url: 'http://localhost:3000/courses/'
      }).then(({data}) => data)
      setCourses({courses: data})
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCouse = async id => {
    let data = await api.delete(`/${id}`)
    getCourse()
  }

  const updataCourse = async (id, value) => {
    let data = await api.patch(`/'${id}`, {title: value})
    getCourse()
  }
  
  return (
    <div className="App">
        <button onClick={createCourse}>createCourse</button>
        
    </div>
  )
}

export default App
