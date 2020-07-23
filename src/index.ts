import "reflect-metadata";
import { User, UserDetails, Profile, Photo } from "./entity";
import {
 createConnection,
 Connection,
 Repository,
 AdvancedConsoleLogger
} from "typeorm";

(async () => {
 const connection: Connection = await createConnection();
 const userRespo: Repository<User> = connection.getRepository(User);

 //  const detailUser = new UserDetails();
 //  detailUser.address = "San Antonio";

 //  const profile = new Profile();
 //  profile.gender = "M";
 //  profile.photo = "photo.jpg";

 //  await userRespo.save({
 //   age: 30,
 //   profile: profile,
 //   details: detailUser,
 //   firstName: "Edwin",
 //   lastName: "Melara Landaverde",
 //   photos: [
 //    new Photo("google.com/imgs/1.jpg"),
 //    new Photo("google.com/imgs/2.jpg")
 //   ]
 //  });

 const users = await userRespo.findOne(6);
 const photos = await users.photos;
 console.log(photos);
})();
