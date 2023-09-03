import bcrypt from 'bcryptjs';

//  hashing password
export const hashedPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error occured!');
  }
};

// compare password
export const comparePassword = async (hashedPassword, password) => {
  return await bcrypt.compare(password, hashedPassword);
};
