export const configuration = {
  MONGODB: {
    MONGODB_URI: `mongodb://${process.env.MONGODB_USER || 'bookmarker'}:${
      process.env.MONGODB_PASSWORD || '*Bookmarker'
    }@${process.env.MONGODB_DB_URI || 'localhost'}:27017/${
      process.env.MONGODB_DB_NAME || 'bookmarker'
    }`,
    MONGODB_USER: process.env.MONGODB_USER || 'bookmarker',
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '*Bookmarker',
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'bookmarker',
  },
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
};
