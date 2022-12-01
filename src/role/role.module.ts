import { Logger, LoggerService, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGroup } from './entity/role-group.entity';
import { Role, Roles } from './entity/role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleGroup])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule implements OnModuleInit {
  readonly logger: Logger;
  constructor(private readonly roleService: RoleService) {
    this.logger = new Logger('RoleModule', { timestamp: true });
  }

  async onModuleInit() {
    this.logger.log('Initializing Role data');

    this.logger.log('Creating base roles');
    const roles = {
      ManageUser: await this.roleService.saveRole({
        name: Roles.MANAGE_USER,
        description: '유저 관리 권한',
      }),
      TestRole: await this.roleService.saveRole({
        name: Roles.TEST_ROLE,
        description: '테스트 권한',
      }),
    };

    this.logger.log('Creating role groups');
    const test = await this.roleService.saveRoleGroup({
      name: 'SuperAdmin',
      description: '슈퍼 어드민',
      roles: [roles.ManageUser, roles.TestRole],
    });

    console.log(test);
    this.logger.log('Initialize Role data Completed');
  }
}
