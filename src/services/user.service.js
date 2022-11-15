import User from '../models/user.model';

//create a new user registration
export const registration = async (body) => {
  const data = await User.create(body);
  return data;
};