import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import '../style/WillWrite.css';

const WillWrite = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('letsWrite');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [wills, setWills] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [editId, setEditId] = useState(null);

  const friends = ['홍길동', '김영희', '이철수'];

  const handleSave = () => {
    if (!content.trim()) return alert('내용을 입력해주세요.');
    if (!recipient) return alert('수신인을 선택해주세요.');

    if (editId !== null) {
      setWills(wills.map(w =>
        w.id === editId ? { ...w, recipient, content } : w
      ));
      setEditId(null);
    } else {
      const newWill = { id: Date.now(), recipient, content };
      setWills([newWill, ...wills]);
    }

    setContent('');
  };

  const handleDraftSave = () => {
    if (!content.trim()) return alert('내용을 입력해주세요.');
    if (!recipient) return alert('수신인을 선택해주세요.');
    const newDraft = { id: Date.now(), recipient, content };
    setDrafts([newDraft, ...drafts]);
    setContent('');
  };

  const handleModify = (id) => {
    const will = wills.find(w => w.id === id);
    if (will) {
      setRecipient(will.recipient);
      setContent(will.content);
      setEditId(id);
      setActiveTab('letsWrite');
    }
  };

  const handleDelete = (id) => {
    setWills(wills.filter(w => w.id !== id));
  };

  const handleDraftModify = (id) => {
    const draft = drafts.find(d => d.id === id);
    if (draft) {
      setRecipient(draft.recipient);
      setContent(draft.content);
      setEditId(null);
      setActiveTab('letsWrite');
    }
  };

  const handleDraftDelete = (id) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  return (
    <div className="will-page">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isLoggedIn={isLoggedIn}
        handleLogin={() => setIsLoggedIn(true)}
        handleLogout={() => setIsLoggedIn(false)}
      />

      <header className="will-header">
        <div className="logo" onClick={() => navigate('/')}>MELOUD</div>
        <nav className="navbar">
          <span>ACCOUNT</span>
          <span>WILL</span>
          <span>MEMORIAL</span>
        </nav>
        <div className="profile" onClick={() => setIsSidebarOpen(true)}>Profile</div>
      </header>

      <main className="will-main">
        <aside className="will-sidebar">
          <div className={`side-item ${activeTab === 'written' ? 'active' : ''}`} onClick={() => setActiveTab('written')}>WRITTEN</div>
          <div className={`side-item ${activeTab === 'writing' ? 'active' : ''}`} onClick={() => setActiveTab('writing')}>WRITING</div>
          <div className={`side-item ${activeTab === 'letsWrite' ? 'active' : ''}`} onClick={() => setActiveTab('letsWrite')}>LET’S WRITE</div>
        </aside>

        <section className="will-content">
          {activeTab === 'letsWrite' && (
            <>
              <div className="recipient">
                Dear.
                <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                  <option value="">수신인을 선택하세요</option>
                  {friends.map((name, idx) => (
                    <option key={idx} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Write your will here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="save-buttons">
                <button className="draft" onClick={handleDraftSave}>Draft Save</button>
                <button className="save" onClick={handleSave}>
                  {editId !== null ? 'Update' : 'Save'}
                </button>
              </div>
            </>
          )}

          {activeTab === 'written' && (
            <div className="will-list">
              {wills.length === 0 ? <p>No saved wills yet.</p> :
                wills.map(will => (
                  <div className="will-card" key={will.id}>
                    <p className="will-recipient">Dear. {will.recipient}</p>
                    <div className="will-actions">
                      <button onClick={() => handleModify(will.id)} className="modify-btn">Modify</button>
                      <button onClick={() => handleDelete(will.id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'writing' && (
            <div className="will-list">
              {drafts.length === 0 ? <p>No drafts saved.</p> :
                drafts.map(draft => (
                  <div className="will-card" key={draft.id}>
                    <p className="will-recipient">Dear. {draft.recipient}</p>
                    <div className="will-actions">
                      <button onClick={() => handleDraftModify(draft.id)} className="modify-btn">Modify</button>
                      <button onClick={() => handleDraftDelete(draft.id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default WillWrite;
