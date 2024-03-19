import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'

const CreateCategory = () => {
  const [category, setCategory] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState('')
  const [newname, setnewname] = useState('')

  //get all category
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/category/getAll-category',
      )

      if (data?.success) {
        setCategory(data?.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
      )
      if (data.success) {
        toast.success(data.message)
        getCategory()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error in Deleting')
    }
  }
  // handle form data
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {
        data,
      } = await axios.post(
        'http://localhost:8080/api/v1/category/create-category',
        { name },
      )
      if (data.success) {
        toast.success(data.message)

        getCategory()
      } else {
        toast.error('Error In Creating New Category')
      }
      setName('')
    } catch (error) {
      console.log(error)
      toast.error('Error in Createing New Category')
    }
  }

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const {
        data,
      } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: newname },
      )
      if (data.success) {
        toast.success(data.message)
        setSelected(null)
        setnewname('')
        setVisible(false)
        getCategory()
      } else {
        toast.error('Error In Updating Category')
      }
      setName('')
    } catch (error) {
      console.log(error)
      toast.error('Error in Updating Category')
    }
  }
  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage Category</h2>
            <div className="p-3 w-50">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {category?.map((item) => (
                      <tr>
                        <td key={item._id}>{item.name}</td>
                        <td>
                          {/* <button
                            onClick={() => {
                              setVisible(true)
                              setnewname(item.name)
                              setSelected(item)
                            }}
                          > */}
                          <MdModeEditOutline
                            onClick={() => {
                              setVisible(true)
                              setnewname(item.name)
                              setSelected(item)
                            }}
                            style={{ color: 'blue' }}
                          />{' '}
                          &nbsp; &nbsp;
                          {/* </button> */}
                          {/* <button
                            className="btn btn-danger "
                            onClick={() => handleDelete(item._id)}
                          > */}
                          <MdDelete
                            onClick={() => handleDelete(item._id)}
                            style={{ color: 'red' }}
                          />
                          {/* </button> */}
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={newname}
                setValue={setnewname}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
