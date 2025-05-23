import React from 'react';
import '../style/WillList.css';

const dummyWills = [
  { id: 1, recipient: 'My Friend', content: 'Thank you for everything.' },
  { id: 2, recipient: 'My Family', content: 'Please live happily.' },
];

const WillList = () => {
  const handleModify = (id) => {
    alert(`Modify will ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete will ID: ${id}`);
  };

  return (
    <div className="will-list">
      {dummyWills.map(will => (
        <div className="will-card" key={will.id}>
          <p className="will-recipient">Dear. {will.recipient}</p>
          <div className="will-actions">
            <button onClick={() => handleModify(will.id)} className="modify-btn">Modify</button>
            <button onClick={() => handleDelete(will.id)} className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WillList;
