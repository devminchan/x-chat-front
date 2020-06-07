import React from 'react';

function Main() {
  const itemList = [
    <li>
      <div>
        <h3>#연애 상담</h3>
        <h4>요즘 외로우신가요?</h4>
      </div>
    </li>,
  ];

  return (
    <div>
      <header>
        <h1>#20대 고민 상담</h1>
      </header>
      <div>
        <ul>{itemList}</ul>
      </div>
    </div>
  );
}

export default Main;
