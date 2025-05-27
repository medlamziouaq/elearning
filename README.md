# Blockchain E-Learning Platform

A modern e-learning platform built with React, TypeScript, and Web3 integration for secure certificate management.

A project by : [Mohammed Lamziouaq](https://github.com/medlamziouaq) & [OUGHEGI El Mehdi](https://github.com/comehdi)



## Features

### Course Management
- Browse available courses
- Enroll in courses
- Track learning progress
- Manage courses (for trainers)
- View personal course list

### Authentication & Authorization
- Secure login system
- Role-based access control:
  - Learners (Apprenants)
  - Trainers (Formateurs)
  - Administrators

### Blockchain Integration
- Web3 integration for secure certificate management
- Mint certificates upon course completion
- View and manage personal certificates

### Admin Features
- Comprehensive admin dashboard
- User management
- Course oversight
- System monitoring

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI
- **Routing**: React Router
- **State Management**: React Context API
- **Blockchain**: Web3 Integration
- **Styling**: CSS Modules with Material-UI theming

## Running the app

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/0.jpg?raw=true)


### Admin Access

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/1.jpg?raw=true)

 - Admin dashboard

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/2.jpg?raw=true)

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/3.jpg?raw=true)

 - Add a professor

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/4.jpg?raw=true)

### Professor Access

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/5.jpg?raw=true)

 - Add a course

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/6.jpg?raw=true)

 - Course Mangement

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/7.jpg?raw=true)

- Professor Dashboard 

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/8.jpg?raw=true)

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/9.jpg?raw=true)

### Student Access

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/10.jpg?raw=true)

- Available courses

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/11.jpg?raw=true)

- Course enrollement

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/12.jpg?raw=true)

- Student dashboard

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/13.jpg?raw=true)

- Get certificat

![alt text](https://github.com/medlamziouaq/elearning/blob/main/screenshots/14.jpg?raw=true)


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/medlamziouaq/elearning.git
cd elearning
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── context/        # React Context providers
├── pages/          # Page components
└── App.tsx         # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_WEB3_PROVIDER_URL=your_web3_provider_url
VITE_CONTRACT_ADDRESS=your_smart_contract_address
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Support

For support, please open an issue in the repository or contact the development team.

 [Mohammed Lamziouaq](https://github.com/medlamziouaq) 
 
 [OUGHEGI El Mehdi](https://github.com/comehdi)
