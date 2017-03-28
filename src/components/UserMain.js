import React, {Component, PropTypes} from 'react';
import { Route, Switch } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserMoodsDay from './UserMoodsDay';
import UserMoodSelector from './UserMoodSelector';
import UserCommentView from './UserCommentView';
import UserWeekView from './UserWeekView';
import UserMonthView from './UserMonthView';
import fetcher from '../helpers/fetcher';

export default class UserMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    componentDidMount() {
        const token = localStorage.getItem('token');        
        fetcher({ 
            path: '/user', 
            method: 'GET', 
            token: token 
        })
        .then(res => {
            return res.json();
        })
        .then(user => {
            this.setState({
                user
            });
        //, () => {fetcher()} insert as callback
        })

        .catch(err => 
            console.log(err)
        );
    }

    render() {
        const { match } = this.props;
        const user = this.state.user;
        return (
            <div>
                < UserHeader user={ user }/>
                <span>Today's weather: </span>
                <span>Location: </span>
                <Switch>
                    < Route exact path={`${match.url}`} render={props => (<UserMoodsDay {...props} user={ user }/>)} />
                    < Route path={`${match.url}/moods`} render={props => (<UserMoodSelector {...props} />)} />
                    < Route path={`${match.url}/comments`} component={ UserCommentView }/>
                    < Route path={`${match.url}/week`} component={ UserWeekView }/>
                    < Route path={`${match.url}/month`} component={ UserMonthView }/>
                </Switch>
            </div>
        );
    }
}