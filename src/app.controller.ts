import { 
  Body,
  Controller, 
  Delete, 
  Get,
  Param, 
  Post,
  Put
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { PostsService } from './posts/posts.service';
import { User as UserModel, Post as PostModel, Prisma } from "@prisma/client";
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly postServide: PostsService,
    private readonly prisma: PrismaService
  ) {}

  @Get("post/:id")
  async getPostById(@Param("id") id: string): Promise<PostModel> {
    return this.postServide.post({ id: Number(id) });
  }

  @Get("feed")
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postServide.posts({
      where: { published: true }
    });
  }

  @Get("filtered-posts/:searchString")
  async getFilteredPosts(
    @Param("searchString") searchstring: string,
  ): Promise<PostModel[]> {
   return this.postServide.posts({
    where: {
      OR: [
        {
          title: { contains: searchstring }
        },
        {
          content: { contains: searchstring }
        }
      ]
    }
   });
  }

  @Post('post')
  async createPost(
    @Body() postData: { title: string; content: string; published: boolean; authorId: Prisma.UserCreateWithoutPostsInput }
  ) {
    return this.postServide.createPost(postData);
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData)
  }

  // @Get('users')
  // async getAllUsers(): Promise<UserModel[]> {
  //   return this.userService.users({
  //     where: this.prisma.
  //   });
  // }

  @Put("publish/:id")
  async publicPost(
    @Param("id") id: string
  ): Promise<PostModel> {
    return this.postServide.updatePost({
      where: { id: Number(id) },
      data: { published: true }
    });
  }

  @Delete("post/:id")
  async deletePost(
    @Param("id") id: string
  ): Promise<PostModel> {
    return this.postServide.deletePost({ id: Number(id) });
  }
}
