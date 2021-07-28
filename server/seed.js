require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/vote');

// const db = require('./models');

const DB = 'mongodb+srv://onkar:#@8SYG7fvXicB-m@cluster0.8q6ed.mongodb.net/voting?retryWrites=true&w=majority'
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
console.log('connection successful');

}).catch((err)=> console.log('no connection'));

const users = [
  { username: 'username', password: 'password' },
  { username: 'kelvin', password: 'password' },
];

const polls = [
  {
    question: 'Which is the best JavaScript framework',
    options: ['Angular', 'React', 'VueJS'],
  },
  { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
  { question: 'Truth or dare', options: ['Truth', 'Dare'] },
  { question: 'Boolean?', options: ['True', 'False'] },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('DROP ALL USERS');

    await db.Poll.remove();
    console.log('DROP ALL POLLS');

    await Promise.all(
      users.map(async user => {
        const data = await db.User.create(user);
        await data.save();
      }),
    );
    console.log('CREATED USERS', JSON.stringify(users));

    await Promise.all(
      polls.map(async poll => {
        poll.options = poll.options.map(option => ({ option, votes: 0 }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: 'username' });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      }),
    );
    console.log('CREATED POLLS', JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();
