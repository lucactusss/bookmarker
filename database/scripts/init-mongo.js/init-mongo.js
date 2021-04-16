db.createUser({
  user: 'bookmarker',
  pwd: '*Bookmarker',
  roles: [
    {
      role: 'dbOwner',
      db: 'bookmarker'
    }
  ]
});

db = db.getSiblingDB('bookmarker');

db.createCollection('VideoLink');
db.createCollection('PhotoLink');
db.createCollection('Keyword');