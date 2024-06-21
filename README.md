# PhotoCloud

PhotoCloud is a fully MERN stack web app that allows users to generate image links so that they can store images on the cloud and share them online with others.

## Features

- **Image Upload**: Upload images up to 10MB in size.
- **Generate Remote Image URLs**: Generate remote image URLs for your local photos and get instant access to shareable remote URLs for every uploaded image.
- **Time-Limited Image Access**: Use a specific image for a limited time period only.
- **Smooth User Experience**: Utilizes TailwindCSS for a smooth and responsive user interface.
- **Dynamic URL Generation**: Dynamically generates remote image URLs for specific time periods, utilizing HTML `<img>` tags with dynamic `src` attributes linked to server endpoints. This enables developers to embed images in web applications seamlessly.

## Live Demo

[See the Site Live](https://photocloud.vercel.app/)

## Screenshots

Add some screenshots of your application here.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Vercel

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation Steps

1. **Clone the repo**

   ```sh
   git clone https://github.com/your-username/photocloud.git

Navigate to the project directory

   ```sh
   cd photocloud
   
   sh cd client
   npm install
   cd ../server
   npm install

Set up your environment variables

Create a .env file in the server directory and add your MongoDB URI and any other required environment variables.

MONGO_URI=your_mongodb_uri


Run the application

Open two terminal windows or tabs:

In the first terminal window, navigate to the server directory and run the backend server:

cd server
npm start

cd client
npm start

Open your browser

Open http://localhost:3000 to view the application.

Contact
Your Name - @[twitter](https://twitter.com/chinmayakumar27) - official.chinu2127@example.com

Project Link: https://
