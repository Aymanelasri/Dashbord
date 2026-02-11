# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


---

## 🔗 Système de Données Interconnectées

Ce dashboard utilise un **service centralisé de gestion des données** qui assure la cohérence entre toutes les sections.

### 🚀 Démarrage Rapide

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

### 📚 Documentation Complète

| Document | Description | Temps |
|----------|-------------|-------|
| **[QUICK_OVERVIEW.md](./QUICK_OVERVIEW.md)** | 🎯 Vue d'ensemble rapide | 5 min |
| **[QUICK_START.md](./QUICK_START.md)** | 🚀 Guide rapide pour développeurs | 15 min |
| **[SUMMARY.md](./SUMMARY.md)** | 📊 Récapitulatif complet | 10 min |
| **[DATA_INTERCONNECTION.md](./DATA_INTERCONNECTION.md)** | 📖 Documentation détaillée | 30 min |
| **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** | 📑 Index de navigation | 5 min |
| **[VISUAL_DIAGRAM.md](./VISUAL_DIAGRAM.md)** | 🎨 Diagrammes visuels | 10 min |
| **[CHANGELOG.md](./CHANGELOG.md)** | 📝 Historique des modifications | 5 min |
| **[FILES_LIST.md](./FILES_LIST.md)** | 📁 Liste des fichiers | 5 min |

### Architecture

```
dataService.js (Source unique de vérité)
    ↓
    ├── Dashboard    → Statistiques globales en temps réel
    ├── Analytics    → Graphiques basés sur données réelles
    ├── Users        → Stats d'achat (totalOrders, totalSpent)
    ├── Products     → Stock et ventes (stock, sold)
    ├── Reports      → Rapports avec données réelles
    ├── Notifications → Liées aux users/orders/products
    └── Messages     → Contexte utilisateur et commandes
```

### Interconnexions Principales

1. **Users ↔ Orders**
   - Chaque commande met à jour `totalOrders` et `totalSpent` de l'utilisateur
   - Visible dans la section Users

2. **Products ↔ Orders**
   - Chaque commande réduit le `stock` et augmente `sold`
   - Alerte automatique si stock < 10

3. **Notifications Automatiques**
   - Nouveau user → Notification "New user registered"
   - Nouvelle commande → Notification "New order placed"
   - Stock faible → Notification "Low stock alert"

4. **Messages ↔ Users**
   - Chaque message affiche l'email de l'utilisateur
   - Lien vers les commandes associées

5. **Dashboard & Analytics**
   - Utilisent les mêmes sources de données
   - Statistiques cohérentes et synchronisées

### Fichiers Clés

- `src/services/dataService.js` - Service centralisé
- `src/services/dataServiceDemo.js` - Démonstrations
- `src/services/dataServiceTests.js` - Tests automatisés
- `src/components/DataInterconnectionViewer.jsx` - Visualisation

### Utilisation

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

### Avantages

✅ **Cohérence** - Une seule source de vérité  
✅ **Synchronisation** - Toutes les sections affichent les mêmes données  
✅ **Traçabilité** - Liens entre users, orders, products, notifications  
✅ **Automatisation** - Notifications et mises à jour automatiques  
✅ **Maintenabilité** - Logique centralisée, facile à modifier

### Tests

```javascript
// Dans la console du navigateur
window.runDataTests()  // Tests automatisés
window.runDataDemo()   // Démonstrations
```

Pour plus de détails, consultez la [documentation complète](./DOCUMENTATION_INDEX.md).
