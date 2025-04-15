# Mentinator

YouTube link - https://www.youtube.com/watch?v=uVRIRredGnA

## Overview

Mentinator is an expert consultation AI-powered platform using pre-trained LLM Sentence Transformers models and a career acceleration platform designed to connect mentees with mentors across various engineering fields, content creation, and other career paths. Unlike traditional mentorship platforms, Mentinator leverages NLP-based intelligent matching and dynamic filtering to provide high-impact career guidance.

## Key Features

- **Expert Matching via NLP**: Users provide a description, and the system intelligently suggests suitable mentors.
- **Advanced Filter Search**: Users manually select filters to find relevant mentors.
- **Multi-Domain Support**: Expands beyond Computer Science to all engineering and creative fields.
- **Global Reach**: Designed for an international audience and mainly for the foreign market.

## Future Add-ons Features

### Expert Discovery & Search

- **Booking System**: Users select available slots and confirm bookings.
- **Ratings & Reviews**: Static/dummy for MVP.

### Booking & Scheduling System

- **Google Calendar Integration**: Manual slot selection if API response is slow.
- **Booking Confirmation**: Email notifications (via Firebase/simple notifications).
- **Payment Integration**: Razorpay/Stripe for secure payments.
- **Transaction History**: Users can view past payments and bookings.

### User Dashboard

- **Booking Management**: View upcoming & past bookings.
- **Payment & Session Summaries**: Static summary feature for MVP.

### Expert Dashboard

- **Availability Management**: Simple toggle-based availability settings.
- **Earnings Summary**: Basic revenue tracking.
- **Booking History**: View past & upcoming sessions.

### Game-Changing Features (For Scale & Differentiation)

#### AI-Powered Career Mapping & Expert Matching

- **Resume/LinkedIn Upload**: AI analyzes skills & experience.
- **Smart Job Insights**: Trends from LinkedIn/Glassdoor APIs.
- **Expert Auto-Matching**: AI suggests best expert based on skills & industry.

#### AI-Powered Skill Graph & Dynamic Pricing

- **Evolving Expert Profiles**: Skill levels adjust based on feedback & session insights.
- **Real-Time Price Adjustments**: Experts' rates adapt based on demand & reputation.

#### AI-Generated Micro-Learning Summaries

- **Smart Session Recaps**: AI generates key takeaways & action items post-session.
- **Progress Tracking**: Users get personalized insights for improvement.

#### Group Q&A & Community Learning Rooms

- **Expert-Led Group Discussions**: Community-based learning environments.
- **Topic-Based Rooms**: Dynamic discussions around industry trends & skills.

#### AI-Generated Career Roadmaps

- **Personalized Plans**: Users answer career questions, AI generates a roadmap.
- **Expert Insights + AI Guidance**: Career navigation made easy.

#### Additional Innovations

- **AI-Generated Personalized Learning Feed**.
- **Live Project Collaboration ('Build With an Expert')**.
- **Domain-Specific Virtual Labs & Simulations**.
- **Challenge an Expert: Reverse Skill Testing**.
- **Expert Reputation Score (AI-powered sentiment analysis)**.
- **AI-Powered Price Negotiation for Experts**.
- **Knowledge Subscription Model for Experts**.
- **Multi-Currency & Country-Specific Pricing**.
- **AI-Powered Career Simulation & Forecasting**.
- **Career Heatmaps & Real-Time Job Trends**.
- **Gamified Career Growth (Badges, XP, Leaderboards)**.

## Tech Stack

### Backend:

- **FastAPI**: Efficient API framework for handling mentorship queries.
- **Node.js (Express.js)**: Manages core backend functionalities.
- **Supabase**: Used for storage and retrieval of mentorship data.
- **ChromaDB**: Handles vector-based NLP queries for expert matching.
- **Hugging Face Models**: Enhances NLP-based recommendations .
- **Groq:** we used Groq API for faster summarization of user profile and reviews of the mentor

### Frontend:

- **Next.js**: Dynamic UI for mentee-mentor interactions.
- **Tailwind CSS**: We used this to ensure a responsive and minimalistic design.

### Database:

- **PostgreSQL (via Supabase)**: Stores user profiles and mentorship interactions.

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js (15.2.1)**
- **Python (3.13+)**
- **PostgreSQL (via Supabase)**

### Backend Setup

```sh
# Clone the repository
git clone https://github.com/your-repo/mentinator.git
cd mentinator

# Install dependencies
pip install -r backend/requirements.txt
npm install --prefix backend

# Start FastAPI server
cd backend
uvicorn main:app --reload
```

### Frontend Setup

```sh
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory and add:

```
SUPABASE_URL=your_supabase_url
SUPABASE_API=your_supabase_api
GROQ_API = your_supabase_url
LINKEDIN_API_KEY=your_linkedin_api_key
```

## Usage Guide

1. **Sign Up/Login**: Users authenticate via Google or LinkedIn.
2. **Provide Profile Details**: Mentees enter their career goals, interests, and domain preferences.
3. **AI-Based Matching**: NLP-powered suggestions connect mentees with suitable mentors.
4. **Manual Filtering**: Users refine searches based on domain, experience, and availability.
5. **Schedule Meetings**: In-app scheduling for mentorship sessions.

## Future Enhancements

- **Automated Session Scheduling**
- **AI-based Career Recommendations**
- **Cross-Platform Syncing**

## Contributing

We welcome contributions! Please submit pull requests following our contribution guidelines.

## License

This project is licensed under the MIT License.

## Maintainers

- [Your Name](https://linkedin.com/in/your-profile)
- [Contributor Name](https://github.com/contributor)

## Connect with Us

For queries or suggestions, reach out at **[support@mentinator.com](mailto\:support@mentinator.com)**.

