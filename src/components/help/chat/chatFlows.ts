
import { ChatFlow } from './types';

export const chatFlows: ChatFlow = {
  welcome: {
    message: "Hi there! 👋 I'm Sarah from Springing Stars support. How can I help you today?",
    options: [
      { id: '1', text: '📚 Academic Issues', nextFlow: 'academic' },
      { id: '2', text: '🔐 Account Problems', nextFlow: 'account' },
      { id: '3', text: '💻 Technical Issues', nextFlow: 'technical' },
      { id: '4', text: '💰 Payment/Fees', nextFlow: 'payment' },
      { id: '5', text: '📞 Contact Information', nextFlow: 'contact' }
    ]
  },
  academic: {
    message: "I'd be happy to help with academic matters! What specifically are you having trouble with?",
    options: [
      { id: '1', text: '📊 Can\'t see my grades', nextFlow: 'grades_issue' },
      { id: '2', text: '📝 Assignment submission problems', nextFlow: 'assignment_issue' },
      { id: '3', text: '📅 Timetable questions', nextFlow: 'timetable_issue' },
      { id: '4', text: '👩‍🏫 Teacher communication', nextFlow: 'teacher_contact' }
    ]
  },
  account: {
    message: "I can help you with account-related issues. What seems to be the problem?",
    options: [
      { id: '1', text: '🔑 Forgot my password', nextFlow: 'password_reset' },
      { id: '2', text: '👤 Update profile information', nextFlow: 'profile_update' },
      { id: '3', text: '🚫 Account locked/suspended', nextFlow: 'account_locked' },
      { id: '4', text: '📧 Email not working', nextFlow: 'email_issue' }
    ]
  },
  technical: {
    message: "Technical issues can be frustrating! Let me help you troubleshoot. What's happening?",
    options: [
      { id: '1', text: '🌐 Website not loading properly', nextFlow: 'website_issue' },
      { id: '2', text: '📱 Mobile app problems', nextFlow: 'mobile_issue' },
      { id: '3', text: '🔄 Sync issues between devices', nextFlow: 'sync_issue' },
      { id: '4', text: '💾 File upload problems', nextFlow: 'upload_issue' }
    ]
  },
  payment: {
    message: "I can assist with payment and fee-related questions. How can I help?",
    options: [
      { id: '1', text: '💳 Payment not processing', nextFlow: 'payment_failed' },
      { id: '2', text: '🧾 Need fee receipt/invoice', nextFlow: 'receipt_request' },
      { id: '3', text: '❓ Questions about fee structure', nextFlow: 'fee_structure' },
      { id: '4', text: '📅 Payment plan options', nextFlow: 'payment_plan' }
    ]
  },
  contact: {
    message: "Here are the best ways to reach us:\n\n📞 Phone: +256 123 456 789\n📧 Email: support@school.edu\n💬 WhatsApp: +256 123 456 789\n\nOur support team is available Monday-Friday, 8AM-6PM EAT.",
    isEnd: true
  },
  grades_issue: {
    message: "I understand you can't see your grades. This usually happens when:\n\n• Grades haven't been published yet\n• You're looking in the wrong section\n• There's a temporary sync issue\n\nTry going to 'Results' > 'My Grades' in the sidebar. If you still can't see them, your teacher might not have published them yet.",
    isEnd: true
  },
  assignment_issue: {
    message: "Assignment submission problems are common! Here's what to try:\n\n1. Check the deadline hasn't passed\n2. Ensure your file is under 10MB\n3. Use supported formats (PDF, DOC, DOCX)\n4. Try refreshing the page and submitting again\n\nIf it still doesn't work, please contact your teacher directly.",
    isEnd: true
  },
  password_reset: {
    message: "To reset your password:\n\n1. Go to your Profile page\n2. Click 'Change Password'\n3. Enter your current password\n4. Create a new password\n\nIf you've completely forgotten your password, contact the admin office for a manual reset.",
    isEnd: true
  },
  website_issue: {
    message: "For website loading issues, try these steps:\n\n1. Clear your browser cache and cookies\n2. Try a different browser\n3. Check your internet connection\n4. Disable browser extensions temporarily\n\nIf the problem persists, it might be a server issue on our end.",
    isEnd: true
  },
  payment_failed: {
    message: "Payment processing issues can happen for several reasons:\n\n• Insufficient funds\n• Card expired or blocked\n• Bank security restrictions\n• Network timeout\n\nPlease check with your bank first, then try again. You can also visit the school office to pay in person.",
    isEnd: true
  }
};
