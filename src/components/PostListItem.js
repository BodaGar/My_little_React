import { React } from '../vendor/index';
import { PostList } from './PostList';

export function PostListItem() {

    const createBtn = React.createElement(
        'button',
        { className: 'btn', onclick: renderMore },
        'Add more'
    );

    function renderMore() {
        
        console.log('More item');
    }
    
    return createBtn;
}