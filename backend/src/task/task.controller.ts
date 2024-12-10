import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { AxiosResponse } from 'axios';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Post()
  async createTask(@Body() createTaskInput: CreateTaskInput): Promise<Task> {
    return this.taskService.createTask(createTaskInput);
  }

  @Post('external')
  async createExternalTask(@Body() createTaskInput: CreateTaskInput): Promise<AxiosResponse<any>> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await this.httpService.post(url, createTaskInput).toPromise();
    return response.data;
  }
}