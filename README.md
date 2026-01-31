# 📝 Article Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

> Pełnostackowa aplikacja do zarządzania artykułami z systemem autentyfikacji i panelem administratora.

Aplikacja pozwala użytkownikom na rejestrację, logowanie oraz zarządzanie artykułami. Administratorzy mają dodatkowe uprawnienia do zarządzania kategoriami i użytkownikami. Bezpieczeństwo zapewnione przez JWT w HttpOnly cookies.

## 🚀 Demo

*(Dodaj zrzuty ekranu aplikacji)*

## ✨ Funkcjonalności

### Dla użytkowników:
- ✅ Rejestracja i logowanie
- ✅ Przeglądanie artykułów
- ✅ Tworzenie, edytowanie i usuwanie własnych artykułów
- ✅ Kategoryzacja artykułów

### Dla administratorów:
- ✅ Zarządzanie kategoriami (CRUD)
- ✅ Panel administracyjny
- ✅ Zarządzanie użytkownikami

### Ogólne:
- 🔒 Bezpieczna autentyfikacja JWT
- 📱 Responsywny design
- 🎨 Nowoczesny interfejs Material-UI
- 🗄️ Baza danych MongoDB

## 🛠️ Technologie

### Backend
- **Node.js** - Środowisko uruchomieniowe
- **Express.js** - Framework webowy
- **MongoDB** - Baza danych NoSQL
- **Mongoose** - ODM dla MongoDB
- **JWT** - Autentyfikacja
- **bcrypt** - Hashowanie haseł
- **cookie-parser** - Obsługa cookies

### Frontend
- **React 18** - Biblioteka UI
- **React Router** - Routing
- **Axios** - Klient HTTP
- **Material-UI** - Komponenty UI
- **Tailwind CSS** - Stylizacja

### Narzędzia
- **Git** - Kontrola wersji
- **npm** - Menedżer pakietów
- **VS Code** - Edytor kodu

## 📋 Wymagania wstępne

- Node.js (wersja 16 lub wyższa)
- MongoDB (lokalnie lub w chmurze)
- npm lub yarn

## 🔧 Instalacja

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/Matthe-W-hite/article-manager.git
   cd article-manager
   ```

2. **Zainstaluj zależności backendu:**
   ```bash
   cd backend
   npm install
   ```

3. **Zainstaluj zależności frontendu:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Skonfiguruj zmienne środowiskowe:**
   W folderze `backend` utwórz plik `.env`:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   MONGODB_URI=mongodb://localhost:27017/article-manager
   PORT=5000
   ```

## 🚀 Uruchomienie

1. **Uruchom backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Uruchom frontend (w nowym terminalu):**
   ```bash
   cd frontend
   npm start
   ```

3. **Otwórz aplikację:**
   Przejdź do [http://localhost:3000](http://localhost:3000)

## 📖 Jak używać

1. **Rejestracja:** Utwórz konto na stronie rejestracji
2. **Logowanie:** Zaloguj się swoimi danymi
3. **Artykuły:** Przeglądaj, twórz i edytuj artykuły
4. **Admin:** Jeśli masz rolę admin, zarządzaj kategoriami w panelu

## 🔌 API

### Autentyfikacja
- `POST /api/auth/register` - Rejestracja użytkownika
- `POST /api/auth/login` - Logowanie
- `POST /api/auth/logout` - Wylogowanie
- `GET /api/auth/me` - Pobierz dane zalogowanego użytkownika

### Artykuły
- `GET /api/articles` - Pobierz wszystkie artykuły
- `POST /api/articles` - Utwórz artykuł (wymaga autentyfikacji)
- `PUT /api/articles/:id` - Edytuj artykuł (autor lub admin)
- `DELETE /api/articles/:id` - Usuń artykuł (autor lub admin)

### Kategorie
- `GET /api/categories` - Pobierz kategorie
- `POST /api/categories` - Utwórz kategorię (admin)
- `PUT /api/categories/:id` - Edytuj kategorię (admin)
- `DELETE /api/categories/:id` - Usuń kategorię (admin)

## 🤝 Contributing

Chcesz przyczynić się do rozwoju? Świetnie!

1. **Fork** repozytorium
2. Utwórz **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** zmian (`git commit -m 'Add some AmazingFeature'`)
4. **Push** do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz **Pull Request**

### Standardy kodu
- Używaj ESLint
- Pisz testy dla nowych funkcji
- Aktualizuj dokumentację

## 📄 Licencja

Ten projekt jest dostępny na licencji MIT - zobacz plik [LICENSE](LICENSE) po szczegóły.

## 👤 Autor

**Matthe-W-hite**
- GitHub: [@Matthe-W-hite](https://github.com/Matthe-W-hite)
- Projekt stworzony w ramach nauki full-stack development

---

⭐ Jeśli projekt Ci się podoba, daj gwiazdkę na GitHub!