import Telescope from '../components/lib/index';
import React from 'react';

const Users = {};


Users.renderWithSideBar = function (children) {
    return (
        <div className="constraintWidth_ZyYbM container_3aBgK">
            <div className="content_1jnXo">
                {children}
                <Telescope.components.AppSideBar/>
            </div>
        </div>
    );
};

module.exports = Users;
export default Users;
