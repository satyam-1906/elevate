require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const HallOfFame = require('../models/HallOfFame');

const ganeshChaturthiEvent = {
  eventName: 'Ganesh Chaturthi Web Challenge',
  date: new Date('2026-09-17T18:29:00.000Z'),
  description: "Code, Create, Celebrate! Elevate's Ganesh Chaturthi Web Challenge tasked student developers with crafting responsive, creative web applications using pure HTML5, CSS3, and vanilla JavaScript — no frameworks allowed — adhering to clean Git commit history and open-source GitHub practices.",
  bannerUrl: 'https://res.cloudinary.com/v9y40hk0/image/upload/v1790799831/elevate_events/u3mnzlfenitvapdnufzu.png',
  category: 'Web Challenge',
  isPublished: true,
  winners: [
    {
      position: 'Winner',
      name: 'Ashish Ranjit Shinde (bt26cse056)',
      projectTitle: 'Ganesh Chaturthi Web Experience',
      projectUrl: 'https://github.com/Ashucod/project-ganesha',
      prize: 'Winner Honors & Certificate',
      members: ['Ashish Ranjit Shinde (bt26cse056)']
    },
    {
      position: 'Winner',
      name: 'Shaurya Santosh Chaudhari (bt26cse085)',
      projectTitle: 'Ganesh Chaturthi Web Experience',
      projectUrl: 'https://github.com/shaurya-666/legendary-train',
      prize: 'Winner Honors & Certificate',
      members: ['Shaurya Santosh Chaudhari (bt26cse085)']
    }
  ]
};

async function seedRealEvent() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Remove old records
    await HallOfFame.deleteMany({});

    // Insert real event
    const created = await HallOfFame.create(ganeshChaturthiEvent);
    console.log(`Successfully created Hall of Fame event: "${created.eventName}" with ${created.winners.length} winners.`);
  } catch (error) {
    console.error('Error seeding real Hall of Fame event:', error);
  } finally {
    process.exit(0);
  }
}

seedRealEvent();
