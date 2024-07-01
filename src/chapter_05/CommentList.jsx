import React from 'react';
import Comment from './Comment';

const comments = [
    {
        name: '최윤경',
        comment: '안녕하세요, 최윤경입니다.'
    },
    {
        name: '유재석',
        comment: '리액트 재미있어요~!'
    },
    {
        name: 'John Doe',
        comment: 'Hello',
    },
]

function CommentList() {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment}/>
                );
            })}
        </div>
    );
}

export default CommentList;