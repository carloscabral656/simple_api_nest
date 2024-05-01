import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllTasksParameters, TaskDto, TaskRootParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Query() params: FindAllTasksParameters): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.taskService.findById(id);
  }

  @Post()
  async create(@Body() task: TaskDto) {
    return await this.taskService.create(task);
  }

  @Put()
  async update(@Param() params: TaskRootParameters, @Body() task: TaskDto) {
    return await this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
