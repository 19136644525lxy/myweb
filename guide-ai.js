// ==================== 核心配置：关键词-答案库（可自定义） ====================
const keywordAnswers = {
  // 基础指引类
  "下载链接": "您需要哪个版本MC的下载链接？请回答版本号，版本号有：1.20.1、1.21.1、衍生版",
  "1.20.1": "1.20.1的版本有5个版本(旧时代都是冒险居多，新生代大部分都是养老主题，然后现在有任务书的只有新生代、混沌乱世{隶属于衍生版}）,有仨个版本为统一链接，分别为：1、旧时代、旧时代28w06a版、旧时代进化；2、旧时代重制版；3、新生代（中高配推荐），请回复1-3任意数字",
  "1": "https://www.xyebbs.com/res-id/lixiangguo?tab=download",
  "2": "https://www.xyebbs.com/res-id/Utopia-Adventure-Old-Era-Jurassic-Era?tab=download",
  "3": "https://qm.qq.com/q/5iAhA0U1QI",
  "1.21.1": "1.21.1的版本有2个版本，分别为：一、新生代1.21移植；二、更真实的理想国，请回复一到二任意数字",
  "一":"https://www.xyebbs.com/res-id/lixiangguo?tab=download",
  "二":"https://www.xyebbs.com/res-id/a-more-realistic-ideal-country?tab=download",
  "衍生版":"衍生版有以下：混沌乱世（需按照任务书走，目前处于测试阶段，有bug及时反馈）；请回复混沌乱世",
  "混沌乱世":"https://www.xyebbs.com/res-id/chaotic-turbulent-time?tab=info",
  "作者主页":"<a href='about.html' target='_blank'>点击访问作者主页</a>",
  "你好":"你好呀！冒险者",
  "彩蛋":"哈基米~哈基米~哈基米~",
  "其他版本":"后续应该会有吧...嗯对"
};

// ==================== 基础配置 ====================
const aiConfig = {
  defaultReply: "抱歉，听不懂思密达QWQ",
  botName: "理想国冒险之旅接待AI",
  maxInputLength: 500,
  typingDelay: 600 // 模拟AI思考延迟（毫秒）
};

// ==================== 工具函数 ====================
/**
 * 获取格式化的当前时间
 * @returns {string} 格式：HH:MM:SS
 */
function getFormattedTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

/**
 * 关键词匹配核心函数
 * @param {string} userInput 用户输入内容
 * @returns {string} 匹配到的答案或默认回复
 */
function matchKeyword(userInput) {
  // 空输入返回默认回复
  if (!userInput.trim()) return aiConfig.defaultReply;
  
  // 统一转为小写，避免大小写影响匹配
  const lowerInput = userInput.trim().toLowerCase();
  
  // 遍历关键词库，匹配包含的关键词
  if (keywordAnswers.hasOwnProperty(lowerInput)) {
    return keywordAnswers[lowerInput];
  }
  
  // 无匹配关键词时返回默认回复
  return aiConfig.defaultReply;
}

// ==================== 聊天界面操作函数 ====================
/**
 * 添加消息到聊天界面
 * @param {string} content 消息内容
 * @param {string} type 消息类型：user/ai/loading/welcome
 */
