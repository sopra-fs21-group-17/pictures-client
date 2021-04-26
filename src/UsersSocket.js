const users = []

const addUser = ({id, name, room}) => {
    const numberOfUsersInRoom = users.filter(user => user.room === room).length
    if(numberOfUsersInRoom === 5)
        return { error: 'Room full' }

    const newUser = { id, name, room }
    users.push(newUser)
    return { newUser }
}

