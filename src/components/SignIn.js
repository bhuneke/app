import React from 'react';
import fetcher from '../helpers/fetcher';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    doFetch(state) {
        fetcher({
            path: '/signin',
            method: 'POST',
            body: state,
        })
        .then(res => {
            return res.json();
        })
        .then(token => {
            console.log(token);
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.setState({
            password,
            username,
        });
        this.doFetch(this.state);
        event.target.reset();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type='text' ref='username' placeholder='username'  />   
                <input type='text' ref='password' placeholder='password'  />
 
                <button type='submit'>Submit</button>
            </form>
        );
    }
}

export default SignIn;
