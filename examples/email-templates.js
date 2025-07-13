import { TemplateEngine } from '../dist/index.js';

// Create a template engine instance
const engine = new TemplateEngine();

// Add custom filters for email templates
engine.addFilter('formatDate', (date) => {
  return new Date(date).toLocaleDateString();
});

engine.addFilter('formatCurrency', (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
});

engine.addFilter('truncate', (text, length = 50) => {
  const str = String(text);
  return str.length > length ? str.substring(0, length) + '...' : str;
});

console.log('=== Welcome Email Template ===');

const welcomeTemplate = `
Dear {{ name | capitalize }},

Welcome to our platform! We're excited to have you on board.

Your account details:
- Username: {{ username | lower }}
- Email: {{ email | lower }}
- Account Type: {{ accountType | upper }}
- Created: {{ createdAt | formatDate }}

{{ isVerified ? "Your account has been verified and is ready to use." : "Please verify your email address to complete your registration." }}

{{ hasProfile ? "Your profile is complete and ready to go!" : "Don't forget to complete your profile to get the most out of our platform." }}

Best regards,
The Team
`;

const welcomeData = {
  name: 'john doe',
  username: 'JOHNDOE123',
  email: 'JOHN@EXAMPLE.COM',
  accountType: 'premium',
  createdAt: '2024-01-15',
  isVerified: true,
  hasProfile: false,
};

const welcomeEmail = engine.render(welcomeTemplate, welcomeData);
console.log(welcomeEmail);

console.log('\n=== Order Confirmation Template ===');

const orderTemplate = `
Dear {{ customerName | capitalize }},

Thank you for your order! Here are your order details:

Order #{{ orderId }}
Date: {{ orderDate | formatDate }}
Total: {{ total | formatCurrency }}

Items:
{{ items | truncate 100 }}

{{ isVIP ? "As a VIP customer, you'll receive priority shipping and exclusive benefits." : "" }}

{{ hasDiscount ? "You saved " + discountAmount + " with your discount!" : "" }}

Estimated delivery: {{ estimatedDelivery | formatDate }}

{{ orderTotal > 100 ? "Free shipping included!" : "Shipping cost: " + shippingCost | formatCurrency }}

Thank you for choosing us!
`;

const orderData = {
  customerName: 'alice smith',
  orderId: 'ORD-12345',
  orderDate: '2024-01-15',
  total: 149.99,
  items: 'Premium Widget (2x), Standard Widget (1x), Express Shipping',
  isVIP: true,
  hasDiscount: true,
  discountAmount: 25.00,
  estimatedDelivery: '2024-01-18',
  orderTotal: 149.99,
  shippingCost: 0,
};

const orderEmail = engine.render(orderTemplate, orderData);
console.log(orderEmail);

console.log('\n=== Password Reset Template ===');

const resetTemplate = `
Hello {{ name | capitalize }},

We received a request to reset your password for your account.

{{ isRecentRequest ? "This is a recent request, so we're sending you this email." : "If you didn't request this, please ignore this email." }}

Reset Link: {{ resetLink }}

This link will expire in {{ expiryHours }} hours.

{{ lastLogin ? "Your last login was on " + lastLogin | formatDate + "." : "" }}

If you have any questions, please contact our support team.

Best regards,
Security Team
`;

const resetData = {
  name: 'bob wilson',
  isRecentRequest: true,
  resetLink: 'https://example.com/reset?token=abc123',
  expiryHours: 24,
  lastLogin: '2024-01-10',
};

const resetEmail = engine.render(resetTemplate, resetData);
console.log(resetEmail);

console.log('\n=== Newsletter Template ===');

const newsletterTemplate = `
{{ newsletterTitle | upper }}

Dear {{ subscriberName | capitalize }},

{{ isNewSubscriber ? "Welcome to our newsletter! We're excited to share our latest updates with you." : "Here's what's new this week:" }}

{{ featuredArticles | truncate 200 }}

{{ hasSpecialOffer ? "SPECIAL OFFER: " + specialOffer | upper : "" }}

{{ upcomingEvents ? "Upcoming Events: " + upcomingEvents : "" }}

{{ isPremium ? "As a premium subscriber, you have access to exclusive content and early access to new features." : "Upgrade to premium for exclusive content and early access!" }}

{{ socialMediaLinks ? "Follow us on social media: " + socialMediaLinks : "" }}

Best regards,
{{ companyName | upper }} Team
`;

const newsletterData = {
  newsletterTitle: 'weekly tech digest',
  subscriberName: 'emma davis',
  isNewSubscriber: false,
  featuredArticles: 'New AI features released, Performance improvements, Security updates, and more...',
  hasSpecialOffer: true,
  specialOffer: '50% off premium features this week only!',
  upcomingEvents: 'Webinar on AI integration - Jan 20th, 2 PM EST',
  isPremium: true,
  socialMediaLinks: 'Twitter, LinkedIn, GitHub',
  companyName: 'techcorp',
};

const newsletterEmail = engine.render(newsletterTemplate, newsletterData);
console.log(newsletterEmail);
