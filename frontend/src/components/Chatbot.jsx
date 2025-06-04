// src/components/Chatbot.jsx
import React, { useState } from 'react';
import { useChatbot } from '../contexts/ChatbotContext'; // useChatbot은 이름 변경 필요 없음 (외부 Context)
import '../style/Chatbot.css'; // CSS 파일명은 그대로 유지

const Chatbot = () => {
  const { isChatbotOpen, toggleChatbot } = useChatbot(); // Context의 isChatbotOpen, toggleChatbot은 그대로 유지

  const [searchTerm, setSearchTerm] = useState('');

  // 서비스 사용법 FAQ 데이터 (API 연동 없음)
  const faqData = [
    // --- 1. 서비스 개요 ---
    {
      question: "멜라우드(MELOUD)는 어떤 서비스인가요?",
      answer: "멜라우드는 Memory(기억) + Cloud(백업 저장공간)의 합성어로, 사용자가 자신의 유언을 작성하고, 소중한 사람들과의 추억을 공유하며, 사후에도 자신의 이야기가 계속될 수 있도록 돕는 디지털 유산 관리 서비스입니다."
    },
    {
      question: "멜라우드 서비스의 요금은 무료인가요?",
      answer: "멜라우드는 기본적인 유언 작성 및 추억 공유 기능을 무료로 제공합니다."
    },

    // --- 2. 유언 관련 ---
    {
      question: "유언은 어떻게 작성할 수 있나요?",
      answer: "홈 화면에서 'WILL' 메뉴 또는 'Preparation of Will' 카드를 클릭하면 유언 작성 페이지로 이동합니다. 안내에 따라 유언 내용을 작성하고 저장할 수 있습니다."
    },
    {
      question: "유언 작성 시 어떤 내용을 포함해야 하나요?",
      answer: "본 플랫폼의 유언은 법적 효력을 갖지 못합니다. 따라서 유언 작성 시 소중한 메시지, 수신인과의 추억 등등 등 다양한 내용을 자유롭게 포함하여 작성하시면 됩니다."
    },
    {
      question: "작성한 유언은 언제 공개되나요?",
      answer: "작성하신 유언은 등록된 사망 인증이 완료되었을 때, 미리 설정해둔 수신인에게 자동으로 전달됩니다. 사전에 수신인을 지정할 수 있습니다."
    },

    // --- 3. 추모 공간 관련 ---
    {
      question: "추모 공간은 어떻게 이용하나요?",
      answer: "홈 화면에서 'MEMORIAL' 메뉴 또는 'Memorial Space' 카드를 클릭하세요. 사망 인증 절차를 거친 후, 고인을 추모하고 추억을 공유하는 공간으로 입장할 수 있습니다. 사망 인증은 한 번만 하면 됩니다."
    },
    {
      question: "사망 인증은 어떻게 진행되나요?",
      answer: "사망 인증은 유족이나 지정된 대리인이 공식 사망 증명 서류(예: 사망진단서, 기본증명서 상세)를 제출하여 진행됩니다. 제출된 서류는 사용자 정보 대조 후 검토 및 승인됩니다."
    },
    {
      question: "추억 공유 공간에는 어떤 콘텐츠를 올릴 수 있나요?",
      answer: "사진 또는 텍스트 일기를 업로드하여 고인과의 소중한 추억을 기록하고 공유할 수 있습니다. 각 콘텐츠는 최대 용량 제한이 있을 수 있습니다."
    },
    {
      question: "추모글은 비공개로 설정할 수 있나요?",
      answer: "네, 추모글은 공개 또는 비공개로 설정할 수 있습니다. 비공개 설정 시에는 추모글 작성 당시 설정한 비밀번호 입력 후에에 고인을 추억하고 콘텐츠를 열람할 수 있습니다."
    },
    {
      question: "사진/동영상 업로드 용량 제한이 있나요?",
      answer: "네, 효율적인 서비스 운영을 위해 각 콘텐츠(사진/동영상)당 업로드 용량 제한이 있을 수 있습니다. 자세한 용량 제한 정보는 업로드 페이지 또는 FAQ 섹션에서 확인하실 수 있습니다."
    },

    // --- 4. 계정 및 보안 ---
    {
      question: "로그인 및 회원가입은 어떻게 하나요?",
      answer: "메인 화면에서 'Share On with Meloud +' 버튼을 클릭하거나, 프로필 아이콘을 통해 사이드바를 열어 로그인/회원가입 메뉴에 접근할 수 있습니다."
    },
    {
      question: "계정 관리 기능은 무엇인가요?",
      answer: "홈 화면에서 'ACCOUNT' 메뉴 또는 'Check My Account' 카드를 클릭하면 계정 조회, 삭제 요청 등 계정 관련 기능을 이용할 수 있습니다."
    },
    {
      question: "비밀번호를 잊어버렸을 때 어떻게 해야 하나요?",
      answer: "로그인 페이지에서 '비밀번호 찾기' 링크를 클릭하여 본인 인증 절차를 거친 후, 새로운 비밀번호를 설정할 수 있습니다. 등록된 이메일 또는 휴대폰 번호를 통해 인증 코드를 받게 됩니다."
    },
    {
      question: "계정을 다시 활성화할 수 있나요?",
      answer: "탈퇴 요청 후 일정 기간(예: 30일) 이내에는 계정 재활성화가 가능할 수 있습니다. 해당 기간이 지나면 데이터가 영구 삭제되어 복구가 어려울 수 있으니, 해당 서비스의 고객센터로 문의하여 자세한 안내를 받으시기 바랍니다."
    },
    {
      question: "개인 정보는 어떻게 보호되나요?",
      answer: "멜라우드는 사용자 개인정보 보호를 최우선으로 생각합니다. 모든 데이터는 암호화되어 안전하게 저장되며, 개인정보처리방침에 따라 엄격하게 관리됩니다. 법적 요구사항 없이는 어떤 개인 정보도 외부에 공개되지 않습니다."
    },
    {
      question: "유언 및 추억 기록의 보안은 어떻게 유지되나요?",
      answer: "사용자가 작성하는 유언과 추억 기록은 강력한 암호화 기술로 보호되며, 접근 권한이 있는 사용자(본인 또는 지정된 수신인)만 열람할 수 있습니다. 시스템 접근에 대한 엄격한 통제와 정기적인 보안 감사로 데이터의 무결성과 기밀성을 유지합니다."
    },

    // --- 5. 기타 ---
    {
      question: "멜라우드 웹사이트 외 다른 플랫폼에서도 이용 가능한가요?",
      answer: "현재 멜라우드는 웹사이트를 통해 주로 서비스되고 있습니다. 향후 사용자 편의를 위해 모바일 앱(iOS, Android) 개발을 계획하고 있으며, 업데이트 시 공지될 예정입니다."
    },
    {
      question: "서비스가 종료되면 내 데이터는 어떻게 되나요?",
      answer: "서비스 종료 시에는 사용자에게 충분한 사전 공지를 통해 데이터를 백업하거나 이전할 수 있는 기회를 제공합니다. 개인정보처리방침에 따라 안전하게 데이터가 처리되며, 법적 요구사항에 따라 보관될 수 있습니다."
    },
    {
      question: "멜라우드 서비스 업데이트는 얼마나 자주 이루어지나요?",
      answer: "멜라우드는 사용자 경험 개선과 보안 강화를 위해 정기적으로 서비스를 업데이트하고 있습니다. 주요 업데이트 시에는 공지사항을 통해 미리 안내해 드리며, 소규모 업데이트는 수시로 적용될 수 있습니다."
    }
  ];

  // filteredFaqs 변수명 변경
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // isChatbotOpen은 Context에서 오므로 변경하지 않음
  if (!isChatbotOpen) {
    return null;
  }

  return (
    // className은 CSS 파일과 일치해야 하므로 변경하지 않음
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {/* className은 CSS 파일과 일치해야 하므로 변경하지 않음 */}
        <button onClick={toggleChatbot} className="chatbot-close-btn">x</button>

        {/* className은 CSS 파일과 일치해야 하므로 변경하지 않음 */}
        <div className="chatbot-header">
          <h3>멜라우드 FAQ</h3>
        </div>

        {/* className은 CSS 파일과 일치해야 하므로 변경하지 않음 */}
        <div className="chatbot-search">
          <input
            type="text"
            placeholder="검색어를 입력하세요 (예: 유언, 추모, 보안, 요금, 앱, 비밀번호)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="chatbot-search-input" // className은 CSS 파일과 일치해야 하므로 변경하지 않음
          />
        </div>

        {/* className은 CSS 파일과 일치해야 하므로 변경하지 않음 */}
        <div className="chatbot-body">
          {/* filteredFaqs 변수명 적용 */}
          {filteredFaqs.length > 0 ? (
            <div className="faq-list">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <p className="faq-question">Q: {faq.question}</p>
                  <p className="faq-answer">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            // className은 CSS 파일과 일치해야 하므로 변경하지 않음
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
        {/* className은 CSS 파일과 일치해야 하므로 변경하지 않음 */}
        <p className="chatbot-footer">추가 문의는 고객센터를 이용해주세요.</p>
      </div>
    </div>
  );
};

// 컴포넌트 이름은 Chatbot으로 유지
export default Chatbot;