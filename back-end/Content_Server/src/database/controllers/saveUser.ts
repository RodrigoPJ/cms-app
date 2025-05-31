import { RequestUser } from "../../utils/validators/validateNewUser";
import { AppDataSource } from "../db-config/data-source";
import { User } from "../db-config/entity/User";

const saveUser = async (user:RequestUser): Promise<User | null> => {
  try {
    const findDuplicate = await AppDataSource.getRepository(User).find({
    where: {
      user: user.user,
    }
  });
  if (findDuplicate.length > 0) {
    throw new Error(`${findDuplicate.length} acccounts found  with that user, log  in or reset password`);
  } else {
    const newUser = new User();
      newUser.dateCreated = new Date().toISOString();
      newUser.user = user.user;
      newUser.userName = user.firstName;
      newUser.userType = "free";
      const savedUser = await AppDataSource.manager.save(newUser);
      if (savedUser.id && typeof savedUser.id  === 'string') {
        return savedUser;
      }else {
        return null;
      }
  }
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
  
};

export default saveUser;
