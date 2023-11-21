
import pkg from 'jsonwebtoken';        
const { sign } = pkg;

const generateToken = (id) => {
  return sign({ id }, H5kR8pLsQ9uX2wF3jA6cV7bZ4mY1gT0 , {
    expiresIn: "30d",
  });
};

export default  generateToken ;
