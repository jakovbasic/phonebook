const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  function numValidator(number) {
    if(number.includes('-')) {
      const splits = number.split('-')
      if(splits.length == 2) {
        if(splits[0].length == 2 || splits[0].length == 3) {
          if(splits[1].length > (7-splits[0].length)) {
            return true
          }
        }
      } 
    } return false
  }

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      minlength: 8,
      validate: [numValidator, 'Invalid number'],
    }
  })
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)