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
import { FindAllTasksParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Query() params: FindAllTasksParameters): TaskDto[] {
    return this.taskService.findAll(params);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);
  }

  @Put()
  update(@Body() task: TaskDto) {
    return this.taskService.update(task);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
