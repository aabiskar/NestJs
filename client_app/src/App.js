import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import UserLists from  "./components/userList";
import AddUser from  "./components/addUser";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">User Lists</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">
                        <UserLists />
                    </Route>
                    <Route exact path="/add-user">
                        <AddUser />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
