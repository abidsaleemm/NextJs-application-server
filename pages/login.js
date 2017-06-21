import React from 'react';

export default (url) => (
    <div>
        <div>Multus Login </div >
        <div>
            <form action="/auth/local" method="post">
                <input name="username" id="username" type="text" placeholder="Your username" />
                <input name="password" id="password" type="password" placeholder="Your password" />
                <input type="submit"/>
            </form>
        </div>
    </div >
)