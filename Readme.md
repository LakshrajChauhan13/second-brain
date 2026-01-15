## 🧠 Second Brain
A digital knowledge base to capture, organize, and retrieve your internet discoveries. Second Brain allows you to store YouTube videos, Tweets, Links, documents, and articles in one sleek interface, serving as an extension of your memory. 

## Features
- Save YouTube videos, Tweets/X posts, links, documents, and LinkedIn posts
- Tag items (max 3 per item) for quick filtering
- Personal shareable "brain" links — optionally public; anyone with the link can view the shared content.
- Authentication with JWT stored in cookies
- Server-side validation with Zod
- Optimistic UI updates and caching with TanStack Query


## 🛠️ Tech Stack
### Frontend
- **Core:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State Management:** - **TanStack Query** (Server State)
- **Redux Toolkit** (Client State)
- **Routing:** TanStack Router
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Validation:** Zod
- **Authentication:** JWT, Bcrypt, Cookie-Parser