function addMessageToUI(content, type) {
  const chatMessages = document.getElementById('chat-messages');
  const time = getFormattedTime();
  let messageHTML = '';

  switch (type) {
    case 'user':
      messageHTML = `
        <div class="message-item user-message">
          <div class="message-avatar user-avatar">你</div>
          <div class="message-content-wrapper">
            <div class="message-bubble">${content}</div>
            <div class="message-time">${time}</div>
          </div>
        </div>
      `;
      break;
      
    case 'ai':
      messageHTML = `
        <div class="message-item ai-message">
          <div class="message-avatar ai-avatar">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0QT9BN0E5Ii8+CjxwYXRoIGQ9Ik00MCAyNUMzMS43MTYgMjUgMjUgMzEuNzE2IDI1IDQwQzI1IDQ4LjI4NCAzMS43MTYgNTUgNDAgNTVDNDguMjg0IDU1IDU1IDQ4LjI4NCA1NSA0MEM1NSAzMS43MTYgNDguMjg0IDI1IDQwIDI1WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0yNSA2MEMyNSA1My4zNzMgMzAuMzczIDQ4IDM3IDQ4QzQzLjYyNyA0OCA0OSA1My4zNzMgNDkgNjBAOTAgNjAgOTAgNjUgMCA2NVY2MEMwIDYwIDAgNjUgMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik00MCAzM1YzNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0zMCAzM0gzMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==" alt="AI头像">
          </div>
          <div class="message-content-wrapper">
            <div class="message-bubble">${content}</div>
            <div class="message-time">${time}</div>
          </div>
        </div>
      `;
      break;
      
    case 'loading':
      messageHTML = `
        <div class="message-item ai-message">
          <div class="message-avatar ai-avatar">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM0QT9BN0E5Ii8+CjxwYXRoIGQ9Ik00MCAyNUMzMS43MTYgMjUgMjUgMzEuNzE2IDI1IDQwQzI1IDQ4LjI4NCAzMS43MTYgNTUgNDAgNTVDNDguMjg0IDU1IDU1IDQ4LjI4NCA1NSA0MEM1NSAzMS43MTYgNDguMjg0IDI1IDQwIDI1WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0yNSA2MEMyNSA1My4zNzMgMzAuMzczIDQ4IDM3IDQ4QzQzLjYyNyA0OCA0OSA1My4zNzMgNDkgNjBAOTAgNjAgOTAgNjUgMCA2NVY2MEMwIDYwIDAgNjUgMCA2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik00MCAzM1YzNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0zMCAzM0gzMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+Cjwvc3ZnPg==" alt="AI头像">
          </div>
          <div class="message-content-wrapper">
            <div class="message-bubble">
              <div class="loading-indicator">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'welcome':
      messageHTML = `
        <div class="welcome-message">
          <p>👋 您好！我是理想国冒险之旅接待人</p>
          <p style="margin-top: 8px; font-size: 12px;">支持查询：下载链接，作者主页等等</p>
        </div>
      `;
      break;
  }

  chatMessages.insertAdjacentHTML('beforeend', messageHTML);
  // 滚动到最新消息
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 发送消息核心函数
 */
function sendMessage() {
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const content = userInput.value.trim();

  // 空输入不处理
  if (!content) return;

  // 禁用发送按钮和输入框
  sendBtn.disabled = true;
  userInput.disabled = true;

  // 添加用户消息到界面
  addMessageToUI(content, 'user');
  
  // 清空输入框并重置字符计数
  userInput.value = '';
  updateCharCount();
  
  // 添加加载状态
  addMessageToUI('', 'loading');

  // 模拟AI思考延迟
  setTimeout(() => {
    // 移除加载状态
    const chatMessages = document.getElementById('chat-messages');
    const loadingElements = chatMessages.querySelectorAll('.loading-indicator');
    if (loadingElements.length > 0) {
      loadingElements[0].closest('.message-item').remove();
    }

    // 匹配关键词并生成回复
    const reply = matchKeyword(content);
    addMessageToUI(reply, 'ai');

    // 重新启用按钮和输入框
    sendBtn.disabled = false;
    userInput.disabled = false;
    userInput.focus();
  }, aiConfig.typingDelay);
}

/**
 * 更新字符计数
 */
function updateCharCount() {
  const userInput = document.getElementById('user-input');
  const charCount = document.getElementById('char-count');
  const length = userInput.value.length;
  charCount.textContent = `${length}/${aiConfig.maxInputLength}`;
  
  // 超过最大长度时标红
  if (length > aiConfig.maxInputLength) {
    charCount.style.color = '#f56c6c';
    userInput.value = userInput.value.substring(0, aiConfig.maxInputLength);
    updateCharCount(); // 递归更新
  } else {
    charCount.style.color = '#999';
  }
}

/**
 * 清空聊天记录
 */
function clearChatHistory() {
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = '';
  // 重新添加欢迎消息
  addMessageToUI('', 'welcome');
}

/**
 * 自适应文本框高度
 */
function autoResizeTextarea() {
  const textarea = document.getElementById('user-input');
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // 最大高度限制
}

// ==================== 初始化函数 ====================
function initChat() {
  // 添加欢迎消息
  addMessageToUI('', 'welcome');

  // 获取DOM元素
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const clearChatBtn = document.getElementById('clear-chat');

  // 绑定发送按钮点击事件
  sendBtn.addEventListener('click', sendMessage);

  // 绑定回车发送（Shift+回车换行）
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // 绑定字符计数更新事件
  userInput.addEventListener('input', () => {
    updateCharCount();
    autoResizeTextarea();
  });

  // 绑定清空聊天记录事件
  clearChatBtn.addEventListener('click', clearChatHistory);

  // 初始化字符计数
  updateCharCount();

  // 自动聚焦输入框
  userInput.focus();
}

// 页面加载完成后初始化聊天
document.addEventListener('DOMContentLoaded', initChat);