import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllTasksParameters, TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  findAll(params: FindAllTasksParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  create(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.IN_PROGRESS;
    this.tasks.push(task);
  }

  findById(id: string) {
    const tasksFound = this.tasks.filter((t) => t.id === id);

    if (tasksFound.length) {
      return tasksFound[0];
    }

    throw new HttpException('Não encontrado', HttpStatus.NOT_FOUND);
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(`Task with id ${task.id}`, HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
