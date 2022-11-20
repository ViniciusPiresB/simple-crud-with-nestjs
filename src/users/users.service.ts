import { BadRequestException, Injectable } from "@nestjs/common";
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

  async create(userDto: CreateUserDto) {
    const { name, password, email } = userDto;

    if (await this.usersRepository.findOneBy({ email }))
      throw new BadRequestException({ error: "User Already Exist!" });

    const userCreated = this.usersRepository.create({ name, password, email });

    return this.usersRepository.save(userCreated);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(email: string) {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new BadRequestException({ error: "User not found" });

    return user;
  }

  async update(emailOfUserToBeUpdated: string, updateUserDto: UpdateUserDto) {
    const { email, name, password } = updateUserDto;

    const userToBeUpdated = await this.usersRepository.findOneBy({
      email: emailOfUserToBeUpdated,
    });

    if (!userToBeUpdated)
      throw new BadRequestException({ error: "User not found" });

    const updateResult = await this.usersRepository.update(
      { email: emailOfUserToBeUpdated },
      { email, name, password }
    );

    if (!updateResult["affected"])
      throw new BadRequestException({ error: "Something went wrong" });

    return { message: "User updated successfully" };
  }

  async remove(email: string) {
    const deleteResult = await this.usersRepository.delete({ email });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "User not found" });

    return { message: `User ${email} deleted successfully!` };
  }
}
