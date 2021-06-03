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

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: String,
    resetPasswordLink: String,
  }
)

interface IUserDocument extends IUser, Document {
  matchPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {

}

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
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
