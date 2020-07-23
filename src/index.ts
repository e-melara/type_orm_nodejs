import "reflect-metadata";
import { User, UserDetails } from "./entity";
import { createConnection, Connection, Repository } from "typeorm";

(async () => {
 const connection: Connection = await createConnection();
 const userRespo: Repository<User> = connection.getRepository(User);

 const detailUser = new UserDetails();
 detailUser.address = "San Antonio";

 await userRespo.save({
  age: 30,
  details: detailUser,
  firstName: "Juan Antonio",
  lastName: "Mendoza Lopez"
 });

 const users = await userRespo.find();
 console.log(users);
})();
