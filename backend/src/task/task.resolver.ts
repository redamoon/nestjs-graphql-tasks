import { CreateTaskInput } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { Args, Mutation, Query, Resolver, } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) { }
  
  @Query(() => [TaskModel], { nullable: 'items' })  // GraphQL の形の形式
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Mutation(() => TaskModel)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }
}
