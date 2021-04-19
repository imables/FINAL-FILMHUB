import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from './../../Utils'
import './styles.scss';


/**
 * Profile component that displays user information
 *
 * @author Jakob Ripley
 */


//linking pages and getting current user data and checking if they have admin rights.
const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminToolbar = props => {
    const { currentUser } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    if(!isAdmin) return null;

    return (
        <div className = "adminBar">
            <ul>
                <li>
                    <Link to="/admin">
                        My Admin
                    </Link>
                    <Link to="/posts">
                        User posts
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminToolbar;
