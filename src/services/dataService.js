// Service centralisé pour gérer les données cohérentes entre toutes les sections

class DataService {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Utilisateurs
    this.users = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', created_at: '2024-01-15', status: 'active', totalOrders: 12, totalSpent: 1450.50 },
      { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'user', created_at: '2024-01-14', status: 'active', totalOrders: 8, totalSpent: 890.00 },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', created_at: '2024-01-13', status: 'active', totalOrders: 15, totalSpent: 2100.75 },
      { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'user', created_at: '2024-01-12', status: 'active', totalOrders: 5, totalSpent: 650.25 },
      { id: 5, name: 'David Brown', email: 'david@example.com', role: 'customer', created_at: '2024-01-11', status: 'active', totalOrders: 20, totalSpent: 3200.00 },
      { id: 6, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'admin', created_at: '2024-01-10', status: 'active', totalOrders: 3, totalSpent: 420.50 },
    ];

    // Produits
    this.products = [
      { id: 1, name: 'Laptop Pro', price: 1299.99, category: 'Electronics', description: 'High-performance laptop', available: true, stock: 45, sold: 85 },
      { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories', description: 'Ergonomic wireless mouse', available: true, stock: 120, sold: 210 },
      { id: 3, name: 'USB-C Cable', price: 12.99, category: 'Accessories', description: 'Fast charging cable', available: false, stock: 0, sold: 150 },
      { id: 4, name: 'Monitor 27"', price: 349.99, category: 'Electronics', description: '4K display monitor', available: true, stock: 30, sold: 65 },
      { id: 5, name: 'Keyboard Mechanical', price: 89.99, category: 'Accessories', description: 'RGB mechanical keyboard', available: true, stock: 75, sold: 125 },
      { id: 6, name: 'Webcam HD', price: 79.99, category: 'Electronics', description: '1080p webcam', available: true, stock: 50, sold: 95 },
      { id: 7, name: 'Headphones', price: 149.99, category: 'Accessories', description: 'Noise-cancelling headphones', available: true, stock: 60, sold: 140 },
    ];

    // Commandes
    this.orders = [
      { id: 1, userId: 1, productId: 1, amount: 1299.99, date: '2024-01-20', status: 'completed' },
      { id: 2, userId: 2, productId: 2, amount: 29.99, date: '2024-01-20', status: 'completed' },
      { id: 3, userId: 3, productId: 4, amount: 349.99, date: '2024-01-19', status: 'completed' },
      { id: 4, userId: 1, productId: 5, amount: 89.99, date: '2024-01-19', status: 'pending' },
      { id: 5, userId: 4, productId: 2, amount: 29.99, date: '2024-01-18', status: 'completed' },
      { id: 6, userId: 5, productId: 1, amount: 1299.99, date: '2024-01-18', status: 'completed' },
      { id: 7, userId: 2, productId: 7, amount: 149.99, date: '2024-01-17', status: 'completed' },
      { id: 8, userId: 3, productId: 6, amount: 79.99, date: '2024-01-17', status: 'completed' },
    ];

    // Notifications
    this.notifications = [
      { id: 1, title: 'New user registered', message: 'John Doe just created an account', type: 'info', time: '5 min ago', read: false, userId: 1 },
      { id: 2, title: 'Payment received', message: 'Payment of $1299.99 received from Order #1', type: 'success', time: '15 min ago', read: false, orderId: 1 },
      { id: 3, title: 'Low stock alert', message: 'Product "USB-C Cable" is out of stock', type: 'warning', time: '1 hour ago', read: false, productId: 3 },
      { id: 4, title: 'System update', message: 'System will be updated tonight at 2 AM', type: 'info', time: '2 hours ago', read: true },
      { id: 5, title: 'New order placed', message: 'Order #3 has been placed by Mike Johnson', type: 'success', time: '3 hours ago', read: true, orderId: 3, userId: 3 },
      { id: 6, title: 'Server maintenance', message: 'Scheduled maintenance completed successfully', type: 'success', time: '5 hours ago', read: true },
    ];

    // Messages
    this.messages = [
      { id: 1, userId: 2, sender: 'Sarah Smith', avatar: 'SS', message: 'Hey, I have a question about my order #2', time: '10:30 AM', unread: true, orderId: 2 },
      { id: 2, userId: 3, sender: 'Mike Johnson', avatar: 'MJ', message: 'Thanks for the quick response!', time: '9:45 AM', unread: true },
      { id: 3, userId: 4, sender: 'Emma Wilson', avatar: 'EW', message: 'Can you help me with the payment issue?', time: 'Yesterday', unread: false },
      { id: 4, userId: 5, sender: 'David Brown', avatar: 'DB', message: 'Product received, everything looks great!', time: 'Yesterday', unread: false },
      { id: 5, userId: 6, sender: 'Lisa Anderson', avatar: 'LA', message: 'When will my order be shipped?', time: '2 days ago', unread: false },
    ];
  }

  // Méthodes pour Users
  getUsers() {
    return [...this.users];
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  addUser(user) {
    const newUser = { ...user, id: this.users.length + 1, created_at: new Date().toISOString().split('T')[0], totalOrders: 0, totalSpent: 0 };
    this.users.push(newUser);
    this.addNotification({
      title: 'New user registered',
      message: `${user.name} just created an account`,
      type: 'info',
      userId: newUser.id
    });
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      return this.users[index];
    }
    return null;
  }

  deleteUser(id) {
    this.users = this.users.filter(u => u.id !== id);
  }

  // Méthodes pour Products
  getProducts() {
    return [...this.products];
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.products.length + 1, sold: 0 };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id, updates) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updates };
      if (updates.stock !== undefined && updates.stock < 10) {
        this.addNotification({
          title: 'Low stock alert',
          message: `Product "${this.products[index].name}" is running low on stock`,
          type: 'warning',
          productId: id
        });
      }
      return this.products[index];
    }
    return null;
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
  }

  // Méthodes pour Orders
  getOrders() {
    return this.orders.map(order => ({
      ...order,
      user: this.getUserById(order.userId),
      product: this.getProductById(order.productId)
    }));
  }

  addOrder(order) {
    const newOrder = { ...order, id: this.orders.length + 1, date: new Date().toISOString().split('T')[0] };
    this.orders.push(newOrder);
    
    // Mettre à jour les stats utilisateur
    const user = this.getUserById(order.userId);
    if (user) {
      user.totalOrders += 1;
      user.totalSpent += order.amount;
    }
    
    // Mettre à jour les stats produit
    const product = this.getProductById(order.productId);
    if (product) {
      product.sold += 1;
      product.stock -= 1;
    }
    
    // Ajouter notification
    this.addNotification({
      title: 'New order placed',
      message: `Order #${newOrder.id} has been placed`,
      type: 'success',
      orderId: newOrder.id,
      userId: order.userId
    });
    
    return newOrder;
  }

  // Méthodes pour Notifications
  getNotifications() {
    return [...this.notifications].sort((a, b) => b.id - a.id);
  }

  addNotification(notification) {
    const newNotif = {
      ...notification,
      id: this.notifications.length + 1,
      time: 'Just now',
      read: false
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }

  markNotificationAsRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.read = true;
  }

  markAllNotificationsAsRead() {
    this.notifications.forEach(n => n.read = true);
  }

  // Méthodes pour Messages
  getMessages() {
    return this.messages.map(msg => ({
      ...msg,
      user: this.getUserById(msg.userId)
    }));
  }

  addMessage(message) {
    const newMessage = { ...message, id: this.messages.length + 1, time: 'Just now' };
    this.messages.push(newMessage);
    return newMessage;
  }

  // Analytics & Dashboard Stats
  getDashboardStats() {
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.amount, 0);
    const totalOrders = this.orders.length;
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(u => u.status === 'active').length;
    const pendingOrders = this.orders.filter(o => o.status === 'pending').length;
    
    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders,
      totalUsers,
      activeUsers,
      pendingOrders,
      avgOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
    };
  }

  getWeeklySales() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => {
      const dayOrders = this.orders.filter((_, i) => i % 7 === index);
      const revenue = dayOrders.reduce((sum, o) => sum + o.amount, 0);
      const orders = dayOrders.length;
      const customers = new Set(dayOrders.map(o => o.userId)).size;
      return { day, orders, revenue: Math.round(revenue), customers };
    });
  }

  getCategoryData() {
    const categories = {};
    this.products.forEach(p => {
      if (!categories[p.category]) categories[p.category] = 0;
      categories[p.category] += p.sold;
    });
    
    const total = Object.values(categories).reduce((sum, val) => sum + val, 0);
    const colors = { Electronics: '#0d6efd', Accessories: '#198754', Software: '#ffc107', Services: '#fd7e14', Others: '#dc3545' };
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value: Math.round((value / total) * 100),
      color: colors[name] || '#6c757d'
    }));
  }

  getRecentActivity() {
    return this.orders.slice(-4).reverse().map(order => {
      const user = this.getUserById(order.userId);
      return {
        user: user?.name || 'Unknown',
        action: 'Made a purchase',
        time: this.getTimeAgo(order.date),
        amount: `$${order.amount}`
      };
    });
  }

  getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }

  // Reports
  getReports() {
    return [
      { id: 1, name: 'Monthly Sales Report', date: '2024-01-15', type: 'Sales', size: '2.4 MB', status: 'Ready', data: this.getDashboardStats() },
      { id: 2, name: 'User Activity Report', date: '2024-01-14', type: 'Analytics', size: '1.8 MB', status: 'Ready', data: { totalUsers: this.users.length, activeUsers: this.users.filter(u => u.status === 'active').length } },
      { id: 3, name: 'Product Performance', date: '2024-01-13', type: 'Products', size: '3.2 MB', status: 'Ready', data: { totalProducts: this.products.length, totalSold: this.products.reduce((sum, p) => sum + p.sold, 0) } },
      { id: 4, name: 'Revenue Analysis Q1', date: '2024-01-10', type: 'Finance', size: '4.1 MB', status: 'Ready', data: this.getDashboardStats() },
      { id: 5, name: 'Customer Feedback', date: '2024-01-08', type: 'Support', size: '1.5 MB', status: 'Processing', data: { messages: this.messages.length } },
    ];
  }
}

// Instance singleton
const dataService = new DataService();
export default dataService;
