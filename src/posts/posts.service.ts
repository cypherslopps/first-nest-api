import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async post(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput
    ): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput
        })
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput
    }): Promise<Post[]> {
        return this.prisma.post.findMany(params)
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data
        });
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput,
        data: Prisma.PostUpdateInput
    }): Promise<Post> {
        const { where, data } = params;
        return this.prisma.post.update({
            data,
            where
        })
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({ where });
    }
}
