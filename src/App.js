import React, {useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [invite, setInvate] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchUsers('https://reqres.in/api/users')
    }, []);

    function fetchUsers(url) {
        fetch(url)
            .then((res) =>res.json())
            .then((json) => {
                setUsers(json.data)
            })
            .catch(err => {
                console.warn(err);
                alert('Error!!!')
            })
            .finally(() => setIsLoading(false))
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onClickInvite = (user) =>{
        if(invite.includes(user.id)) {
            setInvate(invite.filter(item => item !== user.id))
        } else {
            setInvate([...invite, user.id])
        }
    }

    const onClickSuccess = () => {
        setSuccess(true)
    };

    const onCloseSucess = () => {
        setSuccess(false);
        setInvate([]);
    };

    return (
        <div className="App">
            {success ? (
                <Success 
                    onCloseSucess={onCloseSucess}
                    count={invite.length}/>
            ) : (
                <Users 
                    items={users} 
                    isLoading={isLoading} 
                    searchValue={searchValue}
                    onChangeSearchValue={onChangeSearchValue}
                    invite={invite}
                    onClickInvite={onClickInvite}
                    onClickSuccess={onClickSuccess}/>
                )
            }
        </div>
    );
}

export default App;
