import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const CategoryContext = createContext()

// const CategoryProvider = ({ children }) => {
//   return <CategoryContext.Provider>{children}</CategoryContext.Provider>
// }
// const useCategory = () => useContext(CategoryContext)

// export { useCategory, CategoryProvider }

export default function useCategory() {
  const [categories, setCategories] = useState([])

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/category/getAll-category',
      )
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])
  return categories
}
