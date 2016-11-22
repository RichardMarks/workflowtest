export class Demo {
  constructor() {
    const item = document.createElement('div');
    item.appendChild(document.createTextNode('This is working'));
    Object.assign(item.style, {
      fontSize: '48px',
      fontFamily: 'sans-serif',
    });
    document.body.appendChild(item);
  }
}

