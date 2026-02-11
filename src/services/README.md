# 📦 Services - Système de Données Interconnectées

Ce dossier contient tous les services liés à la gestion centralisée des données.

## 📁 Fichiers

### 1. dataService.js
**Le cœur du système** - Service centralisé de gestion des données

#### Responsabilités
- Gestion de toutes les données (Users, Products, Orders, Notifications, Messages)
- Méthodes CRUD complètes
- Calculs automatiques des statistiques
- Interconnexions automatiques entre entités
- Création automatique de notifications

#### Utilisation
```javascript
import dataService from './services/dataService';

// Récupérer des données
const users = dataService.getUsers();
const stats = dataService.getDashboardStats();

// Ajouter une commande (met à jour automatiquement user et product)
dataService.addOrder({
  userId: 1,
  productId: 2,
  amount: 29.99,
  status: 'completed'
});
```

#### Méthodes Principales
- **Users:** `getUsers()`, `getUserById()`, `addUser()`, `updateUser()`, `deleteUser()`
- **Products:** `getProducts()`, `getProductById()`, `addProduct()`, `updateProduct()`, `deleteProduct()`
- **Orders:** `getOrders()`, `addOrder()`
- **Notifications:** `getNotifications()`, `addNotification()`, `markNotificationAsRead()`, `markAllNotificationsAsRead()`
- **Messages:** `getMessages()`, `addMessage()`
- **Stats:** `getDashboardStats()`, `getWeeklySales()`, `getCategoryData()`, `getRecentActivity()`
- **Reports:** `getReports()`

---

### 2. dataConfig.js
**Configuration du système** - Définit les relations et règles

#### Contenu
- **DATA_RELATIONSHIPS** - Relations entre entités (hasMany, belongsTo, computedFields)
- **VALIDATION_RULES** - Règles de validation des données
- **AUTOMATION_RULES** - Règles d'automatisation (notifications, mises à jour)
- **AGGREGATION_CONFIG** - Configuration des agrégations pour Dashboard/Analytics
- **REPORT_CONFIG** - Configuration des rapports

#### Utilisation
```javascript
import config from './services/dataConfig';

// Accéder aux relations
const userRelations = config.relationships.user;

// Accéder aux règles de validation
const userValidation = config.validation.user;

// Accéder aux règles d'automatisation
const orderAutomation = config.automation.onOrderCreate;
```

#### Exemple de Configuration
```javascript
// Relation User
user: {
  hasMany: ['orders', 'messages', 'notifications'],
  computedFields: {
    totalOrders: (user, orders) => orders.filter(o => o.userId === user.id).length,
    totalSpent: (user, orders) => orders.filter(o => o.userId === user.id).reduce((sum, o) => sum + o.amount, 0)
  }
}
```

---

### 3. dataServiceDemo.js
**Démonstrations interactives** - Exemples d'utilisation du système

#### Contenu
- 10 démonstrations complètes
- Exemples d'interconnexions
- Vérification de cohérence
- Guide interactif

#### Utilisation
```javascript
import demo from './services/dataServiceDemo';

// Exécuter toutes les démonstrations
demo.runDemo();

// Ou dans la console du navigateur
window.runDataDemo();
```

#### Démonstrations Incluses
1. Cohérence Dashboard/Analytics
2. Users ↔ Orders
3. Products ↔ Orders
4. Notifications Automatiques
5. Alerte Stock Faible
6. Messages ↔ Users
7. Reports avec Données Réelles
8. Catégories Dynamiques
9. Activité Récente
10. Cohérence Globale

---

### 4. dataServiceTests.js
**Tests automatisés** - Validation du système

#### Contenu
- 8 suites de tests automatisés
- Validation des interconnexions
- Vérification de cohérence
- Rapport de tests détaillé

#### Utilisation
```javascript
import { runTests } from './services/dataServiceTests';

// Exécuter tous les tests
const results = runTests();

// Ou dans la console du navigateur
window.runDataTests();
```

#### Tests Inclus
1. User ↔ Order Interconnection
2. Product ↔ Order Interconnection
3. Automatic Notification Creation
4. Message ↔ User Link
5. Dashboard Data Consistency
6. Analytics Data Consistency
7. Reports Data Integrity
8. Global Data Consistency

#### Résultat des Tests
```javascript
{
  total: 25,
  passed: 25,
  failed: 0,
  successRate: 100,
  tests: [...]
}
```

---

## 🔗 Relations entre les Fichiers

```
dataService.js (Implémentation)
    ↓
    ├── Utilise → dataConfig.js (Configuration)
    ├── Testé par → dataServiceTests.js (Tests)
    └── Démontré par → dataServiceDemo.js (Démos)
```

## 🎯 Quand Utiliser Quel Fichier

### Pour Développer
→ **dataService.js** - Importer et utiliser les méthodes

### Pour Configurer
→ **dataConfig.js** - Modifier les relations et règles

### Pour Tester
→ **dataServiceTests.js** - Valider les modifications

### Pour Apprendre
→ **dataServiceDemo.js** - Voir des exemples concrets

## 📊 Flux de Données

```
Component
    ↓
dataService.js
    ↓
    ├── Lit configuration → dataConfig.js
    ├── Applique règles → VALIDATION_RULES
    ├── Exécute automatisations → AUTOMATION_RULES
    └── Retourne données
```

## 🚀 Démarrage Rapide

### 1. Importer le Service
```javascript
import dataService from '../services/dataService';
```

### 2. Utiliser dans un Composant
```javascript
function MyComponent() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(dataService.getUsers());
  }, []);
  
  return (/* ... */);
}
```

### 3. Tester
```javascript
// Dans la console
window.runDataTests();
```

## 📚 Documentation Complète

Pour plus de détails, consultez :
- **QUICK_START.md** - Guide rapide
- **DATA_INTERCONNECTION.md** - Documentation complète
- **SUMMARY.md** - Vue d'ensemble

## 🔍 Exemples de Code

### Ajouter un Utilisateur
```javascript
const newUser = dataService.addUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer'
});
// ✅ Crée automatiquement une notification
```

### Ajouter une Commande
```javascript
dataService.addOrder({
  userId: 1,
  productId: 2,
  amount: 50.00,
  status: 'completed'
});
// ✅ Met à jour user.totalOrders et user.totalSpent
// ✅ Met à jour product.sold et product.stock
// ✅ Crée une notification
```

### Obtenir les Stats
```javascript
const stats = dataService.getDashboardStats();
// {
//   totalRevenue: "3711.74",
//   totalOrders: 8,
//   totalUsers: 6,
//   avgOrderValue: "463.97",
//   ...
// }
```

## ⚠️ Notes Importantes

1. **Singleton** - dataService est une instance unique partagée
2. **En mémoire** - Les données sont stockées en mémoire (rechargement = reset)
3. **Automatique** - Les interconnexions se font automatiquement
4. **Cohérence** - Toutes les sections utilisent les mêmes données

## 🎓 Bonnes Pratiques

### ✅ À FAIRE
```javascript
// Toujours recharger après modification
dataService.addUser(userData);
setUsers(dataService.getUsers());
```

### ❌ À ÉVITER
```javascript
// Ne pas modifier directement
const users = dataService.getUsers();
users[0].name = 'New Name'; // ❌
```

## 🆘 Support

Pour toute question :
1. Consulter la documentation (QUICK_START.md, DATA_INTERCONNECTION.md)
2. Exécuter les démos (dataServiceDemo.js)
3. Lancer les tests (dataServiceTests.js)

---

**Dernière mise à jour:** Janvier 2024
**Version:** 1.0
**Status:** ✅ Production Ready
