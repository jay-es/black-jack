import React from 'react';

const Score = ({ cards, hidden, name, point }) =>
  hidden ? (
    <div>
      {name}: ** [{cards[0] && cards[0].sym + cards[0].num}, **]
    </div>
  ) : (
    <div>
      {name}: {point} [{cards.map(v => v.sym + v.num).join()}]
    </div>
  );

export default Score;
