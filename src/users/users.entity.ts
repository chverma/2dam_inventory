import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  surnamea: string;

  @Column()
  email: string;

  @Column({ default: 0 })
  role: number;

  /*como un usuario puede o no tener muchas issues, 
  deberiamos hacer un OneToMony a issues, igual que 
  deberiamos hacerlo desde issues a issues_conversations.
  */
  //OneToMany(type => Issue, issue.user)
  //issue: Issue[];
}
