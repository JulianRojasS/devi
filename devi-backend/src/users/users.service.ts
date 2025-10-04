import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import jwt from 'jsonwebtoken';
import { hash, verify } from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepo.find();
  }

  getUserCount() {
    return this.userRepo.count();
  }

  getOneById(id: string) {
    const user = this.userRepo.findOne({ where: { id } });
    return user;
  }

  async createUser(userData: CreateUserDto) {
    try {
      const { name, email, password, roles } = userData;
      const emailExists = await this.userRepo.findOne({ where: { email } });
      if (emailExists) {
        throw new HttpException('Email already exists', 400);
      }
      const newUser: User = {
        id: v4(),
        name,
        email,
        password: await hash(password),
        createdAt: new Date(),
        updatedAt: new Date(),
        verified: false,
        status: 'active',
        roles: roles || ['user'],
      };
      await this.userRepo.save(newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error(error.message);
    }
  }

  deleteUser(id: string) {
    this.userRepo.delete({ id });
    return { message: `User with id ${id} deleted` };
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    const {
      name,
      email,
      password,
      roles,
      status,
      verified,
      profilePictureUrl,
      lastLogin,
      bio,
      location,
      website,
      githubUrl,
      linkedinUrl,
      token,
    } = userData;
    const user = await this.getOneById(id);
    if (!user) {
      return null;
    }
    if (password) {
      /// only hash if password is being updated
      const samePassword = verify(user.password, password); /// check if the new password is the same as the old one
      if (!samePassword) {
        /// only hash if it's different
        user.password = await hash(password);
      }
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.roles = roles ?? user.roles;
    user.status = status ?? user.status;
    user.verified = verified ?? user.verified;
    user.profilePictureUrl = profilePictureUrl ?? user.profilePictureUrl;
    user.lastLogin = lastLogin ?? user.lastLogin;
    user.bio = bio ?? user.bio;
    user.location = location ?? user.location;
    user.website = website ?? user.website;
    user.githubUrl = githubUrl ?? user.githubUrl;
    user.linkedinUrl = linkedinUrl ?? user.linkedinUrl;
    user.token = token !== undefined ? token : user.token;
    user.updatedAt = new Date();
    await this.userRepo.save(user);
    return user;
  }

  async statistics() {
    return {
      totalUsers: this.getUserCount(),
      activeUsers: await this.userRepo.count({ where: { status: 'active' } }),
      inactiveUsers: await this.userRepo.count({
        where: { status: 'inactive' },
      }),
      bannedUsers: await this.userRepo.count({ where: { status: 'banned' } }),
      verifiedUsers: await this.userRepo.count({ where: { verified: true } }),
      unverifiedUsers: await this.userRepo.count({
        where: { verified: false },
      }),
      rolesDistribution: await this.userRepo
        .createQueryBuilder('user')
        .select('user.roles', 'role')
        .addSelect('COUNT(*)', 'count')
        .groupBy('user.roles')
        .getRawMany(),
    };
  }

  async login(email: string, password: string) {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const validPassword = await verify(user.password, password);
    if (!validPassword) {
      throw new HttpException('Invalid credentials', 401);
    }
    const actk = jwt.sign(
      { email: user.email, roles: user.roles },
      process.env.SESION_SECRET!,
      { expiresIn: '1h' },
    );
    const rftk = jwt.sign(
      { email: user.email, roles: user.roles },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' },
    );
    user.lastLogin = new Date();
    user.verified = true; /// mark as verified on login
    user.token = actk; /// store the access token
    await this.updateUser(user.id, {
      ...user,
    }); /// update last login
    return { accessToken: actk, refreshToken: rftk, user };
  }

  async logout(token: string) {
    const data = jwt.decode(token, { json: true });
    if (!data) {
      return { message: 'Invalid token' };
    }
    const { email } = data as { email: string };

    const user = await this.getByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    await this.updateUser(user.id, { token: null, verified: false }); /// clear token and mark as unverified
    return { message: 'Logout successful' };
  }

  getByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  getByToken(token: string) {
    const data = jwt.decode(token, { json: true });
    if (!data) {
      return null;
    }
    const { email } = data;
    return this.getByEmail(email);
  }
}
