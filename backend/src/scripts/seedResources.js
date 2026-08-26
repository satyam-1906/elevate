require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Resource = require('../models/Resource');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Clear existing
    await Resource.deleteMany({});
    console.log('Cleared existing resources');

    // Import data using dynamic import (handle windows path formatting)
    const filePath = require('path').resolve(__dirname, '../../../frontend/src/data/knowledgeData.js');
    const { knowledgeResources } = await import('file://' + filePath.replace(/\\/g, '/'));

    const docs = knowledgeResources.map((res, idx) => ({
      title: res.title,
      description: res.description,
      domain: res.domain,
      category: res.type,
      difficulty: res.difficulty,
      tags: res.tags,
      url: res.links && res.links.length > 0 ? res.links[0].url : '',
      isPublished: true,
      author: res.author,
      cost: res.cost,
      official: res.official,
      rating: res.rating,
      createdAt: new Date(Date.now() + idx * 1000)
    }));

    await Resource.insertMany(docs);
    console.log(`Inserted ${docs.length} resources`);
    
  } catch (err) {
    console.error('Error seeding resources:', err);
  } finally {
    process.exit(0);
  }
}

seed();
