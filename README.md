# Government Benefits Guide - Form Application

A modern, multi-step form application built with React, TypeScript, and Vite. This application guides users through a multi-step form process to collect personal information, address details, and consent preferences.

## Features

- **Multi-step Form Flow**: Progressive form collection with step-by-step navigation
- **Address Autocomplete**: Google Places API integration for address selection
- **Form Validation**: Real-time validation with error handling and animations
- **Local Storage Persistence**: Form data is automatically saved and restored
- **Accessible UI**: ARIA labels, keyboard navigation, and semantic HTML
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Google Maps API** - Address autocomplete
- **React Context API** - State management

## Prerequisites

- Node.js 18+ and npm
- Google Maps API key (for address autocomplete)

## Getting a Google Maps API Key

The application requires a Google Maps API key to enable address autocomplete functionality. Follow these steps to obtain one:

1. **Go to Google Cloud Console**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create a New Project** (or select an existing one)
   - Click the project dropdown at the top
   - Click "New Project"
   - Enter a project name and click "Create"

3. **Enable Required APIs**
   - In the left sidebar, go to "APIs & Services" > "Library"
   - Search for "Places API" and click on it
   - Click "Enable"
   - Also enable "Maps JavaScript API" (required for Places API) and the Geocoding API

4. **Create API Key**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

5. **Add to Environment Variables**
   - Create a `.env` file in the project root (if it doesn't exist)
   - Add your API key:
     ```env
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd take-home-exercise
```

2. Install dependencies:

```bash
npm install
```

3. Set up your Google Maps API key:
   - Follow the instructions in the [Getting a Google Maps API Key](#getting-a-google-maps-api-key) section above
   - Create a `.env` file in the root directory with your API key:
     ```env
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Documentation

- **README.md** - This file, project overview and setup
- **ARCHITECTURE.md** - Detailed architecture documentation, design decisions, and data flow

## Project Structure

```
src/
├── components/          # React components
│   ├── AddressAutocomplete/  # Google Places autocomplete
│   ├── FormField/            # Reusable form input with floating label
│   ├── Tabs/                 # Tab navigation component
│   ├── Tab/                  # Tab container and variants
│   └── ...
├── context/             # React Context definitions
│   └── formContext.ts   # Form state context type
├── hooks/               # Custom React hooks
│   ├── useFormContext.ts      # Hook to access form context
│   └── useFormSubmission.ts   # Form submission with validation
├── providers/           # Context providers
│   └── FormProvider.tsx # Form context provider
├── utils/               # Utility functions
│   ├── validation.ts    # Form field validators
│   ├── addressParser.ts # Google Maps address parsing
│   ├── formData.ts      # FormData conversion utilities
│   └── classNames.ts    # Conditional className generators
├── types.ts             # TypeScript type definitions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Form Flow

The application follows a multi-step form flow:

1. **Email Step (Step 0)**: Collect email and consent preferences
2. **Info Step (Step 1)**: Collect personal information (name, DOB, gender)
3. **Address Step (Step 2)**: Collect address and phone number
4. **Complete Step (Step 3)**: Confirmation screen

## Key Components

### FormProvider

Provides form state and actions to child components via React Context. The context includes:

- `formData`: Current form data state
- `formStep`: Current step in the form flow
- `activeTab`: Currently active tab
- `updateFormData`: Function to update form data
- `setFormStep`: Function to update form step
- `setActiveTab`: Function to change active tab

### useFormSubmission

Custom hook that handles form submission with validation:

- Validates specified fields
- Supports custom validation functions
- Transforms form data before submission
- Handles error state management

### AddressAutocomplete

Component that integrates with Google Places API to provide address autocomplete functionality. Automatically parses selected addresses into structured components (street, city, state, zip).

## Validation

The application includes validators for:

- **Email**: Standard email format validation
- **Date of Birth**: MM/DD/YYYY format with date validity checks
- **Phone Number**: 10-digit US phone number format
- **Zip Code**: 5-digit or 5+4 format (12345 or 12345-6789)

## Local Storage

Form data is automatically saved to `localStorage` with a 300ms debounce to prevent excessive writes. Data is restored when the application loads.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Style

The project uses:

- **ESLint** for linting
- **Prettier** for code formatting
- **TypeScript** strict mode for type checking

## Environment Variables

| Variable                   | Description                                 |
| -------------------------- | ------------------------------------------- |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key for Places autocomplete |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is a take-home exercise.
