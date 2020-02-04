import React from 'react';


import List from '@material-ui/core/List';
import {CardContent, Card, Divider} from '@material-ui/core';
import { IPost } from '../../typings';
import { UserPost } from './UserPost';

import '../../styles/user-info.css';

interface Props {
    userPosts: IPost[];
    handlePostDelete: (index: number) => void;
}

export const UserPosts = (props: Props) => {
    const numOfPosts = props.userPosts.length;

    return (
        <Card className={'user-posts__wrapper'}>
            <CardContent className="user-posts">
                <List>
                    {props.userPosts.map((post: IPost, index: number) => {
                       return (
                           <React.Fragment key={index}>
                               <UserPost post={post} handlePostDelete={props.handlePostDelete}/>
                               {shouldRenderDivider(numOfPosts, index)}
                           </React.Fragment>
                       );
                    })}
                </List>
            </CardContent>
        </Card>
    )
};

const shouldRenderDivider = (numOfPosts: number, postIndex: number) => {
    if (numOfPosts - 1 !== postIndex) {
        return <Divider />;
    }

    return null;
};

