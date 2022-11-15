import User from '../models/user.model';

//create a new user registration
export const registration = async (body) => {
  const data = await User.create(body);
  return data;
};

//user login
export const login = async (body) => {
  const data = await User.findOne({ Email: body.Email });
  if (data != null) {
    if (body.Password == data.Password) {
      return data;
    }
    else {
      throw new Error("Invalid Password");
    }
  }
  else {
    throw new Error("Invalid Email");
  }
};