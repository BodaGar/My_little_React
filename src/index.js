import './styles/style.css';

function createElement(tag, attr, children = []) {
  if (attr === undefined) {
    attr = {};
  }

  const { className, style, textContent } = attr;

  return {
    tag: tag,
    style: style,
    props: {
      children: children,
    },
    className: className,
    textContent: textContent,
    dom: null,
  };
}

function render(elem, parentDOMNode) {
  const { tag, props, className, style, textContent } = elem;
  const domNode = document.createElement(tag);

  elem.dom = domNode;

  if (Array.isArray(props.children)) {
    props.children.forEach((child) => {
      mount(child, domNode);
    });
  }

  if (typeof elem === 'string') {
    parentDOMNode.appendChild(domNode);
  }

  if (typeof props.children === 'string') {
    mount(props.children, domNode);
  }

  if (className !== undefined) {
    domNode.className = className;
  }

  if (textContent !== undefined) {
    domNode.textContent = textContent;
  }

  if (style !== undefined) {
    Object.keys(style).forEach(
      (styleKey) => (domNode.style[styleKey] = style[styleKey]),
    );
  }
  parentDOMNode.appendChild(domNode);

  return domNode;
}

function mount(input, parentDOMNode) {
  if (typeof input === 'string' || typeof input === 'number') {
    mountText(input, parentDOMNode);
  } else {
    render(input, parentDOMNode);
  }
}

function mountText(text, parentDOMNode) {
  const textNode = document.createTextNode(text);
  parentDOMNode.appendChild(textNode);
}

const React = {
  createElement,
  render,
};

const app = React.createElement(
  'div',
  { className: 'my-class', style: { backgroundColor: 'red' } },
  [
    React.createElement('span', undefined, 'Hello world'),
    React.createElement('br'),
    'This is just a text node',
    React.createElement('div', { textContent: 'Text content' }),
  ],
);

React.render(app, document.getElementById('app'));
