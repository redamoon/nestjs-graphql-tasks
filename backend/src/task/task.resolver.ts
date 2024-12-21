import { CreateTaskInput } from './dto/createTask.input';
import { UpdateTaskInput } from './dto/updateTask.input';
import { Task } from '@prisma/client';
import { Args, Mutation, Query, Resolver, Int} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) { }
  
  @Query(() => [TaskModel], { nullable: 'items' })  // GraphQL の形の形式
  @UseGuards(JwtAuthGuard)
  async getTasks(@Args('userId', { type: ()=> Int }) userId: number): Promise<Task[]> {
    return this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id)
  }
}
