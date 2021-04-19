import React from 'react';
import './styles.scss';
import { firestore, auth, userIdRef } from '../../firebase/utils';
import { UpdateName } from "./UpdateName";
import { Dashboard } from "../Dashboard/index";
import firebase from 'firebase/app';

/**
 * Component that gets data from firebase(database) and passes it to other components.
 *
 * @author Jakob Ripley
 */

function Users() {
    const [users, setUsers] = React.useState([]);
    
  //use effect that run on startup which maps through data and sets id to the individual id's.
    React.useEffect(() => {
      const fetchData = async () => {
        const db = firebase.firestore();
        const data = await db.collection("users").get();
        setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      };
      fetchData();
    }, []);


    //JSX (HTML) passes user data to the UpdateName component. 
    return (
        <ul className= "mb-3 mt-5 card card-content content has-background-link-light">
          {users.map(user => (
              <div>
            <li className="list" key={user.displayName, user.email, user}>
                            <br/>
                        <UpdateName user={user} users={users} />
                        </li>
            
            </div>
          ))}
          
        </ul>
      );
    }

   

export default Users;