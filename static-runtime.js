document.addEventListener('DOMContentLoaded', () => {
  const contact = document.querySelector('.contact-form');
  contact?.addEventListener('submit', (event) => {
    event.preventDefault();
    const notice = document.createElement('div');
    notice.className = 'form-notice form-notice--success';
    notice.innerHTML = '<strong>Thank you.</strong><span>This portfolio demo has received your inquiry.</span>';
    contact.replaceWith(notice);
  });

  const chatBody = document.querySelector('.agent-chat__body');
  const addReply = () => {
    if (!chatBody) return;
    window.setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-message chat-message--agent';
      bubble.innerHTML = '<span>Thank you. This is a portfolio demo—please use the email or phone link to continue.</span>';
      chatBody.appendChild(bubble);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 350);
  };
  document.querySelectorAll('[data-chat-message]').forEach((button) => button.addEventListener('click', addReply));
  document.querySelector('.agent-chat__form')?.addEventListener('submit', addReply);
});
