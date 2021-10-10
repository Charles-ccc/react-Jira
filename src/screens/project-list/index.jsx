import React, {useState, useEffect} from 'react'
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useDebounce } from 'utils'
import qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 2000)
  useEffect(() => {
    fetch(`${apiUrl}/projects${qs.stringify(cleanObject(debouncedParam))}`).then(async res => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debouncedParam])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async res => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])

  const panelProps = {
    param,
    setParam,
    users,
    setUsers
  }
  return <div>
    <SearchPanel {...panelProps}/>
    <List list={list} users={users}/>
  </div>
}
