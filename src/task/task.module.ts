import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [TaskController],
    imports: [TypeOrmModule.forFeature([TaskModule])],
    providers: [TaskService]
})
export class TaskModule {}
