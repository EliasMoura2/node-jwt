const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: { 
    type: String, 
    required: [true ,'username is required']
  },
  email: { 
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required'] },
  //  created_at: { type: Date, default: Date.now },
}, {
  timestamps: true
})

userSchema.methods.encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// // funcion que se ejecuta antes de un save (hashea la password)
// userShcema.pre('save', function(next){
//   if(this.isModified('password')){
//     this.password = bcrypt.hashSync(this.password, saltRounds)
//   }
//   next()
// })

userSchema.methods.validatePass = async function (password){
  return  await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)
