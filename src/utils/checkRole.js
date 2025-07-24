import jwt from 'jsonwebtoken';

const checkRole = (token) => {
  try {
    const decoded = jwt.verify(token,  "my_secret");
    
    if (decoded?.email === 'admin101@gmail.com') {
      return true;
    }

    return false;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return false;
  }
};

export default checkRole;
