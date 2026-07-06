import { AccountRequest } from "../../../utils/validators/validateNewAccount";
import { AppDataSource } from "../../db-config/data-source";
import { Account } from "../../db-config/entity/Account";

const saveUser = async (account:AccountRequest): Promise<Account | null> => {
  try {
    const findDuplicate = await AppDataSource.getRepository(Account).find({
    where: {
      userName: account.userName,
    }
  });
  if (findDuplicate.length > 0) {
    throw new Error(`${findDuplicate.length} acccounts found  with that user, log in or reset password`);
  } else {
    const newUser = new Account();
      newUser.dateCreated = new Date().toISOString();
      newUser.name = account.name;
      newUser.userName = account.userName;
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
