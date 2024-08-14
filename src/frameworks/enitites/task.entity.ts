// // src/task/task.entity.ts
// import { TeamMember } from 'src/modules/team/entities/team-member.entity';
// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// @Entity()
// export class Task {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   description: string;

//   @Column({ name: 'due_date' })
//   dueDate: Date;

//   @ManyToOne(() => TeamMember, { eager: true })
//   assigneeId: TeamMember;

//   @Column({ default: 'pending' })
//   status: string;
// }
