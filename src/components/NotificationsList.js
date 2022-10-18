import React, { useEffect, useState } from 'react';
import { Icon, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import Pagination from './Pagination';

export default function Notifications() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // API fetch
    useEffect(() => {
        const getData =  () => {
            axios.get("https://notificationsapi2022.azurewebsites.net/api/notifications")
            .then((response) => {
                setData(response.data.reverse()); // Show new records on top
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
                setIsLoading(true);
            })
        }
        const interval = setInterval(() => {
             getData();
        }, 2000);
        return () => clearInterval(interval);
    }, [setData]);

    // ITEM ID
    const setID = (id) => {
        localStorage.setItem("id", id)
    }

    //DELETE
    const onDelete = (id) => {
        axios.delete(`https://notificationsapi2022.azurewebsites.net/api/notifications/${id}`)
            .then((getData) => {
                setData(getData.data);
            })
        console.log(`item ${id} deleted `)
    }

    return (
        <div className='container'>
            <div className='top'>
                <div className='list-title'>
                    <h2>Notifications</h2>
                </div>
                <input className='search'
                    placeholder="Search Contact/Content"
                    onChange={event => setQuery(event.target.value)}
                />
                <div className='btn-new'>
                    <Link to="/create">
                        <Button primary>Create New</Button>
                    </Link>
                </div>
            </div>
            <input className='search-mobile'
                placeholder="Search Contact/Content"
                onChange={event => setQuery(event.target.value)}
            />
            <Table celled>
                <Table.Header>
                    <Table.Row  >
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Contact</Table.HeaderCell>
                        <Table.HeaderCell>Content</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body className="list" >
                {isLoading ? (
                    <Table.Row  positive>
                        <Table.Cell><h2>Loading...</h2></Table.Cell>
                    </Table.Row>
                ) : (
                    data.filter(notification => { // SEARCH CONTACT AND CONTENT
                        if (query === "") {
                            return notification;
                        } else if (notification.contact.toLowerCase().includes(query.toLowerCase())) {
                            return notification;
                        } else if (notification.content.toLowerCase().includes(query.toLowerCase())) {
                            return notification;
                        }
                        return false;
                    }).map(notification => (  // LIST ALL
                    <Table.Row key={notification.id}>
                        <Table.Cell>
                            {notification.type === "SMS" ? <Icon className='mobile' name='mobile' /> : <Icon className='email' name='mail' />}
                            {notification.type}
                        </Table.Cell>
                        <Table.Cell>
                            {notification.contact}
                        </Table.Cell>
                        <Table.Cell>
                            <Link to={`/update/${notification.id}`}>
                                {notification.content}
                            </Link>
                        </Table.Cell>
                        {notification.status === false ?
                            <Table.Cell negative className="neg-pos-width">
                                Waiting...
                                <br />
                                <Icon name='attention' />
                                Not sent
                            </Table.Cell> :
                            <Table.Cell positive className="neg-pos-width">
                                <Icon name='checkmark' />
                                Sent
                            </Table.Cell>}
                        <Table.Cell >
                            <Link to={`/update/${notification.id}`}>
                                <Button
                                    basic color='blue'
                                    //content='Update'
                                    onClick={() => setID(notification.id)} >
                                    <Icon name='edit outline' />Update
                                </Button>
                            </Link>
                            <Button
                                basic color='red'
                                //content='Delete'
                                onClick={() => onDelete(notification.id)}
                            >
                                <Icon name='delete' />Delete
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                    )))}
                </Table.Body>
            </Table>
        </div>
    )
}
