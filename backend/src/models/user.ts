import mongoose, { Schema, Model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string
  email: string
  password: string
  role: string
  resetPasswordLink: string
}

interface IUserDocument extends IUser, Document {
  matchPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {
  findByEmail: (email: string) => Promise<IUserDocument>
}


// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: '글쓴이' },
  resetPasswordLink: String,
})
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email })
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


// 3. Create a Model
const UserModel = mongoose.model<IUserDocument, IUserModel>('User', userSchema)

export default UserModel
