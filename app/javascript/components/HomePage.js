import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

const HomePage = () => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")

    const getUsers = async (params) => {
        await axios.get("http://127.0.0.1:3000/users").then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            setError(err)
        })
    }
    useEffect(async () => {
        await getUsers()
    }, [])

    return (
        <div>
            {users.map((value, index) => {
                return (
                    <div key={index}>
                        {value.email}
                    </div>

                )
            })}
        </div>
    )

}

export default HomePage;