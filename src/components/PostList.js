import { React } from '../vendor/index';
import { PostListItem } from './PostListItem';

export function PostList() {
    const currentNode = React.createElement(
        'div',
        { className: 'app' },
        [ 
          React.createElement('h1', { className: 'hello' }, 'My little App'),
          PostListItem(),
          React.createElement( 'ul', { className: 'list-organization' } ),
        ]
    );
    const promise = getResponse();
    
    async function getResponse() {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            alert('Error HTTP: ' + response.status);
        }
        return json;
    }
    
    function getTenItems() {
        const count = 0;
        promise.then(value => {  
            const trim = value.splice(count, 10); 

            const ul = document.querySelector('.list-organization');
            trim.forEach(element => {

                React.render(
                    React.createElement(
                        'li',
                        { className: 'lists', id: `${element.id}` },
                        [ `${element.title} - ${element.body}` ]
                    ),
                    ul    
                );
            });
        });
        count + 10;
    }
    getTenItems();
   
    return currentNode;
}