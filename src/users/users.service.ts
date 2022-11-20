import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(userDto: CreateUserDto) {
    const { name, password, email } = userDto;
    const user = this.usersRepository.create({ name, password, email });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(email: string) {
    return this.usersRepository.findOneBy({ email: email });
  }

  update(emailOfUserToBeUpdated: string, updateUserDto: UpdateUserDto) {
    const { email, name, password } = updateUserDto;
    return this.usersRepository.update(
      { email: emailOfUserToBeUpdated },
      { email, name, password }
    );
  }

  remove(email: string) {
    return this.usersRepository.delete({ email });
  }
}
