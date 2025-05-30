// src/components/Chatbot.jsx
import React from 'react';
import { useChatbot } from '../contexts/ChatbotContext';
import '../style/Chatbot.css';

const Chatbot = () => {
  const { isChatbotOpen, toggleChatbot } = useChatbot();

  // 서비스 사용법 FAQ 데이터 (API 연동 없음)
  const faqData = [
    {
      question: "멜라우드(MELOUD)는 어떤 서비스인가요?",
      answer: "멜라우드는 사용자가 자신의 유언을 작성하고, 소중한 사람들과의 추억을 공유하며, 사후에도 자신의 이야기가 계속될 수 있도록 돕는 디지털 유산 관리 서비스입니다."
    },
    {
      question: "유언은 어떻게 작성할 수 있나요?",
      answer: "홈 화면에서 'WILL' 메뉴 또는 'Preparation of Will' 카드를 클릭하면 유언 작성 페이지로 이동합니다. 안내에 따라 유언 내용을 작성하고 저장할 수 있습니다."
    },
    {
      question: "추모 공간은 어떻게 이용하나요?",
      answer: "홈 화면에서 'MEMORIAL' 메뉴 또는 'Memorial Space' 카드를 클릭하세요. 사망 인증 절차를 거친 후, 고인을 추모하고 추억을 공유하는 공간으로 입장할 수 있습니다. 사망 인증은 한 번만 하면 됩니다."
    },
    {
      question: "계정 관리 기능은 무엇인가요?",
      answer: "홈 화면에서 'ACCOUNT' 메뉴 또는 'Check My Account' 카드를 클릭하면 계정 조회, 삭제 요청 등 계정 관련 기능을 이용할 수 있습니다."
    },
    {
      question: "로그인 및 회원가입은 어떻게 하나요?",
      answer: "메인 화면에서 'Share On with Meloud +' 버튼을 클릭하거나, 프로필 아이콘을 통해 사이드바를 열어 로그인/회원가입 메뉴에 접근할 수 있습니다."
    },
  ];

  if (!isChatbotOpen) {
    return null;
  }

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h3>멜라우드 챗봇</h3>
          <button onClick={toggleChatbot} className="chatbot-close-btn">X</button>
        </div>
        <div className="chatbot-body">
          <p className="chatbot-intro">궁금한 점을 선택해주세요:</p>
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <p className="faq-question">Q: {faq.question}</p>
                <p className="faq-answer">A: {faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="chatbot-footer">추가 문의는 고객센터를 이용해주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;